"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdUnitProps {
  slot: string;
  format?: "horizontal" | "vertical" | "square";
}

export default function AdUnit({ slot, format = "horizontal" }: AdUnitProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const adRef = useRef<HTMLModElement>(null);

  const classes = {
    horizontal: "w-full min-h-[90px] md:min-h-[250px]",
    vertical: "w-full min-h-[600px]",
    square: "w-full min-h-[250px]",
  };

  useEffect(() => {
    try {
      if (adRef.current && adRef.current.innerHTML === "") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, []);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className={`bg-gray-50 flex flex-col items-center justify-center my-8 mx-auto relative overflow-hidden ${classes[format]}`}>
      <span className="absolute top-0 left-0 bg-gray-200 text-[9px] text-gray-500 px-1 py-0.5 z-10">
        ADVERTISEMENT
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Remember to add your ID later
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      {isDev && !adLoaded && (
         <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
            Dev Mode: Ad Slot {slot}
         </div>
      )}
    </div>
  );
}