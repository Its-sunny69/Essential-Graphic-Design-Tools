"use client";

import FontFinder from "@/components/FontFinder";
import GeneratorForm from "@/components/GeneratorForm";
import ColorExtractor from "@/components/ImageColorPalette";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Features() {
  const [currentFeature, setCurrentFeature] = useState<string>(
    "AI-brief-generator-\u2728"
  );
  const params = useSearchParams();
  const router = useRouter();
  const options = [
    "AI-brief-generator-\u2728",
    "font-finder-\u2712\uFE0F",
    "color-extractor-\u{1F308}",
  ];
  useEffect(() => {
    const tool = params.get("tool");

    if (tool) {
      options.forEach((item) => {
        if (item.includes(tool)) setCurrentFeature(item);
      });
    }
  }, [params]);

  const featureComponent: { [key: string]: ReactNode } = {
    "AI-brief-generator-\u2728": <GeneratorForm />,
    "font-finder-\u2712\uFE0F": <FontFinder />,
    "color-extractor-\u{1F308}": <ColorExtractor />,
  };

  const handleOption = (option: string) => {
    setCurrentFeature(option);

    const newParams = new URLSearchParams(params.toString());
    const keyword = option.split(/-(?=[^-]*$)/)[0]; // extract 'prompt', 'font', etc.
    newParams.set("tool", keyword);
    router.push(`/features?${newParams.toString()}`);
  };

  const formatText = (input: string) => {
    const text = input
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return text;
  };

  return (
    <section>
      <div className="md:w-[70%] sm:w-[80%] w-[90%] mx-auto">
        <div className="my-8">
          <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold text-center">
            Features That Fuel Creative Productivity
          </h1>

          <p className="mt-6 mb-14 text-center text-lg">
            Discover how each tool is designed to simplify your design process,
            reduce friction, and spark creativity.
          </p>
        </div>

        <div className="my-12 flex sm:flex-row flex-col sm:justify-around justify-center items-center sm:gap-0 gap-4">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleOption(option)}
              className={`sm:w-fit w-64 relative px-8 py-4 rounded-full bg-gray-50 text-gray-500 ${
                currentFeature === option ? "text-gray-900" : "border"
              } hover:text-gray-800 hover:bg-gray-100 transition-all`}
            >
              {formatText(option)}
              {currentFeature === option && (
                <BorderBeam duration={8} size={100} />
              )}
            </button>
          ))}
        </div>
        <div>{featureComponent[currentFeature]}</div>
      </div>
    </section>
  );
}
