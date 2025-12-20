"use client";

import { useEffect, useRef, useState } from "react";

// Tell TypeScript that window.adsbygoogle exists
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdUnitProps {
  slot: string; // The ID from your Google AdSense Dashboard
  format?: "horizontal" | "vertical" | "square";
}

export default function AdUnit({ slot, format = "horizontal" }: AdUnitProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const adRef = useRef<HTMLModElement>(null);

  // Define sizes - used min-h to allow expansion but reserve space
  const classes = {
    horizontal: "w-full min-h-[90px] md:min-h-[250px]", // Adaptive Leaderboard
    vertical: "w-full min-h-[600px]",                    // Sidebar Skyscraper
    square: "w-full min-h-[250px]",                      // Content Square
  };

  useEffect(() => {
    try {
      // Check if ad has already been loaded in this specific slot to prevent duplicates
      if (adRef.current && adRef.current.innerHTML === "") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, []);

  // Development Helper: If you are on localhost, this helps you see where ads will be
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div
      className={`bg-gray-50 flex flex-col items-center justify-center my-8 mx-auto relative overflow-hidden ${classes[format]}`}
    >
      {/* This is the standard "Ad Label" Google requires. 
        It sits above the ad. 
      */}
      <span className="absolute top-0 left-0 bg-gray-200 text-[9px] text-gray-500 px-1 py-0.5 z-10">
        ADVERTISEMENT
      </span>

      {/* The Actual Google Script Tag */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID_HERE" // <--- REPLACE THIS WITH YOUR ID
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      {/* Fallback for Dev Mode (so you can see the box while coding) */}
      {isDev && !adLoaded && (
         <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
            Dev Mode: Ad Slot {slot}
         </div>
      )}
    </div>
  );
}