# SanskritBhashi — Native App Setup Guide

This guide covers everything needed to bootstrap and build the native Android and iOS apps from the existing Astro + Capacitor codebase.

---

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | ≥ 20 | [nodejs.org](https://nodejs.org) |
| Capacitor CLI | (bundled via npx) | `npm install` |
| Android Studio | Hedgehog+ | [developer.android.com/studio](https://developer.android.com/studio) |
| Xcode | 15+ | Mac App Store |
| CocoaPods | latest | `sudo gem install cocoapods` |
| JDK | 17 | `brew install openjdk@17` |

---

## Step 1 — Install Dependencies

```bash
npm install
```

All Capacitor packages are already listed in `package.json`.

---

## Step 2 — First-Time Native Project Generation

Run these once. They generate the `android/` and `ios/` project directories.

```bash
npx cap add android
npx cap add ios
```

> [!IMPORTANT]
> If you get a "android directory already exists" error, the project was already initialized. Skip to Step 3.

---

## Step 3 — Configure AdMob (Native Side)

### Android — `android/app/src/main/AndroidManifest.xml`

Add the AdMob App ID inside `<application>`:

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"/>
```

> Replace the placeholder with your real Android AdMob App ID. Missing or incorrect IDs will crash the app on launch.

### iOS — `ios/App/App/Info.plist`

Add inside the root `<dict>`:

```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX</string>

<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
    <key>NSAllowsArbitraryLoadsForMedia</key>
    <true/>
    <key>NSAllowsArbitraryLoadsInWebContent</key>
    <true/>
</dict>
```

---

## Step 4 — Apply Deep Link Patches

### Android

Merge the intent-filter blocks from `android-manifest-deeplink-patch.xml` into  
`android/app/src/main/AndroidManifest.xml` inside the `<activity>` element.

Then host: `https://sanskritbhashi.com/.well-known/assetlinks.json`

Test with ADB:
```bash
adb shell am start -W -a android.intent.action.VIEW \
  -d "sanskritbhashi://app/en?chapter=1&source=core" \
  com.sanskritbhashi.app
```

### iOS

1. Add blocks from `ios-infoplist-deeplink-patch.xml` into `ios/App/App/Info.plist`
2. Create `ios/App/App/App.entitlements` with the Associated Domains block
3. In Xcode → Target → Signing & Capabilities, add **Associated Domains**: `applinks:sanskritbhashi.com`
4. Host: `https://sanskritbhashi.com/.well-known/apple-app-site-association`

Test on simulator:
```bash
xcrun simctl openurl booted "sanskritbhashi://app/en?chapter=1&source=core"
```

---

## Step 5 — Build the Web Bundle

```bash
npm run app:build
```

This runs `CAPACITOR_BUILD=true astro build && cap sync`.

- `CAPACITOR_BUILD=true` strips the Cloudflare adapter for a pure static bundle
- `cap sync` copies `dist/` into the native WebView and syncs all plugin configs

---

## Step 6 — Open in Native IDE

### Android Studio
```bash
npm run app:android
```
1. Wait for Gradle sync to complete
2. Select a device/emulator → Press **Run**

### Xcode
```bash
npm run app:ios
```
1. Select the `App` scheme and your target device
2. Set your **Team** in Signing & Capabilities → Press **Run**

---

## Iterative Build Commands

| Command | Action |
|---|---|
| `npm run app:build` | Build static bundle + sync to native |
| `npm run app:android` | Open Android Studio |
| `npm run app:ios` | Open Xcode |
| `npm run app:run:android` | Build + run on connected Android device |
| `npm run app:run:ios` | Build + run on connected iOS device |

---

## AdMob Ad Unit ID Replacement Checklist

Find and replace all `TODO:` placeholder IDs in `src/components/NativeAdWidget.tsx`:

| Ad Format | Platform | Constant |
|---|---|---|
| Banner | Android | `AD_UNITS.banner.android` |
| Banner | iOS | `AD_UNITS.banner.ios` |
| Interstitial | Android | `AD_UNITS.interstitial.android` |
| Interstitial | iOS | `AD_UNITS.interstitial.ios` |
| Rewarded | Android | `AD_UNITS.rewarded.android` |
| Rewarded | iOS | `AD_UNITS.rewarded.ios` |

Also update `capacitor.config.ts` → `plugins.AdMob.appIdAndroid` and `appIdIos`.

---

## Production Release Checklist

- [ ] All AdMob App IDs replaced with production IDs
- [ ] `initializeForTesting: false` in `capacitor.config.ts`
- [ ] `android:autoVerify="true"` intent filter verified via Play Console
- [ ] AASA file at `https://sanskritbhashi.com/.well-known/apple-app-site-association`
- [ ] `assetlinks.json` at `https://sanskritbhashi.com/.well-known/assetlinks.json`
- [ ] iOS Associated Domains capability enabled, provisioning profile regenerated
- [ ] Android keystore signing configured for release build
- [ ] Push notification FCM Server Key added to Firebase Console
