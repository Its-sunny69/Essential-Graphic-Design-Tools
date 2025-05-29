"use client";

import React, { useRef, useState } from "react";
import ColorThief from "colorthief";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Check,
  Copy,
  Download,
  Trash2Icon,
  UploadCloudIcon,
} from "lucide-react";
import { copyToClipboard } from "@/utils/clipboard";
import { rgbToHex } from "@/utils/colorPalette";
import { exportAsJSON } from "@/utils/colorPalette";
import { exportAsCSSVars } from "@/utils/colorPalette";
import { exportAsPNG } from "@/utils/colorPalette";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
const ColorExtractor: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [palette, setPalette] = useState<number[][]>([]);
  const imgRef = useRef<HTMLImageElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageUrl(url);

    e.target.value = "";
  };

  const extractColors = () => {
    setLoading(true);

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

    setLoading(false);
  };

  const handleDeleteImage = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl); // Clean up URL
      setImageUrl(null);
      setPalette([]);
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

  function darkenRGB(rgb: string, percent: number): string {
    const match = rgb.match(/\d+/g);
    if (!match || match.length !== 3) return rgb;

    const [r, g, b] = match.map(Number);

    const factor = 1 - percent / 100;
    const newR = Math.max(0, Math.round(r * factor));
    const newG = Math.max(0, Math.round(g * factor));
    const newB = Math.max(0, Math.round(b * factor));

    return `rgb(${newR}, ${newG}, ${newB})`;
  }

  return (
    <>
      <p className="text-4xl font-bold text-center">
        Image-Based Color Palette Generator
      </p>

      <div className="border p-8 my-8 rounded-md shadow-md">
        <div className="mb-8">
          <p className="font-semibold mb-4">Upload your reference image:</p>

          <div className="flex items-center justify-center w-full">
            <Label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 hover:border-gray-900 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
            >
              <div className="flex flex-col items-center justify-center">
                <UploadCloudIcon size={64} className="text-gray-400" />

                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG, JPEG or GIF
                </p>
              </div>
              <Input
                id="dropzone-file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </Label>
          </div>
        </div>

        {imageUrl && (
          <div className="mb-8">
            <div className="mb-4 flex justify-between items-center">
              <p className="font-semibold">Uploaded Image: </p>
              <button
                className="text-red-500 active:scale-95 transition-all hover:opacity-70"
                onClick={handleDeleteImage}
              >
                <Trash2Icon />
              </button>
            </div>

            <Image
              src={imageUrl}
              ref={imgRef}
              crossOrigin="anonymous"
              alt="Uploaded"
              className="w-full h-80 rounded shadow-md object-contain border"
            />
          </div>
        )}

        <Button onClick={extractColors} disabled={!imageUrl}>
          Generate Palette 🌈
        </Button>
      </div>

      {/* add loading here...... */}
      {loading ? (
        <div className="p-4 rounded-md my-8">
          <p className="text-3xl font-bold">Painting Your Palette...🖌️</p>

          <div className="grid grid-flow-row grid-cols-2 gap-4 my-8">
            <div className="flex border py-2 px-3 justify-center items-center rounded-lg bg-slate-50">
              <Skeleton className="w-12 h-12 rounded border" />
              <div className="w-full py-2 pl-4 flex flex-col gap-4 font-mono">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-full h-3" />
              </div>
            </div>

            <div className="flex border py-2 px-3 justify-center items-center rounded-lg bg-slate-50">
              <Skeleton className="w-12 h-12 rounded border" />
              <div className="w-full py-2 pl-4 flex flex-col gap-4 font-mono">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-full h-3" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        palette.length > 0 && (
          <div className="p-4 rounded-md my-8">
            <p className="text-3xl font-bold">
              Here’s Your Custom Color Palette 🎨
            </p>

            <div
              ref={paletteRef}
              className="grid grid-flow-row grid-cols-2 gap-4 my-8"
            >
              {palette.map((color, i) => {
                const hex = rgbToHex(color);
                const rgb = `rgb(${color.join(",")})`;
                const darkColor = darkenRGB(rgb, 15);

                return (
                  <div
                    key={i}
                    className="flex border py-2 px-3 justify-center items-center rounded-lg bg-slate-50"
                  >
                    <div
                      className={`w-12 h-12 rounded border`}
                      style={{ backgroundColor: rgb, borderColor: darkColor }}
                    />

                    <div className="w-full py-2 pl-4 font-mono">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">{hex}</span>
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

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-500">
                          {rgb}
                        </span>
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
          </div>
        )
      )}
    </>
  );
};

export default ColorExtractor;
