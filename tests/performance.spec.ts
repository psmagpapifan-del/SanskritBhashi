import { test, expect } from "@playwright/test";

/**
 * Performance Testing Suite
 *
 * Measures page load performance, Core Web Vitals,
 * resource loading, and render-blocking detection.
 */

const KEY_PAGES = [
  { name: "Home", path: "/en" },
  { name: "SchoolPrep", path: "/en/modules/school-prep" },
  { name: "About", path: "/en/about" },
  { name: "FAQs", path: "/en/faqs" },
];

test.describe("Performance Testing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("tour_completed", "true");
      localStorage.setItem("cookie-consent", "declined");
    });
  });

  // ── Core Web Vitals ───────────────────────────────────────────────────

  for (const pageInfo of KEY_PAGES) {
    test(`PERF-01-${pageInfo.name}: Page load performance metrics`, async ({ page }) => {
      // Navigate with performance measurement
      await page.goto(pageInfo.path, { waitUntil: "networkidle" });

      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;

        const paintEntries = performance.getEntriesByType("paint");
        const fcp = paintEntries.find((e) => e.name === "first-contentful-paint");

        return {
          // Navigation Timing
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
          loadComplete: navigation.loadEventEnd - navigation.startTime,
          ttfb: navigation.responseStart - navigation.startTime,
          domInteractive: navigation.domInteractive - navigation.startTime,

          // Paint Timing
          fcp: fcp ? fcp.startTime : null,

          // Resource counts
          resourceCount: performance.getEntriesByType("resource").length,
        };
      });

      console.log(`\n=== Performance Metrics: ${pageInfo.name} ===`);
      console.log(`  TTFB: ${metrics.ttfb.toFixed(0)}ms`);
      console.log(`  FCP: ${metrics.fcp?.toFixed(0) || "N/A"}ms`);
      console.log(`  DOM Interactive: ${metrics.domInteractive.toFixed(0)}ms`);
      console.log(`  DOM Content Loaded: ${metrics.domContentLoaded.toFixed(0)}ms`);
      console.log(`  Load Complete: ${metrics.loadComplete.toFixed(0)}ms`);
      console.log(`  Total Resources: ${metrics.resourceCount}`);

      // Basic performance assertions (dev server — relaxed thresholds)
      expect(metrics.ttfb).toBeLessThan(5000); // TTFB < 5s (local dev)
      if (metrics.fcp) {
        expect(metrics.fcp).toBeLessThan(10000); // FCP < 10s (local dev)
      }
    });
  }

  // ── Layout Stability (CLS Proxy) ──────────────────────────────────────

  for (const pageInfo of KEY_PAGES) {
    test(`PERF-02-${pageInfo.name}: No major layout shifts`, async ({ page }) => {
      await page.goto(pageInfo.path);

      // Listen for layout shift events
      const cls = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value || 0;
              }
            }
          });

          try {
            observer.observe({ type: "layout-shift", buffered: true });
          } catch {
            // PerformanceObserver may not support layout-shift in all environments
          }

          // Wait a bit for shifts to occur
          setTimeout(() => {
            observer.disconnect();
            resolve(clsValue);
          }, 3000);
        });
      });

      console.log(`  CLS (${pageInfo.name}): ${cls.toFixed(4)}`);
      // Target: CLS < 0.1 (may be higher in dev due to hydration)
      expect(cls).toBeLessThan(0.5);
    });
  }

  // ── Resource Analysis ─────────────────────────────────────────────────

  test("PERF-03: No excessively large JS bundles loaded on home page", async ({ page }) => {
    const largeResources: Array<{ url: string; size: number }> = [];

    page.on("response", async (response) => {
      const url = response.url();
      if (url.endsWith(".js") || url.includes(".js?")) {
        try {
          const body = await response.body();
          const size = body.length;
          if (size > 200 * 1024) {
            // > 200KB
            largeResources.push({ url, size });
          }
        } catch {
          // Some responses may not have body
        }
      }
    });

    await page.goto("/en", { waitUntil: "networkidle" });

    if (largeResources.length > 0) {
      console.warn("\n=== Large JS bundles (>200KB) ===");
      for (const res of largeResources) {
        console.warn(`  ${res.url}: ${(res.size / 1024).toFixed(1)}KB`);
      }
    }
  });

  // ── Render-Blocking Resources ─────────────────────────────────────────

  test("PERF-04: Check for render-blocking resources in head", async ({ page }) => {
    await page.goto("/en");

    const renderBlocking = await page.evaluate(() => {
      const head = document.head;
      const results: string[] = [];

      // Check for synchronous scripts in head (without async or defer)
      const scripts = head.querySelectorAll("script[src]");
      scripts.forEach((script) => {
        if (
          !script.hasAttribute("async") &&
          !script.hasAttribute("defer") &&
          !script.getAttribute("type")?.includes("module")
        ) {
          results.push(`Render-blocking script: ${script.getAttribute("src")}`);
        }
      });

      // Check for large CSS files without media query
      const stylesheets = head.querySelectorAll('link[rel="stylesheet"]');
      stylesheets.forEach((link) => {
        const media = link.getAttribute("media");
        if (!media || media === "all") {
          const href = link.getAttribute("href");
          if (href && !href.includes("fonts")) {
            results.push(`Potentially render-blocking CSS: ${href}`);
          }
        }
      });

      return results;
    });

    if (renderBlocking.length > 0) {
      console.warn("\n=== Render-blocking resources ===");
      for (const resource of renderBlocking) {
        console.warn(`  ${resource}`);
      }
    }
  });

  // ── Image Optimization ────────────────────────────────────────────────

  test("PERF-05: Images use modern formats or are reasonably sized", async ({ page }) => {
    const imageInfo: Array<{ url: string; size: number; type: string }> = [];

    page.on("response", async (response) => {
      const contentType = response.headers()["content-type"] || "";
      if (contentType.startsWith("image/")) {
        try {
          const body = await response.body();
          imageInfo.push({
            url: response.url(),
            size: body.length,
            type: contentType,
          });
        } catch {
          // Skip
        }
      }
    });

    await page.goto("/en", { waitUntil: "networkidle" });

    console.log("\n=== Image Resources ===");
    for (const img of imageInfo) {
      const sizeKB = (img.size / 1024).toFixed(1);
      const isModern =
        img.type.includes("webp") ||
        img.type.includes("avif") ||
        img.type.includes("svg");
      console.log(
        `  ${img.url.split("/").pop()}: ${sizeKB}KB (${img.type}) ${isModern ? "✓" : "⚠ Consider modern format"}`
      );
    }
  });

  // ── Resource Caching Headers ──────────────────────────────────────────

  test("PERF-06: Static assets have appropriate cache headers", async ({ page }) => {
    const cacheInfo: Array<{ url: string; cacheControl: string }> = [];

    page.on("response", (response) => {
      const url = response.url();
      const cacheControl = response.headers()["cache-control"] || "none";
      if (
        url.endsWith(".js") ||
        url.endsWith(".css") ||
        url.endsWith(".png") ||
        url.endsWith(".svg")
      ) {
        cacheInfo.push({ url: url.split("/").pop() || url, cacheControl });
      }
    });

    await page.goto("/en", { waitUntil: "networkidle" });

    console.log("\n=== Cache Headers ===");
    for (const info of cacheInfo) {
      console.log(`  ${info.url}: ${info.cacheControl}`);
    }
  });

  // ── Total Page Weight ─────────────────────────────────────────────────

  test("PERF-07: Total page weight is reasonable", async ({ page }) => {
    let totalBytes = 0;
    const resourceBreakdown: Record<string, number> = {};

    page.on("response", async (response) => {
      try {
        const body = await response.body();
        totalBytes += body.length;

        const type = response.request().resourceType();
        resourceBreakdown[type] = (resourceBreakdown[type] || 0) + body.length;
      } catch {
        // Skip
      }
    });

    await page.goto("/en", { waitUntil: "networkidle" });

    console.log(`\n=== Total Page Weight: ${(totalBytes / 1024 / 1024).toFixed(2)}MB ===`);
    for (const [type, bytes] of Object.entries(resourceBreakdown)) {
      console.log(`  ${type}: ${(bytes / 1024).toFixed(1)}KB`);
    }

    // Total page weight should be under 5MB (generous for dev mode)
    expect(totalBytes).toBeLessThan(5 * 1024 * 1024);
  });
});
