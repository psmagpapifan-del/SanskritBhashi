"use client";

import React, { useEffect } from "react";

interface AdSenseProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  variant: "inline-banner" | "sidebar-ad";
}

export default function AdSenseWidget({ slot, format = "auto", variant }: AdSenseProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      // Catch adsense init errors if script not loaded yet
    }
  }, [slot]);

  return (
    <div
      className={`adsense-wrapper ${variant} my-6 mx-auto w-full overflow-hidden rounded-2xl bg-[#FAF9F6] p-3 border border-[#FFB300]/20 min-h-[100px] flex flex-col items-center justify-center relative select-none`}
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "auto 100px",
      }}
    >
      {/* Visual Indicator of ad slot - soft cream background, strict boundaries */}
      <span className="absolute top-1.5 right-2.5 text-[8px] font-bold uppercase tracking-wider text-charcoal/20">
        Advertisement
      </span>

      <ins
        className="adsbygoogle w-full"
        style={{ display: "block" }}
        data-ad-client="ca-pub-YOUR_ADSENSE_ID" // Replace with production ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
