"use client";

import { useEffect } from "react";

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
  width = 468,
  height = 60,
  className = "",
  style = {},
}: AdScriptProps) {
  useEffect(() => {
    const optionsTag = document.createElement("script");
    optionsTag.type = "text/javascript";
    optionsTag.innerHTML = optionsScript;
    document.body.appendChild(optionsTag);

    const invokeTag = document.createElement("script");
    invokeTag.type = "text/javascript";
    invokeTag.src = srcScript;
    document.body.appendChild(invokeTag);

    return () => {
      document.body.removeChild(optionsTag);
      document.body.removeChild(invokeTag);
    };
  }, [optionsScript, srcScript]);

  return (
    <div
      id={id}
      className={className}
      style={{ width, height, margin: "20px auto", ...style }}
    />
  );
}
