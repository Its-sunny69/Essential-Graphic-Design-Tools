"use client";
import React, { useState, useEffect } from "react";

function AdDetection({ children }: { children: React.ReactNode }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isAdBlockerDetected, setIsAdBlockerDetected] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.onerror = () => {
      setIsAdBlockerDetected(true);
      setIsChecked(true);
    };
    script.onload = () => {
      setIsAdBlockerDetected(false);
      setIsChecked(true);
    };
    document.body.appendChild(script);
  }, []);

  if (!isChecked) return null;

  if (isAdBlockerDetected) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">AdBlock Detected</h1>
          <p>Please disable your AdBlocker to access this site.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default AdDetection;
