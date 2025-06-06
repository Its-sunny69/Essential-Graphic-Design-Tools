"use client";

import AdBanner from "@/components/Ads/AdBanner";
import AdNativeBanner from "@/components/Ads/AdNativeBanner";
import FontFinder from "@/components/FontFinder";
import GeneratorForm from "@/components/GeneratorForm";
import ColorExtractor from "@/components/ImageColorPalette";
import { BorderBeam } from "@/components/magicui/border-beam";
import { trackEvent } from "@/lib/ga";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Features() {
  const [currentFeature, setCurrentFeature] = useState<string>(
    "design-brief-generator-\u2728"
  );
  const params = useSearchParams();
  const router = useRouter();
  const options = [
    "design-brief-generator-\u2728",
    "font-finder-\u2712\uFE0F",
    "color-extractor-\u{1F308}",
  ];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const tool = params.get("tool");

    if (tool) {
      options.forEach((item) => {
        if (item.includes(tool)) setCurrentFeature(item);
      });
    }
  }, [params]);

  const featureComponent: { [key: string]: ReactNode } = {
    "design-brief-generator-\u2728": <GeneratorForm />,
    "font-finder-\u2712\uFE0F": <FontFinder />,
    "color-extractor-\u{1F308}": <ColorExtractor />,
  };

  const handleOption = (option: string) => {
    setCurrentFeature(option);

    const newParams = new URLSearchParams(params.toString());
    const keyword = option.split(/-(?=[^-]*$)/)[0]; // extract 'prompt', 'font', etc.
    newParams.set("tool", keyword);
    router.push(`/features?${newParams.toString()}`);
    trackEvent("features", "click", keyword);
  };

  const formatText = (input: string) => {
    const text = input
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return text;
  };

  return (
    <section>
      <div className="flex">
        <div className="w-1/6">
          {!isMobile && (
            <AdNativeBanner
              containerId="container-d3598d23f6d94cef0c4e821a00490f93"
              scriptSrc="//pl26848652.profitableratecpm.com/d3598d23f6d94cef0c4e821a00490f93/invoke.js"
              className="overflow-hidden "
            />
          )}
        </div>

        <div>
          <div className="my-8">
            <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold text-center">
              Features That Fuel Creative Productivity
            </h1>

            <p className="mt-6 mb-14 text-center text-lg">
              Discover how each tool is designed to simplify your design
              process, reduce friction, and spark creativity.
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

          <div className="tool-one flex justify-center items-center">
            {isMobile ? (
              <AdBanner
                id="adtool-five"
                className="w-fit"
                optionsScript={`
                atOptions = {
                  'key' : '8b87cd9aeb3337f3a7ea3c3b2d0808a5',
                  'format' : 'iframe',
                  'height' : 250,
                  'width' : 300,
                  'params' : {}
                }`}
                srcScript="//www.highperformanceformat.com/8b87cd9aeb3337f3a7ea3c3b2d0808a5/invoke.js"
              />
            ) : (
              <AdBanner
                id="adtool-six"
                className="w-fit h-fit"
                optionsScript={`
                atOptions = {
                    'key' : '3cc4b180d3a64b5885ba379ca002ec21',
                    'format' : 'iframe',
                    'height' : 90,
                    'width' : 728,
                    'params' : {}
                }`}
                srcScript="//www.highperformanceformat.com/3cc4b180d3a64b5885ba379ca002ec21/invoke.js"
              />
            )}
          </div>

          <div>{featureComponent[currentFeature]}</div>
        </div>

        <div className="w-1/6">
          {!isMobile && (
            <AdNativeBanner
              containerId="container-d3598d23f6d94cef0c4e821a00490f93"
              scriptSrc="//pl26848652.profitableratecpm.com/d3598d23f6d94cef0c4e821a00490f93/invoke.js"
              className="overflow-hidden "
            />
          )}
        </div>
      </div>
    </section>
  );
}
