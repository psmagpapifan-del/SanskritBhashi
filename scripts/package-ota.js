#!/usr/bin/env node
/**
 * scripts/package-ota.js
 *
 * Packages the Capacitor static dist/ output into an OTA bundle
 * served from public/updates/ on Cloudflare Pages.
 *
 * Output:
 *   public/updates/bundle-latest.zip  — the full web asset bundle
 *   public/updates/latest.json        — version manifest read by @capgo/capacitor-updater
 *
 * The @capgo/capacitor-updater plugin on the device polls latest.json,
 * compares the "version" field to the currently installed bundle, and
 * if different, downloads bundle-latest.zip and hot-swaps the WebView
 * assets on the next app foreground cycle — without a Play Store update.
 */

'use strict';

const { execSync }  = require('child_process');
const fs            = require('fs');
const path          = require('path');
const crypto        = require('crypto');

// ─── Paths ───────────────────────────────────────────────────────────────────
const ROOT       = path.resolve(__dirname, '..');
const DIST       = path.join(ROOT, 'dist');
const UPDATES    = path.join(ROOT, 'public', 'updates');
const ZIP_PATH   = path.join(UPDATES, 'bundle-latest.zip');
const JSON_PATH  = path.join(UPDATES, 'latest.json');

// ─── Version ─────────────────────────────────────────────────────────────────
// Use package.json semver + a UTC timestamp suffix so every build
// produces a unique, lexicographically sortable version string.
const pkg          = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const ts           = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14); // YYYYMMDDHHmmss
const bundleVersion = `${pkg.version}+${ts}`;

// ─── Guard ───────────────────────────────────────────────────────────────────
if (!fs.existsSync(DIST) || !fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('❌  dist/index.html not found.');
  console.error('    Run:  CAPACITOR_BUILD=true npx astro build   first.');
  process.exit(1);
}

// ─── Create output directory ──────────────────────────────────────────────────
fs.mkdirSync(UPDATES, { recursive: true });

// ─── Zip the dist/ folder ────────────────────────────────────────────────────
// @capgo/capacitor-updater expects a flat zip whose root IS the web root
// (i.e. index.html sits at the top level inside the zip, not under dist/).
console.log(`\n📦  Packaging OTA bundle  v${bundleVersion} …`);

if (fs.existsSync(ZIP_PATH)) fs.unlinkSync(ZIP_PATH);

execSync(
  `zip -r "${ZIP_PATH}" . --exclude "*.DS_Store" --exclude ".git*" --exclude "updates/*"`,
  { cwd: DIST, stdio: 'inherit' }
);

// ─── Checksum + size ─────────────────────────────────────────────────────────
const zipData  = fs.readFileSync(ZIP_PATH);
const checksum = crypto.createHash('sha256').update(zipData).digest('hex');
const sizeMB   = (zipData.length / 1024 / 1024).toFixed(2);

// ─── Write version manifest ───────────────────────────────────────────────────
// Format consumed by @capgo/capacitor-updater (self-hosted mode).
const manifest = {
  version:          bundleVersion,
  url:              'https://sanskritbhashi.com/updates/bundle-latest.zip',
  checksum:         checksum,        // plain hex sha256
  size:             zipData.length,
  builtAt:          new Date().toISOString(),
  minNativeVersion: '1.0.0',         // bump when a native rebuild is required
};

fs.writeFileSync(JSON_PATH, JSON.stringify(manifest, null, 2) + '\n');

// ─── Summary ─────────────────────────────────────────────────────────────────
console.log(`\n✅  OTA bundle ready`);
console.log(`   File    : public/updates/bundle-latest.zip  (${sizeMB} MB)`);
console.log(`   Manifest: public/updates/latest.json`);
console.log(`   Version : ${bundleVersion}`);
console.log(`   SHA-256 : ${checksum}`);
console.log(`\n   Served at: https://sanskritbhashi.com/updates/latest.json`);
console.log(`   Push to git → Cloudflare Pages deploys → devices update silently.\n`);
