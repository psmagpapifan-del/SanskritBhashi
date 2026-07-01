const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🎨 Launching browser to composite assets...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const faviconPath = path.join(__dirname, '..', 'public', 'favicon-512x512.png');
  const faviconBase64 = fs.readFileSync(faviconPath).toString('base64');
  const faviconDataUrl = `data:image/png;base64,${faviconBase64}`;

  // Composite 1024x1024 Icon on Solid Orange Background
  const iconBase64 = await page.evaluate(async (logoUrl) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Fill background with a beautiful premium gradient matching Sanskritbhashi brand
    const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradient.addColorStop(0, '#FF8A00'); // Saffron light
    gradient.addColorStop(1, '#FF5C00'); // Saffron dark
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);

    // Draw logo centered
    const img = new Image();
    img.src = logoUrl;
    await new Promise((resolve) => { img.onload = resolve; });

    // Draw logo at 600x600 inside the 1024x1024 canvas
    const size = 600;
    const offset = (1024 - size) / 2;
    ctx.drawImage(img, offset, offset, size, size);

    return canvas.toDataURL('image/png').split(',')[1];
  }, faviconDataUrl);

  const assetsDir = path.join(__dirname, '..', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Save the composited icon
  fs.writeFileSync(path.join(assetsDir, 'icon.png'), Buffer.from(iconBase64, 'base64'));
  console.log('✅ Composited assets/icon.png successfully!');

  // Generate a beautiful splash screen too!
  const splashBase64 = await page.evaluate(async (logoUrl) => {
    const canvas = document.createElement('canvas');
    canvas.width = 2732;
    canvas.height = 2732;
    const ctx = canvas.getContext('2d');

    // Fill background with the saffron gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 2732);
    gradient.addColorStop(0, '#FF8A00');
    gradient.addColorStop(1, '#FF5C00');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2732, 2732);

    // Draw logo centered
    const img = new Image();
    img.src = logoUrl;
    await new Promise((resolve) => { img.onload = resolve; });

    // Draw logo at 800x800 inside the 2732x2732 canvas
    const size = 800;
    const offset = (2732 - size) / 2;
    ctx.drawImage(img, offset, offset, size, size);

    return canvas.toDataURL('image/png').split(',')[1];
  }, faviconDataUrl);

  fs.writeFileSync(path.join(assetsDir, 'splash.png'), Buffer.from(splashBase64, 'base64'));
  console.log('✅ Composited assets/splash.png successfully!');

  await browser.close();
})();
