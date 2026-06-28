"use client";

/**
 * NativeAdWidget.tsx
 *
 * Unified ad component for all three mobile ad formats.
 * When running in a Capacitor native shell, renders native AdMob ads.
 * When running on web (dev or production web), falls back to the existing
 * AdSenseWidget component so web yield is completely unaffected.
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  type='banner'       → Adaptive Anchor Banner            │
 * │                         Renders below PracticeCard       │
 * │  type='interstitial' → Full-Screen Interstitial          │
 * │                         Fires after gateway exam pass    │
 * │  type='rewarded'     → Rewarded Video                    │
 * │                         Grants Shastra chapter unlock    │
 * └──────────────────────────────────────────────────────────┘
 *
 * CLS guarantee: The banner bounding box (min-h-[100px]) is reserved in the
 * DOM before the native ad loads, preventing layout shift on high-refresh-rate
 * mobile screens.
 *
 * TODO: Replace ALL ad-unit-id placeholder strings with your production
 *       AdMob ad unit IDs from https://apps.admob.com before app store release.
 */

import React, { useEffect, useRef, useState } from "react";
import AdSenseWidget from "./AdSenseWidget";
import { isNative } from "../lib/capacitorBridge";

// ─── AdMob lazy loader ────────────────────────────────────────────────────────

// Lazily imported so the AdMob package is tree-shaken from web builds
type AdMobType = typeof import('@capacitor-community/admob').AdMob;
type BannerAdOptions = import('@capacitor-community/admob').BannerAdOptions;
type AdOptions = import('@capacitor-community/admob').AdOptions;
type RewardAdOptions = import('@capacitor-community/admob').RewardAdOptions;
type BannerAdSizeEnum = import('@capacitor-community/admob').BannerAdSize;

let _AdMob: AdMobType | null = null;
let _BannerAdSize: BannerAdSizeEnum | null = null;
let _BannerAdPosition: unknown = null;

async function loadAdMob() {
  if (!_AdMob) {
    try {
      const mod = await import('@capacitor-community/admob');
      _AdMob = mod.AdMob;
      _BannerAdSize = mod.BannerAdSize as unknown as BannerAdSizeEnum;
      _BannerAdPosition = mod.BannerAdPosition;
      await _AdMob.initialize({ initializeForTesting: false });
    } catch {
      _AdMob = null;
    }
  }
  return { AdMob: _AdMob, BannerAdSize: _BannerAdSize, BannerAdPosition: _BannerAdPosition };
}

// ─── Ad Unit IDs ─────────────────────────────────────────────────────────────
// TODO: Swap these for your real production ad unit IDs.

const AD_UNITS = {
  banner: {
    android: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // TODO: Android banner ID
    ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',     // TODO: iOS banner ID
  },
  interstitial: {
    android: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // TODO: Android interstitial ID
    ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',     // TODO: iOS interstitial ID
  },
  rewarded: {
    android: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // TODO: Android rewarded ID
    ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',     // TODO: iOS rewarded ID
  },
} as const;

function getPlatformAdId(type: keyof typeof AD_UNITS): string {
  if (typeof window === 'undefined') return AD_UNITS[type].android;
  const cap = (window as any).Capacitor;
  const platform: string = cap?.getPlatform?.() ?? 'web';
  return platform === 'ios' ? AD_UNITS[type].ios : AD_UNITS[type].android;
}

// ─── Component props ──────────────────────────────────────────────────────────

export interface NativeAdWidgetProps {
  /** 'banner' renders inline below PracticeCard.
   *  'interstitial' and 'rewarded' are triggered imperatively — no DOM output. */
  type: 'banner' | 'interstitial' | 'rewarded';

  /** For 'rewarded' type: callback fired when the user completes video playback.
   *  Grant premium Shastra chapter access inside this callback. */
  onRewardEarned?: () => void;

  /** For 'interstitial' type: callback fired when the ad is dismissed. */
  onInterstitialDismissed?: () => void;

  /** Trigger flag — set to true to imperatively show interstitial or rewarded.
   *  Ignored for 'banner' type (which auto-shows on mount). */
  show?: boolean;

  /** AdSense slot id passed through to the web fallback. */
  adSenseSlot?: string;
}

// ─── Banner Ad ────────────────────────────────────────────────────────────────

function BannerAdNative() {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    async function showBanner() {
      const { AdMob, BannerAdSize, BannerAdPosition } = await loadAdMob();
      if (!AdMob || !BannerAdSize) return;

      const options: BannerAdOptions = {
        adId: getPlatformAdId('banner'),
        adSize: (BannerAdSize as any).ADAPTIVE_BANNER,
        position: (BannerAdPosition as any).BOTTOM_CENTER,
        margin: 0,
        isTesting: false,
      };

      try {
        await AdMob.showBanner(options);
      } catch (err) {
        console.warn('[NativeAdWidget] Banner show failed:', err);
      }
    }

    showBanner();

    return () => {
      // Clean up banner when component unmounts
      loadAdMob().then(({ AdMob }) => {
        AdMob?.removeBanner().catch(() => {});
      });
    };
  }, []);

  // The native AdMob banner renders OUTSIDE the WebView as an OS overlay.
  // We reserve the exact pixel height in the DOM so content doesn't shift
  // when the overlay appears (CLS = 0).
  return (
    <div
      aria-hidden="true"
      className={[
        "w-full",
        // Fixed-height bounding box — matches AdMob ADAPTIVE_BANNER height
        // (typically 50px portrait / 32px landscape on most devices).
        // Using min-h prevents CLS while allowing the native overlay to sit flush.
        "min-h-[50px] max-h-[100px]",
        "bg-transparent",
        // Prevent content from flowing under the native overlay
        "relative z-0",
      ].join(" ")}
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 50px" }}
    />
  );
}

// ─── Interstitial Ad ──────────────────────────────────────────────────────────

function useInterstitialAd(show: boolean, onDismissed?: () => void) {
  const preparedRef = useRef(false);

  // Pre-load the interstitial so it's ready to show instantly
  useEffect(() => {
    if (!isNative() || preparedRef.current) return;

    async function prepareAd() {
      const { AdMob } = await loadAdMob();
      if (!AdMob) return;

      try {
        const options: AdOptions = { adId: getPlatformAdId('interstitial') };
        await AdMob.prepareInterstitial(options);
        preparedRef.current = true;
      } catch (err) {
        console.warn('[NativeAdWidget] Interstitial prepare failed:', err);
      }
    }

    prepareAd();
  }, []);

  // Fire the interstitial when the `show` flag toggles to true
  useEffect(() => {
    if (!show || !isNative()) return;

    async function showAd() {
      const { AdMob } = await loadAdMob();
      if (!AdMob) return;

      try {
        // Set up dismiss listener before showing
        await AdMob.addListener('interstitialAdLoaded' as any, () => {});
        await AdMob.addListener('interstitialAdFailedToLoad' as any, (err: unknown) => {
          console.warn('[NativeAdWidget] Interstitial load failed:', err);
          onDismissed?.();
        });

        await AdMob.showInterstitial();
        preparedRef.current = false; // Reset so next call re-prepares

        // Re-prepare for next gateway event
        const options: AdOptions = { adId: getPlatformAdId('interstitial') };
        AdMob.prepareInterstitial(options)
          .then(() => { preparedRef.current = true; })
          .catch(() => {});

        onDismissed?.();
      } catch (err) {
        console.warn('[NativeAdWidget] Interstitial show failed:', err);
        onDismissed?.();
      }
    }

    showAd();
  }, [show, onDismissed]);
}

// ─── Rewarded Video Ad ────────────────────────────────────────────────────────

function useRewardedAd(show: boolean, onRewardEarned?: () => void) {
  const preparedRef = useRef(false);

  useEffect(() => {
    if (!isNative() || preparedRef.current) return;

    async function prepareAd() {
      const { AdMob } = await loadAdMob();
      if (!AdMob) return;

      try {
        const options: RewardAdOptions = {
          adId: getPlatformAdId('rewarded'),
          isTesting: false,
        };
        await AdMob.prepareRewardVideoAd(options);
        preparedRef.current = true;
      } catch (err) {
        console.warn('[NativeAdWidget] Rewarded prepare failed:', err);
      }
    }

    prepareAd();
  }, []);

  useEffect(() => {
    if (!show || !isNative()) return;

    async function showAd() {
      const { AdMob } = await loadAdMob();
      if (!AdMob) return;

      try {
        // Listen for the reward callback
        await AdMob.addListener('onRewardedVideoAdLoaded' as any, () => {});
        await AdMob.addListener('rewarded' as any, () => {
          // User watched the full video — fire the reward callback
          onRewardEarned?.();
        });
        await AdMob.addListener('rewardVideoAdFailedToLoad' as any, (err: unknown) => {
          console.warn('[NativeAdWidget] Rewarded load failed:', err);
          onRewardEarned?.(); // Fail-open: grant access if ad fails to protect UX
        });

        await AdMob.showRewardVideoAd();
        preparedRef.current = false;

        // Re-prepare for next unlock event
        const options: RewardAdOptions = {
          adId: getPlatformAdId('rewarded'),
          isTesting: false,
        };
        AdMob.prepareRewardVideoAd(options)
          .then(() => { preparedRef.current = true; })
          .catch(() => {});
      } catch (err) {
        console.warn('[NativeAdWidget] Rewarded show failed:', err);
        onRewardEarned?.(); // Fail-open on error
      }
    }

    showAd();
  }, [show, onRewardEarned]);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NativeAdWidget({
  type,
  onRewardEarned,
  onInterstitialDismissed,
  show = false,
  adSenseSlot = 'inline-banner-slot',
}: NativeAdWidgetProps) {
  const [native] = useState(() => isNative());

  // Interstitial and rewarded hooks — always called unconditionally (React rules)
  useInterstitialAd(type === 'interstitial' ? show : false, onInterstitialDismissed);
  useRewardedAd(type === 'rewarded' ? show : false, onRewardEarned);

  // Interstitial and Rewarded ads have no DOM output — they're full-screen OS overlays
  if (type === 'interstitial' || type === 'rewarded') {
    return null;
  }

  // ── Banner ──────────────────────────────────────────────────────────────────

  if (native) {
    return <BannerAdNative />;
  }

  // ── Web fallback: existing AdSense widget ───────────────────────────────────
  return (
    <AdSenseWidget
      slot={adSenseSlot}
      variant="inline-banner"
      format="auto"
    />
  );
}

// ─── Named export for imperative usage ───────────────────────────────────────

/**
 * Convenience hook for pages that need to imperatively trigger interstitial
 * or rewarded ads without rendering a component tree.
 *
 * Example (gateway completion):
 *   const { showInterstitial } = useNativeAds();
 *   // After exam pass:
 *   showInterstitial();
 */
export function useNativeAds() {
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [showRewarded, setShowRewarded] = useState(false);
  const [rewardCallback, setRewardCallback] = useState<(() => void) | undefined>();

  useInterstitialAd(showInterstitial, () => setShowInterstitial(false));
  useRewardedAd(showRewarded, () => {
    setShowRewarded(false);
    rewardCallback?.();
  });

  return {
    /** Fire the gateway interstitial ad. */
    triggerInterstitial: () => setShowInterstitial(true),
    /** Fire the rewarded video ad. Pass a callback to execute on completion. */
    triggerRewarded: (onEarned: () => void) => {
      setRewardCallback(() => onEarned);
      setShowRewarded(true);
    },
  };
}
