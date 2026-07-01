const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

(async () => {
  const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🚀 Starting screenshot capture...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1920 }, // Exact 9:16 aspect ratio high-res
    deviceScaleFactor: 1, // Standard scaling to keep image crisp and 1080x1920 size
  });
  const page = await context.newPage();

  async function handleCookieBanner() {
    const acceptBtn = page.locator('#accept-cookies');
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click({ force: true });
      console.log('✅ Accepted cookies (forced)');
      await page.waitForTimeout(500);
    }
  }

  // Helper to wait for lazy images/motion
  async function stabilizePage() {
    await page.waitForTimeout(1500);
  }

  // ─── 1. ONBOARDING TOUR SCREEN ───
  console.log('📸 Navigating to Landing Page (Onboarding Tour)...');
  await page.goto('https://sanskritbhashi.com/en');
  await stabilizePage();
  await handleCookieBanner();

  // Clear localStorage and reload to ensure the onboarding tour triggers
  console.log('🔄 Clearing localStorage to force tour trigger...');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await stabilizePage();
  await handleCookieBanner();

  console.log('📸 Capturing screen-onboarding.png...');
  await page.screenshot({ path: path.join(screenshotsDir, 'screen-onboarding.png') });

  // Dismiss onboarding tour by clicking "Skip Tour" or "Skip"
  console.log('Dismissing onboarding tour...');
  const skipBtnText = page.locator('text="Skip Tour"').first();
  const skipBtn = page.locator('button:has-text("Skip")').first();
  const joyrideSkip = page.locator('.react-joyride__tooltip button').first();
  
  if (await skipBtnText.isVisible()) {
    await skipBtnText.click({ force: true });
  } else if (await skipBtn.isVisible()) {
    await skipBtn.click({ force: true });
  } else if (await joyrideSkip.isVisible()) {
    await joyrideSkip.click({ force: true });
  }
  await page.waitForTimeout(500);

  // ─── 2. HOME SCREEN ───
  console.log('📸 Capturing screen-home.png...');
  await page.screenshot({ path: path.join(screenshotsDir, 'screen-home.png') });

  // ─── 3. PRACTICE CARD SCREEN ───
  console.log('📸 Navigating to School Prep (Practice Card Interface)...');
  await page.goto('https://sanskritbhashi.com/en/modules/school-prep');
  await stabilizePage();
  await handleCookieBanner();
  
  // Skip tour if it triggers here too
  const skipBtnTextSchool = page.locator('text="Skip Tour"').first();
  if (await skipBtnTextSchool.isVisible()) {
    await skipBtnTextSchool.click({ force: true });
    await page.waitForTimeout(500);
  }

  console.log('📸 Capturing screen-practice.png...');
  await page.screenshot({ path: path.join(screenshotsDir, 'screen-practice.png') });

  // ─── 4. SHASTRA STUDY SCREEN ───
  console.log('📸 Navigating to Shastra Study...');
  await page.goto('https://sanskritbhashi.com/en/modules/shastra-study');
  await stabilizePage();
  await handleCookieBanner();

  console.log('📸 Capturing screen-shastra.png...');
  await page.screenshot({ path: path.join(screenshotsDir, 'screen-shastra.png') });

  await browser.close();
  console.log('🎉 Screenshot capture complete! All files saved to public/screenshots/');
})();
