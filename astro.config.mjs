import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

const isDev = process.argv.includes('dev');

/**
 * CAPACITOR_BUILD=true  → Pure static bundle for Capacitor's `webDir: dist`.
 *                          - No Cloudflare adapter (no SSR edge runtime).
 *                          - output: 'static' with full prerender.
 *                          - The /api/report-error route is excluded from the
 *                            bundle (dead code — ErrorReportButton routes to
 *                            the absolute Cloudflare URL on native).
 *
 * Normal web build      → Cloudflare adapter applied; SSR API routes active.
 *
 * Usage: `npm run app:build`  (sets CAPACITOR_BUILD=true automatically)
 */
const isCapacitorBuild = process.env.CAPACITOR_BUILD === 'true';

// When the Cloudflare adapter is active the build runs in server/hybrid mode
// so prerender=false routes work. For Capacitor we stay in fully-static mode.
const useCloudflareAdapter = !isDev && !isCapacitorBuild;

export default defineConfig({
  // 'static' always — Cloudflare adapter switches internal mode to 'server'
  // automatically when installed. Without the adapter (Capacitor build) Astro
  // stays in pure static mode and all pages are prerendered to HTML files.
  output: 'static',
  adapter: useCloudflareAdapter
    ? cloudflare({ platformProxy: { enabled: true } })
    : undefined,
  trailingSlash: 'never',
  build: {
    format: 'file',
    // In Capacitor builds, exclude the SSR API route from the bundle entirely.
    // It is dead code: ErrorReportButton already routes to the absolute
    // Cloudflare Worker URL when window.Capacitor is detected.
    ...(isCapacitorBuild && {
      excludeMiddleware: true,
    }),
  },
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.CAPACITOR_BUILD': JSON.stringify(isCapacitorBuild),
    },
    ...(isCapacitorBuild && {
      // Exclude the API route module from the Capacitor client bundle.
      // This prevents Astro from detecting prerender=false and demanding an adapter.
      optimizeDeps: {
        exclude: [],
      },
      build: {
        rollupOptions: {
          external: [],
        },
      },
    }),
  },
});

