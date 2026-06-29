/**
 * capacitorBridge.ts
 *
 * Isomorphic bridge between the Astro/React web layer and native Capacitor
 * APIs. Every exported function is safe to call in SSR, browser dev-mode,
 * and inside a native Android/iOS Capacitor shell.
 *
 * Architecture:
 *  - isNative()       → guards all native calls
 *  - Haptics          → direct per-call, no global state
 *  - Preferences      → async write-through memory cache (see §Storage below)
 *  - PushNotifications→ one-time init, exposes FCM/APNs token via callback
 *  - getCapacitorMeta → enriched telemetry snapshot for ErrorReportButton
 *  - initLiveUpdates  → OTA hot-swap engine (@capgo/capacitor-updater)
 */

// ─── Type-safe lazy imports ───────────────────────────────────────────────────
// We import lazily so that when Capacitor packages are not bundled (pure web
// builds without cap sync), tree-shaking drops these imports entirely.

let _Capacitor: typeof import('@capacitor/core').Capacitor | null = null;
let _Haptics: typeof import('@capacitor/haptics').Haptics | null = null;
let _ImpactStyle: typeof import('@capacitor/haptics').ImpactStyle | null = null;
let _Preferences: typeof import('@capacitor/preferences').Preferences | null = null;
let _PushNotifications: typeof import('@capacitor/push-notifications').PushNotifications | null = null;
let _CapacitorUpdater: typeof import('@capgo/capacitor-updater').CapacitorUpdater | null = null;


async function getCapacitorCore() {
  if (!_Capacitor) {
    try {
      const mod = await import('@capacitor/core');
      _Capacitor = mod.Capacitor;
    } catch {
      _Capacitor = null;
    }
  }
  return _Capacitor;
}

async function getHaptics() {
  if (!_Haptics) {
    try {
      const mod = await import('@capacitor/haptics');
      _Haptics = mod.Haptics;
      _ImpactStyle = mod.ImpactStyle;
    } catch {
      _Haptics = null;
    }
  }
  return { Haptics: _Haptics, ImpactStyle: _ImpactStyle };
}

async function getPreferences() {
  if (!_Preferences) {
    try {
      const mod = await import('@capacitor/preferences');
      _Preferences = mod.Preferences;
    } catch {
      _Preferences = null;
    }
  }
  return _Preferences;
}

async function getPush() {
  if (!_PushNotifications) {
    try {
      const mod = await import('@capacitor/push-notifications');
      _PushNotifications = mod.PushNotifications;
    } catch {
      _PushNotifications = null;
    }
  }
  return _PushNotifications;
}

// ─── Native detection ─────────────────────────────────────────────────────────

/**
 * Returns true when running inside a Capacitor native shell (Android/iOS).
 * Safe to call synchronously because `window.Capacitor` is injected by the
 * Capacitor WebView bridge before any JS runs.
 */
export function isNative(): boolean {
  if (typeof window === 'undefined') return false;
  return typeof (window as any).Capacitor !== 'undefined' &&
    (window as any).Capacitor?.isNativePlatform?.() === true;
}

// ─── Haptic feedback ──────────────────────────────────────────────────────────

export type HapticStyle = 'light' | 'medium' | 'heavy';

/**
 * Fires a native haptic impact vibration.
 *  - 'light'  → correct answer progression (subtle confirmation tap)
 *  - 'medium' → incorrect answer error   (noticeable but not jarring)
 *  - 'heavy'  → reserved for tier unlock / milestone events
 *
 * Silently no-ops on web (browser dev mode or Capacitor not available).
 */
export async function hapticImpact(style: HapticStyle = 'light'): Promise<void> {
  if (!isNative()) return;

  const { Haptics, ImpactStyle } = await getHaptics();
  if (!Haptics || !ImpactStyle) return;

  const styleMap: Record<HapticStyle, typeof ImpactStyle[keyof typeof ImpactStyle]> = {
    light: ImpactStyle.Light,
    medium: ImpactStyle.Medium,
    heavy: ImpactStyle.Heavy,
  };

  try {
    await Haptics.impact({ style: styleMap[style] });
  } catch (err) {
    // Silently swallow — haptics unavailable on simulator/old devices
    if (process.env.NODE_ENV === 'development') {
      console.debug('[capacitorBridge] haptic unavailable:', err);
    }
  }
}

// ─── Storage: Async Write-Through Memory Cache ────────────────────────────────
//
// Problem: @capacitor/preferences is async; levelsEngine.ts uses synchronous
// localStorage calls. We solve this with a write-through cache:
//
//   READ  → returns immediately from in-memory cache (fast, synchronous feel)
//   WRITE → updates in-memory cache synchronously, then fire-and-forgets the
//           async native Preferences.set() in the background.
//
// The cache is hydrated once at app startup via initPreferencesCache().
// After that, all reads are O(1) from the Map with no async overhead.
//
// On web (non-native), falls through transparently to localStorage so there
// is no functional difference in the browser dev workflow.

const _prefCache = new Map<string, string>();
let _cacheHydrated = false;

const KNOWN_PREF_KEYS = ['sb_progress'];

/**
 * Hydrates the in-memory cache from native storage on first load.
 * Call once at app entry point (Layout.astro client script or deepLinkRouter).
 */
export async function initPreferencesCache(): Promise<void> {
  if (_cacheHydrated) return;

  const Preferences = await getPreferences();

  if (isNative() && Preferences) {
    // Pull all known keys from native sandbox into the memory cache
    await Promise.all(
      KNOWN_PREF_KEYS.map(async (key) => {
        try {
          const { value } = await Preferences.get({ key });
          if (value !== null) {
            _prefCache.set(key, value);
          } else {
            // Migrate from localStorage if native entry doesn't exist yet
            const lsValue = localStorage.getItem(key);
            if (lsValue) {
              _prefCache.set(key, lsValue);
              // Persist migration to native storage
              Preferences.set({ key, value: lsValue }).catch(() => {});
            }
          }
        } catch {
          // Fallback: read from localStorage
          const lsValue = localStorage.getItem(key);
          if (lsValue) _prefCache.set(key, lsValue);
        }
      })
    );
  } else {
    // Web: populate cache from localStorage for read-path consistency
    KNOWN_PREF_KEYS.forEach((key) => {
      const lsValue = localStorage.getItem(key);
      if (lsValue) _prefCache.set(key, lsValue);
    });
  }

  _cacheHydrated = true;
}

/**
 * Reads a preference value. Returns from in-memory cache (synchronous).
 * Falls back to localStorage on web.
 */
export function prefGet(key: string): string | null {
  // Check memory cache first (always populated after initPreferencesCache)
  if (_prefCache.has(key)) return _prefCache.get(key)!;

  // Fallback: direct localStorage (pre-hydration or web context)
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

/**
 * Writes a preference value.
 *  1. Updates in-memory cache synchronously (instant read-back).
 *  2. Fire-and-forgets native Preferences.set() asynchronously.
 *  3. Also writes to localStorage as a universal fallback.
 */
export function prefSet(key: string, value: string): void {
  // 1. Synchronous in-memory write (keeps PracticeCard reads instant)
  _prefCache.set(key, value);

  // 2. Synchronous localStorage write (web fallback + WebView persistence layer)
  if (typeof window !== 'undefined') {
    try { localStorage.setItem(key, value); } catch { /* storage quota */ }
  }

  // 3. Async native write — fire and forget
  if (isNative()) {
    getPreferences().then((Preferences) => {
      if (Preferences) {
        Preferences.set({ key, value }).catch((err) => {
          if (process.env.NODE_ENV === 'development') {
            console.warn('[capacitorBridge] native prefSet failed:', err);
          }
        });
      }
    });
  }
}

// ─── Push Notifications ───────────────────────────────────────────────────────

export interface PushTokenResult {
  token: string;
  platform: 'android' | 'ios' | 'web';
}

/**
 * Requests push notification permission and registers for remote notifications.
 * Calls `onToken(result)` when a device token is obtained.
 * Sets up foreground + background notification listeners.
 *
 * Safe to call on web — silently no-ops.
 */
export async function initPushNotifications(
  onToken: (result: PushTokenResult) => void,
  onNotification?: (data: Record<string, unknown>) => void
): Promise<void> {
  if (!isNative()) return;

  const PushNotifications = await getPush();
  if (!PushNotifications) return;

  try {
    // 1. Request permission
    const { receive } = await PushNotifications.requestPermissions();
    if (receive !== 'granted') {
      console.warn('[capacitorBridge] Push notification permission denied.');
      return;
    }

    // 2. Register with APNs / FCM
    await PushNotifications.register();

    // 3. Token extraction — fires once per registration
    await PushNotifications.addListener('registration', (token) => {
      const cap = (window as any).Capacitor;
      const platform: 'android' | 'ios' | 'web' =
        cap?.getPlatform?.() ?? 'web';
      onToken({ token: token.value, platform });
    });

    // 4. Registration error handler
    await PushNotifications.addListener('registrationError', (err) => {
      console.error('[capacitorBridge] Push registration error:', err);
    });

    // 5. Foreground notification handler
    await PushNotifications.addListener('pushNotificationReceived', (notification) => {
      onNotification?.(notification.data as Record<string, unknown>);
    });

    // 6. Background tap handler — deep link into chapter node
    await PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      const data = action.notification.data as Record<string, unknown>;
      if (data?.deepLink && typeof data.deepLink === 'string') {
        // Delegate to deep link router
        import('./deepLinkRouter').then(({ handleDeepLink }) => {
          handleDeepLink(data.deepLink as string);
        }).catch(() => {});
      }
      onNotification?.(data);
    });
  } catch (err) {
    console.error('[capacitorBridge] initPushNotifications failed:', err);
  }
}

// ─── Telemetry Metadata ───────────────────────────────────────────────────────

export interface CapacitorMeta {
  platform: 'android' | 'ios' | 'web';
  osVersion: string;
  capacitorVersion: string;
  pixelRatio: number;
  isNativeApp: boolean;
}

/**
 * Returns a flat telemetry metadata object for inclusion in error reports.
 * All fields degrade gracefully on web.
 */
export function getCapacitorMeta(): CapacitorMeta {
  const cap = (window as any).Capacitor;
  const native = isNative();

  return {
    platform: cap?.getPlatform?.() ?? 'web',
    osVersion: cap?.getPlatform?.()
      ? (navigator.userAgent.match(/Android\s([\d.]+)|OS\s([\d_]+)/)?.[0] ?? 'unknown')
      : navigator.userAgent,
    // Capacitor injects its version into the bridge object
    capacitorVersion: cap?.CapacitorVersion ?? cap?.version ?? '0.0.0',
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
    isNativeApp: native,
  };
}

// ─── Live Updates (OTA) ───────────────────────────────────────────────────────
/**
 * initLiveUpdates()
 *
 * Initialises the @capgo/capacitor-updater OTA engine. Call this ONCE,
 * as early as possible after the app shell mounts (e.g. in the root
 * Astro layout or a top-level React effect).
 *
 * Lifecycle:
 *  1. notifyAppReady() — confirms the current bundle is healthy.
 *     Without this call the updater automatically rolls back to the
 *     last good bundle after a configurable number of bad launches.
 *  2. Polls https://sanskritbhashi.com/updates/latest.json silently.
 *  3. If a newer version is found, downloads bundle-latest.zip in the
 *     background without blocking any UI.
 *  4. On next app foreground → WebView hot-swaps to new assets.
 *     No Play Store review required for web-only changes.
 *
 * Safe to call on web (no-ops gracefully outside a Capacitor shell).
 */
export async function initLiveUpdates(): Promise<void> {
  if (!isNative()) return; // no-op on web / SSR

  try {
    if (!_CapacitorUpdater) {
      const mod = await import('@capgo/capacitor-updater');
      _CapacitorUpdater = mod.CapacitorUpdater;
    }

    // CRITICAL — must be called so the updater knows this bundle is stable.
    await _CapacitorUpdater.notifyAppReady();

    // Stage the new bundle when the background download completes.
    // set() does NOT reload the app immediately — it activates on the
    // next time the user brings the app to the foreground.
    _CapacitorUpdater.addListener('updateAvailable', async (res) => {
      console.log('[OTA] New bundle available:', res.bundle.version);
      try {
        await _CapacitorUpdater!.set(res.bundle);
        console.log('[OTA] Bundle staged — activates on next foreground.');
      } catch (e) {
        console.warn('[OTA] Failed to stage bundle:', e);
      }
    });

    _CapacitorUpdater.addListener('downloadFailed', (info) => {
      console.warn('[OTA] Download failed:', info);
    });

    // Trigger the background version check against our self-hosted manifest.
    // Network errors are swallowed silently — the next launch retries.
    await _CapacitorUpdater.download({
      url:     'https://sanskritbhashi.com/updates/latest.json',
      version: 'latest',
    }).catch(() => { /* network unavailable — retry on next launch */ });

  } catch {
    // Plugin not available (web build / not yet synced) — ignore silently.
    console.debug('[OTA] Live updates not available in this environment.');
  }
}
