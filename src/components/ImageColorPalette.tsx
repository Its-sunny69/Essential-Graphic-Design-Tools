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
import { Tooltip } from "react-tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="animate-fade-up">
      <p className="text-4xl font-bold text-center">
        Image-Based Color Palette Generator
      </p>

      <div className="border p-8 my-8 rounded-xl shadow-md">
        <div className="mb-8">
          <p className="font-semibold mb-4">Upload your reference image:</p>

          <div className="flex items-center justify-center w-full">
            <Label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 hover:border-gray-900 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
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
          <div className="mb-8 animate-fade">
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
              className="w-full h-80 rounded-xl shadow-md object-contain border"
              width={100}
              height={100}
            />
          </div>
        )}

        <Button onClick={extractColors} disabled={!imageUrl}>
          Generate Palette 🌈
        </Button>
      </div>

      <div>
        {loading ? (
          <div className="p-4 my-8">
            <p className="text-3xl font-bold">Painting Your Palette...🖌️</p>

            <div className="grid grid-flow-row grid-cols-2 gap-4 my-8">
              <div className="flex border py-2 px-3 justify-center items-center rounded-xl bg-slate-50">
                <Skeleton className="w-12 h-12 rounded border" />
                <div className="w-full py-2 pl-4 flex flex-col gap-4 font-mono">
                  <Skeleton className="w-full h-3" />
                  <Skeleton className="w-full h-3" />
                </div>
              </div>

              <div className="flex border py-2 px-3 justify-center items-center rounded-xl bg-slate-50">
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
            <div className="p-4 my-8 animate-fade">
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
                      className="flex border py-2 px-3 justify-center items-center rounded-xl bg-slate-50"
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
                            data-tooltip-id="clipboard-tooltip"
                            data-tooltip-content="Copy to clipboard"
                            data-tooltip-place="top"
                            className="active:scale-95 transition-all"
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
                            data-tooltip-id="clipboard-tooltip"
                            data-tooltip-content="Copy to clipboard"
                            data-tooltip-place="bottom"
                            className="active:scale-95 transition-all duration-200"
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
                  className="flex gap-2 items-center active:scale-95 transition-all"
                >
                  <Download size={16} /> Export as PNG
                </Button>
                <Button
                  variant="outline"
                  onClick={() => exportAsJSON(palette)}
                  className="flex gap-2 items-center active:scale-95 transition-all"
                >
                  <Download size={16} /> Export as JSON
                </Button>
                <Button
                  variant="outline"
                  onClick={() => exportAsCSSVars(palette)}
                  className="flex gap-2 items-center active:scale-95 transition-all"
                >
                  <Download size={16} /> Export as CSS
                </Button>
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-16 mb-8">
        <p className="text-4xl font-bold mb-6">How Color Extractor works ?</p>

        <ul className="pl-4 list-decimal text-lg">
          <li className="my-2">
            Upload any image (JPG, PNG, etc.) — product photos, illustrations,
            brand assets, etc.
          </li>
          <li className="my-2">
            Our tool analyzes the image and extracts 10 dominant colors
            automatically.
          </li>
          <li className="my-2">
            The palette is shown in both HEX and RGB formats for easy design
            use.
          </li>
          <li className="my-2">Each color is copyable with a single click.</li>
          <li className="my-2">
            Export your palette in multiple formats:
            <ul className="list-disc pl-4">
              <li>📎 PNG image</li>
              <li>📄JSON for dev workflows</li>
              <li> 🎨 CSS variables for web projects</li>
            </ul>
          </li>
        </ul>

        <p className="my-2 text-lg border-l-4 pl-2 py-1 bg-gray-50 rounded-lg">
          <span className="font-semibold">Perfect for: </span>Color inspiration,
          brand guides, theme creation, and product packaging.
        </p>
      </div>

      <div className="my-8">
        <header>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Discover Stunning Color Palettes with Our AI Color Palette Generator
          </h1>
          <p className="mt-2 ">
            Transform your images into professional-grade color palettes in
            seconds. Whether you're designing a brand, building a website, or
            crafting a presentation — our AI-powered tool extracts the top 10
            dominant colors with precision.
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            Why Color Palettes Are Crucial in Design
          </h2>
          <p className="mt-2 ">
            Colors influence emotions, behavior, and perception. A well-curated
            color palette strengthens visual identity and guides user attention
            effectively. Designers often spend hours trying to extract
            harmonious color schemes — our{" "}
            <strong>AI Color Palette Generator</strong> solves this instantly.
          </p>
          <p className="mt-2 ">
            Whether you're branding, creating a website, or designing packaging,
            consistent and compelling colors enhance user experience and brand
            recall.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            What Is the AI Color Palette Generator?
          </h2>
          <p className="mt-2 ">
            Our tool uses machine learning and image analysis to scan your
            uploaded image and generate a palette of the 10 most dominant
            colors. It supports PNG, JPG, and other common formats.
          </p>
          <p className="mt-2 ">
            Designed to be intuitive and fast, this tool is perfect for UI
            designers, artists, developers, or anyone looking to derive
            beautiful, ready-to-use color schemes.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
          <ol className="list-decimal list-inside mt-2  space-y-1">
            <li>Upload a reference image (PNG, JPG).</li>
            <li>
              The tool analyzes the image using AI-based color recognition.
            </li>
            <li>
              It extracts the top 10 dominant colors based on frequency and
              contrast.
            </li>
            <li>
              You instantly see swatches along with their HEX and RGB values.
            </li>
            <li>Export options include PNG, JSON, and CSS variables.</li>
          </ol>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            Why Use This AI Color Extractor?
          </h2>
          <ul className="list-disc pl-6  space-y-2">
            <li>
              <strong>Accurate</strong> – Identifies the most used and visually
              dominant tones.
            </li>
            <li>
              <strong>Fast</strong> – Generates palettes within seconds.
            </li>
            <li>
              <strong>Flexible Exports</strong> – Download as PNG, CSS, or JSON
              formats.
            </li>
            <li>
              <strong>Customizable</strong> – Copy individual HEX/RGB codes
              instantly.
            </li>
            <li>
              <strong>No Login Required</strong> – Free, private, and ready to
              use.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            Use Cases & Creative Applications
          </h2>
          <ul className="list-disc pl-6  space-y-2">
            <li>
              <strong>UI/UX Designers</strong> – Quickly build design systems
              based on visual references.
            </li>
            <li>
              <strong>Branding Experts</strong> – Extract color identity from
              product photos or moodboards.
            </li>
            <li>
              <strong>Developers</strong> – Generate CSS color tokens from
              design assets.
            </li>
            <li>
              <strong>Photographers</strong> – Analyze dominant tones for
              editing consistency.
            </li>
            <li>
              <b>Interior Designers</b> – Sample palettes from real-world decor
              images.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            SEO Benefits of Using Consistent Color Palettes
          </h2>
          <p className="mt-2 ">
            Consistent and accessible color palettes improve site performance,
            reduce bounce rates, and increase engagement. A visually pleasant UI
            keeps users on your page longer, indirectly benefiting search
            rankings.
          </p>
          <ul className="list-disc pl-6  space-y-2">
            <li>Improves brand recall</li>
            <li>Boosts user trust through visual consistency</li>
            <li>Enhances accessibility when paired with good contrast</li>
            <li>Increases social shareability with attractive visuals</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Final Thoughts</h2>
          <p className="mt-2 ">
            Our <strong>AI Color Palette Generator</strong> is designed for
            anyone who values color harmony — from creatives and coders to
            marketers and makers. Stop guessing and start designing with
            confidence.
          </p>
          <p className="mt-2 ">
            Try it out now and turn your inspiration into stunning visual
            identities.
          </p>
        </section>
      </div>

      <div className="my-8">
        <p className="text-4xl font-bold mb-6">FAQs</p>

        <Accordion type="single" className="pl-4" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What file formats are supported?
            </AccordionTrigger>
            <AccordionContent>
              You can upload most standard image formats like JPG, PNG, and GIF.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How many colors will it extract from an image?
            </AccordionTrigger>
            <AccordionContent>
              The tool extracts 10 of the most dominant colors automatically.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I copy the color codes?</AccordionTrigger>
            <AccordionContent>
              Yes! Each color is shown in HEX and RGB format, and you can copy
              them with a single click.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I export the entire palette?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely. You can export your palette as:
              <ul className="list-disc pl-4">
                <li>PNG (visual swatch)</li>
                <li> JSON (developer-friendly)</li>
                <li>CSS variables (for web styling)</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Can I extract from multiple images?
            </AccordionTrigger>
            <AccordionContent>
              You can upload and extract one image at a time. Just remove the
              current image to upload a new one.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Tooltip
        id="clipboard-tooltip"
        delayShow={300}
        noArrow={true}
        style={{ padding: "4px 8px" }}
      />
    </div>
  );
};

export default ColorExtractor;
