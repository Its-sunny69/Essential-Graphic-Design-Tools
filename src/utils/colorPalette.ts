import { toPng } from "html-to-image";
import { RefObject } from "react";

export const rgbToHex = (rgb: number[]): string => {
  return (
    "#" +
    rgb
      .map((val) => {
        const hex = val.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

export const exportAsJSON = (palette: number[][]) => {
  const data = palette.map((rgb) => ({
    rgb,
    hex: rgbToHex(rgb),
  }));
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "palette.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const exportAsCSSVars = (palette: number[][]) => {
  const css = palette
    .map((rgb, i) => `--color-${i + 1}: ${rgbToHex(rgb)};`)
    .join("\n");
  const blob = new Blob([`:root {\n${css}\n}`], {
    type: "text/css",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "palette.css";
  a.click();
  URL.revokeObjectURL(url);
};

export const exportAsPNG = (paletteRef: RefObject<HTMLDivElement | null>) => {
  if (!paletteRef.current) return;
  toPng(paletteRef.current).then((dataUrl) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "palette.png";
    a.click();
  });
};
