"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  containerId: string;
  scriptSrc: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdNativeBanner({
  containerId,
  scriptSrc,
  className = "",
  style = {},
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    // ✅ Inject script inside the ref container
    if (adRef.current) {
      adRef.current.innerHTML = ""; // Clear previous script if any
      adRef.current.appendChild(script);
    }

    // Optional cleanup
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, [scriptSrc]);

  return (
    <div
      ref={adRef}
      id={containerId}
      className={className}
      style={style}
    />
  );
}
