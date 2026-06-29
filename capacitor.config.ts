import type { CapacitorConfig } from '@capacitor/cli';

/**
 * SanskritBhashi — Capacitor Native Bridge Configuration
 *
 * webDir must always point to the Astro static build output directory.
 * Run `npm run app:build` before `cap sync` to keep the bundle fresh.
 */
const config: CapacitorConfig = {
  appId: 'com.sanskritbhashi.app',
  appName: 'Sanskritbhashi',

  // ── Web bundle ─────────────────────────────────────────────────────────────
  // Maps to Astro's static output directory. Keep in sync with
  // astro.config.mjs `outDir` (default: 'dist').
  webDir: 'dist',

  // ── Bundled server (no live-reload in production builds) ──────────────────
  bundledWebRuntime: false,

  // ── Server / WebView settings ─────────────────────────────────────────────
  server: {
    // Forces HTTPS scheme inside Android WebView so that mixed-content
    // (camera, push, etc.) works correctly without additional flags.
    androidScheme: 'https',

    // Allow navigation to the production Cloudflare Worker for API calls
    // (ErrorReportButton falls back here when running natively).
    allowNavigation: ['sanskritbhashi.com'],
  },

  // ── Android shell ─────────────────────────────────────────────────────────
  android: {
    // Matches the cream background of the Astro layout (#FAF9F6) so the
    // splash screen edge-to-edge colour is seamless.
    backgroundColor: '#FAF9F6',

    // Keep the WebView content behind the status bar for edge-to-edge feel.
    appendUserAgent: 'SanskritBhashiApp/1.0 Android',
  },

  // ── iOS shell ─────────────────────────────────────────────────────────────
  ios: {
    backgroundColor: '#FAF9F6',
    appendUserAgent: 'SanskritBhashiApp/1.0 iOS',
    // Allow scroll bounce (feels more native on iOS)
    scrollEnabled: true,
  },

  // ── Plugin configuration ───────────────────────────────────────────────────
  plugins: {
    // ── Push Notifications ──────────────────────────────────────────────────
    PushNotifications: {
      // Prompt the user for notification permission on first launch.
      presentationOptions: ['badge', 'sound', 'alert'],
    },

    // ── Haptics ─────────────────────────────────────────────────────────────
    // No plugin-level config needed; impact style is passed per-call
    // from capacitorBridge.ts → hapticImpact(style).
    Haptics: {},

    // ── Preferences (native key-value sandbox storage) ────────────────────
    // All keys are namespaced with the 'sb_' prefix in capacitorBridge.ts.
    Preferences: {
      group: 'NativeStorage',
    },

    // ── AdMob ────────────────────────────────────────────────────────────────
    AdMob: {
      // Android AdMob App ID — Sanskritbhashi
      appIdAndroid: 'ca-app-pub-3511250070838869~7333995842',

      // iOS AdMob App ID — fill in after iOS app is registered in AdMob
      appIdIos: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',

      // Production mode — real ads will serve
      testingDevices: [],
      initializeForTesting: false,
    },

    // ── Live Updates (OTA) ───────────────────────────────────────────────────
    // @capgo/capacitor-updater self-hosted configuration.
    // The plugin polls updateUrl on every app launch, downloads the bundle
    // zip in the background, and hot-swaps the WebView on next foreground.
    // No Play Store review needed for web-only changes (content, layout, logic).
    CapacitorUpdater: {
      // Version manifest served from Cloudflare Pages.
      updateUrl:       'https://sanskritbhashi.com/updates/latest.json',

      // Check for updates automatically on every app launch.
      autoUpdate:      true,

      // Reset JS state cleanly when a new bundle is activated.
      resetWhenUpdate: true,

      // How many failed launches before rolling back to factory bundle.
      // notifyAppReady() in capacitorBridge.ts resets this counter.
      appReadyTimeout: 10000,
    },
  },
};

export default config;
