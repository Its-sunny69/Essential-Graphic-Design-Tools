"use client";

import FontFinder from "@/components/FontFinder";
import GeneratorForm from "@/components/GeneratorForm";
import ColorExtractor from "@/components/ImageColorPalette";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShineBorder } from "@/components/magicui/shine-border";
import { ReactNode, useState } from "react";

export default function Features() {
  const [currentFeature, setCurrentFeature] = useState<string>(
    "prompt-generator-\u2728"
  );

  const options = [
    "prompt-generator-\u2728",
    "font-finder-\u2712\uFE0F",
    "color-extractor-\u{1F308}",
  ];

  const featureComponent: { [key: string]: ReactNode } = {
    "prompt-generator-\u2728": <GeneratorForm />,
    "font-finder-\u2712\uFE0F": <FontFinder />,
    "color-extractor-\u{1F308}": <ColorExtractor />,
  };

  const formateText = (input: string) => {
    const text = input
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return text;
  };

  return (
    <div className="w-[50%] mx-auto">
      <div className="my-8">
        <p className="text-6xl font-bold text-center">
          Features That Fuel Creative Productivity
        </p>

        <p className="mt-6 mb-14 text-center text-lg">
          Discover how each tool is designed to simplify your design process,
          reduce friction, and spark creativity.
        </p>
      </div>

      <div className="my-12 flex justify-between items-center">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setCurrentFeature(option)}
            className={` relative px-8 py-4 rounded-full bg-gray-50 text-gray-500 ${
              currentFeature === option ? "text-gray-900" : "border"
            } hover:text-gray-800 hover:bg-gray-100 transition-all`}
          >
            {formateText(option)}
            {currentFeature === option && (
              <BorderBeam duration={8} size={100} />
            )}
          </button>
        ))}
      </div>
      <div>{featureComponent[currentFeature]}</div>
    </div>
  );
}
