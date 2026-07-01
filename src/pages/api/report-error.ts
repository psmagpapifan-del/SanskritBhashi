import type { APIRoute } from 'astro';

/**
 * In Capacitor native builds (CAPACITOR_BUILD=true), this route is excluded
 * from the bundle — it is dead code because ErrorReportButton automatically
 * routes to the absolute Cloudflare Worker URL when window.Capacitor is detected.
 *
 * In web/Cloudflare builds this route is server-rendered (prerender = false)
 * and runs as a Cloudflare Workers edge function.
 */
export const prerender = process.env.CAPACITOR_BUILD === 'true';

/**
 * POST /api/report-error
 *
 * Accepts diagnostic payloads from both web browsers and native Capacitor
 * shells. When `isNative: true` is present in the payload, the response
 * includes an `X-Native-Report: true` header for downstream log filtering.
 *
 * Native fields (injected by ErrorReportButton via getCapacitorMeta()):
 *   platform         — 'android' | 'ios' | 'web'
 *   osVersion        — OS version string or browser UA
 *   capacitorVersion — Capacitor SDK version string
 *   pixelRatio       — Device pixel density (e.g. 3 for Pixel 7)
 *   isNative         — boolean flag; true when request originates from native
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();

    // ── Core required fields ──────────────────────────────────────────────────
    const {
      chapterId,
      questionText,
      errorCategory,
      userDetails,
      lang,
      transliterationSettings,
      userAgent,
    } = payload;

    if (!chapterId || !questionText || !errorCategory) {
      return new Response(
        JSON.stringify({ error: 'Missing core diagnostic properties' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ── Native telemetry fields (optional — present only from Capacitor shell) ─
    const {
      platform = 'web',
      osVersion = '',
      capacitorVersion = '0.0.0',
      pixelRatio = 1,
      isNative = false,
    } = payload;

    // ── Build enriched log record ─────────────────────────────────────────────
    const logRecord = {
      id: `correction-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      // Content telemetry
      chapterId,
      questionText,
      errorCategory,
      userDetails: userDetails || '',
      lang,
      transliterationSettings,
      // Environment telemetry
      userAgent,
      platform,
      osVersion,
      capacitorVersion,
      pixelRatio,
      isNative,
      // Log-routing tag for Cloudflare Workers Tail / Logpush filters
      reportSource: isNative ? 'native-capacitor' : 'web-browser',
    };

    // Persisted stub — replace with D1 / KV / R2 write in production
    console.log(
      `[GEO Anomaly Logged] Chapter: ${chapterId} | Platform: ${platform} | Source: ${logRecord.reportSource}`
    );
    console.log('Anomaly details:', logRecord);

    // ── Response headers ──────────────────────────────────────────────────────
    const responseHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Native-Report',
    };

    // Tag native reports for downstream log pipeline filtering
    if (isNative) {
      responseHeaders['X-Native-Report'] = 'true';
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Error logged. Thank you for making Sanskritbhashi cleaner for humans and AI systems alike.',
      }),
      { status: 200, headers: responseHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal Telemetry Pipeline Crash' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
};

// Handle CORS Preflight OPTIONS requests
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Native-Report',
    },
  });
};
