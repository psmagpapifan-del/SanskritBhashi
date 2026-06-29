#!/usr/bin/env node
/**
 * scripts/deploy.js
 *
 * Single entry-point for all deployment operations.
 *
 * Usage (via npm scripts):
 *   npm run deploy:all      — OTA web bundle + git push  (no Play Store update needed)
 *   npm run deploy:native   — Full native rebuild → signed AAB ready for Play Store upload
 *
 * Decision guide
 * ─────────────────────────────────────────────────────────────────────────────
 * Use deploy:all  when you changed:        Use deploy:native  when you changed:
 *   • Page content / layouts               • capacitor.config.ts plugin config
 *   • CSS / animations                     • AndroidManifest.xml permissions
 *   • React component logic                • android/app/build.gradle
 *   • i18n strings                         • New native Capacitor plugin added
 *   • Practice card content                • AdMob ad slot types changed
 *   • Any file inside src/                 • App icon / splash screen
 *                                          • Package version bump for store
 */

'use strict';

const { execSync } = require('child_process');
const path         = require('path');
const fs           = require('fs');

const ROOT  = path.resolve(__dirname, '..');
const JAVA  = '/Applications/Android Studio.app/Contents/jbr/Contents/Home';
const SDK   = process.env.HOME + '/Library/Android/sdk';

// ─── Env setup ───────────────────────────────────────────────────────────────
process.env.JAVA_HOME          = JAVA;
process.env.ANDROID_SDK_ROOT   = SDK;
process.env.PATH               = `${JAVA}/bin:${process.env.PATH}:${SDK}/platform-tools`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function run(cmd, opts = {}) {
  console.log(`\n▶  ${cmd}`);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit', ...opts });
}

function step(label) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  ${label}`);
  console.log('─'.repeat(60));
}

// ─── Steps ───────────────────────────────────────────────────────────────────

function gitCommitAndPush(message) {
  step('1 / Git — commit source changes');
  run(`git add .`);
  // --allow-empty lets the script succeed even if nothing changed in source
  run(`git commit --allow-empty -m "${message}"`);
  run(`git push origin main`);
}

function buildCapacitor() {
  step('2 / Astro — static build for Capacitor');
  run(`CAPACITOR_BUILD=true npx astro build`);
}

function packageOTA() {
  step('3 / OTA — package web bundle');
  run(`node scripts/package-ota.js`);
}

function commitOTABundle() {
  step('4 / Git — commit OTA bundle (triggers Cloudflare Pages deploy)');
  run(`git add public/updates`);
  run(`git commit --allow-empty -m "chore(ota): update web bundle"`);
  run(`git push origin main`);
}

function capSync() {
  step('5 / Capacitor — sync web assets to Android project');
  run(`npx cap sync android`);
}

function buildReleaseAAB() {
  step('6 / Gradle — assemble signed release AAB');
  run(`./gradlew bundleRelease`, { cwd: path.join(ROOT, 'android') });
  const aab = 'android/app/build/outputs/bundle/release/app-release.aab';
  const stat = fs.statSync(path.join(ROOT, aab));
  console.log(`\n✅  AAB ready: ${aab}  (${(stat.size / 1024 / 1024).toFixed(1)} MB)`);
  console.log(`   Upload this file to Play Console → Production → Create release.`);
}

// ─── Modes ───────────────────────────────────────────────────────────────────

const mode = process.argv[2] || 'all';
const now  = new Date().toISOString().slice(0, 16).replace('T', ' ');

switch (mode) {

  /**
   * deploy:all — OTA-only release (no Play Store update required).
   *
   * Timeline after running:
   *   ~30s  → Cloudflare Pages deploys latest.json + bundle-latest.zip
   *   Next app launch → device downloads bundle in background
   *   Second foreground → WebView hot-swaps to new assets silently
   */
  case 'all':
    console.log('\n🚀  DEPLOY:ALL — OTA web release');
    gitCommitAndPush(`chore: release ${now}`);
    buildCapacitor();
    packageOTA();
    commitOTABundle();
    capSync();
    console.log('\n🎉  OTA deploy complete!');
    console.log('   Devices will silently update on next launch.');
    break;

  /**
   * deploy:native — Full native rebuild.
   * Run when native config, plugins, or permissions change.
   * After this completes, upload app-release.aab to Play Console manually.
   */
  case 'native':
    console.log('\n🔧  DEPLOY:NATIVE — full native rebuild');
    gitCommitAndPush(`feat: native release ${now}`);
    buildCapacitor();
    packageOTA();
    commitOTABundle();
    capSync();
    buildReleaseAAB();
    console.log('\n🎉  Native build complete!');
    console.log('   Upload android/app/build/outputs/bundle/release/app-release.aab');
    console.log('   to Google Play Console → Production → Create new release.');
    break;

  default:
    console.error(`Unknown mode: ${mode}. Use 'all' or 'native'.`);
    process.exit(1);
}
