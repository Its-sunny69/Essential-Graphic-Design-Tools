"use client";
import { useEffect, useRef } from "react";

interface AdScriptProps {
  id: string;
  optionsScript: string;
  srcScript: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdBanner({
  id,
  optionsScript,
  srcScript,
  width,
  height,
  className = "",
  style = {},
}: AdScriptProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create and inject the `atOptions` script
    const optionsTag = document.createElement("script");
    optionsTag.type = "text/javascript";
    optionsTag.innerHTML = optionsScript;

    // Create and inject the invoke script
    const invokeTag = document.createElement("script");
    invokeTag.type = "text/javascript";
    invokeTag.src = srcScript;

    // Append to the container, not body
    containerRef.current.appendChild(optionsTag);
    containerRef.current.appendChild(invokeTag);

    return () => {
      // Cleanup
      if (containerRef.current?.contains(optionsTag))
        containerRef.current.removeChild(optionsTag);
      if (containerRef.current?.contains(invokeTag))
        containerRef.current.removeChild(invokeTag);
    };
  }, [optionsScript, srcScript]);

  return (
    <div
      id={id}
       className={`relative overflow-hidden ${className}`}
      style={{ width, height, margin: "20px auto", ...style }}
      ref={containerRef}
    />
  );
}
