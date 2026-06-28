/**
 * deepLinkRouter.ts
 *
 * Handles incoming deep links from:
 *  1. External links clicked in browsers, social apps, email clients
 *  2. Push notification tap payloads (delegated from capacitorBridge)
 *
 * Supported URL schemes:
 *  - Custom:  sanskritbhashi://app/{lang}[/modules/{module}][?chapter=N&source=core]
 *  - HTTPS:   https://sanskritbhashi.com/{lang}[/modules/{module}][?chapter=N&source=core]
 *
 * Supported lang params: en, hi, ja, es
 * Supported module paths: school-prep, shastra-study
 */

const SUPPORTED_LANGS = ['en', 'hi', 'ja', 'es'] as const;
type SupportedLang = typeof SUPPORTED_LANGS[number];

export interface ParsedDeepLink {
  lang: SupportedLang;
  module?: string;
  chapterId?: number;
  source?: string;
}

// ─── URL parser ────────────────────────────────────────────────────────────────

/**
 * Normalises any incoming deep link URL into a ParsedDeepLink descriptor.
 * Returns null if the URL cannot be resolved to a known route.
 */
export function parseDeepLink(url: string): ParsedDeepLink | null {
  try {
    // Normalise custom scheme to https for URL() parsing
    const normalised = url.replace(/^sanskritbhashi:\/\/app/, 'https://app');
    const parsed = new URL(normalised);

    // Path segments: ['', lang, 'modules', moduleName] etc.
    const segments = parsed.pathname.split('/').filter(Boolean);

    if (segments.length === 0) return null;

    const lang = segments[0] as SupportedLang;
    if (!SUPPORTED_LANGS.includes(lang)) return null;

    const result: ParsedDeepLink = { lang };

    // /en/modules/school-prep  or  /en/modules/shastra-study
    if (segments[1] === 'modules' && segments[2]) {
      result.module = segments[2];
    }

    // Query params: ?chapter=12&source=core
    const chapterParam = parsed.searchParams.get('chapter');
    if (chapterParam) {
      const chapterId = parseInt(chapterParam, 10);
      if (!isNaN(chapterId)) result.chapterId = chapterId;
    }

    const sourceParam = parsed.searchParams.get('source');
    if (sourceParam) result.source = sourceParam;

    return result;
  } catch {
    return null;
  }
}

/**
 * Converts a ParsedDeepLink back to a relative web path for navigation.
 * Astro's static file format uses no trailing slash (trailingSlash: 'never').
 */
export function buildWebPath(link: ParsedDeepLink): string {
  let path = `/${link.lang}`;

  if (link.module) {
    path += `/modules/${link.module}`;
  }

  const params = new URLSearchParams();
  if (link.chapterId !== undefined) params.set('chapter', String(link.chapterId));
  if (link.source) params.set('source', link.source);

  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

// ─── Navigation handler ────────────────────────────────────────────────────────

/**
 * Parses and navigates to the appropriate in-app route for a given URL string.
 * Safe to call with any URL — unknown routes are silently ignored.
 */
export function handleDeepLink(url: string): void {
  const link = parseDeepLink(url);
  if (!link) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[deepLinkRouter] Unresolved deep link:', url);
    }
    return;
  }

  const webPath = buildWebPath(link);

  // Use History API to navigate without a full page reload if already on the
  // same origin (same-document navigation inside the WebView).
  if (
    typeof window !== 'undefined' &&
    window.history &&
    window.location.pathname !== webPath.split('?')[0]
  ) {
    window.history.pushState({}, '', webPath);
    // Dispatch a popstate-equivalent so Astro's client-side router picks it up
    window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
  }
}

// ─── Capacitor App listener setup ─────────────────────────────────────────────

let _listenerAttached = false;

/**
 * Registers the Capacitor `App.appUrlOpen` listener.
 * Call once during app initialisation (e.g. inside a Layout <script> tag).
 *
 * Safe to call on web — silently no-ops when not running natively.
 */
export async function initDeepLinkRouter(): Promise<void> {
  if (_listenerAttached) return;

  // Guard: only run inside Capacitor native shell
  if (typeof window === 'undefined') return;
  const cap = (window as any).Capacitor;
  if (!cap?.isNativePlatform?.()) return;

  try {
    const { App } = await import('@capacitor/app');

    await App.addListener('appUrlOpen', ({ url }: { url: string }) => {
      handleDeepLink(url);
    });

    _listenerAttached = true;

    if (process.env.NODE_ENV === 'development') {
      console.debug('[deepLinkRouter] App URL listener registered.');
    }
  } catch (err) {
    console.error('[deepLinkRouter] Failed to register App listener:', err);
  }
}
