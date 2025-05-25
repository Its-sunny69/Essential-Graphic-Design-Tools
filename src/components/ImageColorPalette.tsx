"use client";

import React, { useRef, useState } from "react";
import ColorThief from "colorthief";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy, Download } from "lucide-react";
import { copyToClipboard } from "@/utils/clipboard";
import { rgbToHex } from "@/utils/colorPalette";
import { exportAsJSON } from "@/utils/colorPalette";
import { exportAsCSSVars } from "@/utils/colorPalette";
import { exportAsPNG } from "@/utils/colorPalette";
const ColorExtractor: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [palette, setPalette] = useState<number[][]>([]);
  const imgRef = useRef<HTMLImageElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const extractColors = () => {
    const img = imgRef.current;
    if (!img) return;

    const colorThief = new ColorThief();
    if (img.complete) {
      setPalette(colorThief.getPalette(img, 10));
    } else {
      img.addEventListener("load", () => {
        setPalette(colorThief.getPalette(img, 10));
      });
    }
  };

  const handleCopy = (text: string, index: number) => {
    copyToClipboard(text, {
      onSuccess: () => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1000);
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <p className="text-4xl font-bold text-center">Image-Based Color Palette Generator </p>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {imageUrl && (
            <img
              src={imageUrl}
              ref={imgRef}
              crossOrigin="anonymous"
              alt="Uploaded"
              onLoad={extractColors}
              className="w-full h-full rounded shadow"
            />
          )}
        </CardContent>
      </Card>

      {palette.length > 0 && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="font-semibold text-lg">🎨 Color Palette</h2>
            <div
              ref={paletteRef}
              className="grid grid-cols-2 sm:grid-cols-5 gap-4"
            >
              {palette.map((color, i) => {
                const hex = rgbToHex(color);
                const rgb = `rgb(${color.join(",")})`;
                return (
                  <div key={i} className="space-y-2 text-center">
                    <div
                      className="w-full h-16 rounded border"
                      style={{ backgroundColor: rgb }}
                    />
                    <div className="flex justify-center gap-2 items-center">
                      <span className="text-xs">{hex}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleCopy(hex, i)}
                      >
                        {copiedIndex === i ? (
                          <Check size={14} />
                        ) : (
                          <Copy size={14} />
                        )}
                      </Button>
                    </div>
                    <div className="flex justify-center gap-2 items-center">
                      <span className="text-xs">{rgb}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleCopy(rgb, i + 100)}
                      >
                        {copiedIndex === i + 100 ? (
                          <Check size={14} />
                        ) : (
                          <Copy size={14} />
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                onClick={() => exportAsPNG(paletteRef)}
                className="flex gap-2 items-center"
              >
                <Download size={16} /> Export as PNG
              </Button>
              <Button
                variant="outline"
                onClick={() => exportAsJSON(palette)}
                className="flex gap-2 items-center"
              >
                <Download size={16} /> Export as JSON
              </Button>
              <Button
                variant="outline"
                onClick={() => exportAsCSSVars(palette)}
                className="flex gap-2 items-center"
              >
                <Download size={16} /> Export as CSS
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ColorExtractor;
