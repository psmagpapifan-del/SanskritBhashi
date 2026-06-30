import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/results.json" }],
  ],
  use: {
    baseURL: "http://localhost:3005",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "off",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    // ── Desktop Browsers ──────────────────────────────────────────────
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "edge",
      use: { ...devices["Desktop Edge"] },
    },

    // ── Mobile Devices ────────────────────────────────────────────────
    {
      name: "mobile-ios",
      use: { ...devices["iPhone SE"] },
    },
    {
      name: "mobile-android",
      use: { ...devices["Pixel 5"] },
    },

    // ── Dark Mode ─────────────────────────────────────────────────────
    {
      name: "dark-mode",
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "dark",
      },
    },

    // ── Responsive Breakpoints ────────────────────────────────────────
    {
      name: "viewport-320",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 320, height: 568 },
      },
    },
    {
      name: "viewport-768",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: "viewport-1920",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // ── Zoom Levels ───────────────────────────────────────────────────
    {
      name: "zoom-150",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 853, height: 480 }, // 1280/1.5 ≈ 853 simulates 150% zoom
      },
    },
    {
      name: "zoom-200",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 640, height: 360 }, // 1280/2 = 640 simulates 200% zoom
      },
    },
  ],
  webServer: {
    command: "npm run preview",
    url: "http://localhost:3005",
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },
});
