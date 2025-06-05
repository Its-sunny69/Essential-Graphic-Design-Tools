"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel/Carousel";
import { trackEvent } from "@/lib/ga";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  const carouselItem = [
    { description: "Cool text animations for your projects." },
    { description: "Smooth animations for your projects." },
    { description: "Reusable components for your projects." },
    { description: "Beautiful backgrounds and patterns for your projects." },
    { description: "Common UI components are coming soon!" },
  ];

  const handleAction = (tool: string) => {
    trackEvent("home-to-features", "click", tool);
  };

  return (
    <div className=" md:w-[70%] sm:w-[80%] w-[90%] mx-auto">
      <section>
        <div className="sm:my-20 my-14">
          <h1 className="tracking-tighter md:text-7xl sm:text-6xl text-5xl text-center font-bold">
            Unlock Smarter Design with
            <br />
            <p className="bg-gradient-to-r from-purple-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">
              AI-Powered Tools
            </p>
          </h1>

          <p className="sm:mt-8 mt-6 sm:mb-14 mb-10 sm:text-center text-justify text-lg">
            Fast-track your creative workflow using intelligent design
            generators
            <br className="md:inline hidden" />
            from design briefs to color palettes and perfect fonts.
          </p>

          <div className="text-center">
            <Link
              href="/features"
              className="bg-black text-white text-lg px-10 py-3 font-semibold tracking-wider rounded-full hover:outline hover:outline-gray-400 hover:outline-1 hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              Try Now
            </Link>
            <p className="text-xs text-gray-600 italic mt-3">
              No login required. 100% free.
            </p>
          </div>
        </div>

        <div className="w-full p-1 flex justify-center items-center">
          <AdBanner
            id="tool-1"
            className="bg-green-400"
            optionsScript={`
              atOptions = {
                  'key' : 'c9458f4005dcdfff434c815bac568ffa',
                  'format' : 'iframe',
                  'height' : 60,
                  'width' : 468,
                  'params' : {}
	            }`}
            srcScript="//www.highperformanceformat.com/c9458f4005dcdfff434c815bac568ffa/invoke.js"
          />
        </div>

        <div className="sm:my-20 my-14 md:grid grid-cols-2">
          <div className="md:text-left text-justify">
            <h2 className="md:text-6xl text-4xl md:text-left text-center font-bold">
              Spark Creativity?
            </h2>
            <p className="md:mt-8 mt-4 text-lg ">
              {" "}
              Try these amazing AI-powered prompts to jumpstart your next
              design, unlock fresh ideas, and bring your creative vision to life
              — instantly.
            </p>
          </div>

          <div className="flex md:justify-end justify-center items-center">
            <Carousel
              baseWidth={350}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
              items={carouselItem}
            />
          </div>
        </div>
      </section>
      <section className="sm:my-20 my-14">
        <h2 className="md:text-6xl text-4xl font-bold text-center">
          What we Offer ?
        </h2>

        <div className="sm:grid grid-cols-3 gap-2 pt-8">
          <Link
            href="/features?tool=design-brief-generator"
            className="cursor-pointer"
            onClick={() => handleAction("design-brief-generator")}
          >
            <CardContainer>
              <CardBody className="bg-gray-50 relative group/card border-black/[0.1] rounded-xl md:p-6 p-3 border">
                <CardItem
                  translateZ="50"
                  className="md:py-5 py-3 md:text-5xl text-3xl"
                >
                  {"\u2728"}
                </CardItem>

                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-900 w-full md:text-lg font-semibold sm:text-center mt-2"
                >
                  AI Design Brief <br className="md:hidden sm:inline hidden" />
                  Generator
                </CardItem>

                <CardItem
                  translateZ="80"
                  as="button"
                  className="px-2 py-2 rounded-xl text-sm bg-black text-white text-justify mt-4"
                >
                  Generate concise and professional design briefs tailored to
                  your industry, style, and brand.
                </CardItem>
              </CardBody>
            </CardContainer>
          </Link>

          <Link
            href="/features?tool=font-finder"
            className="cursor-pointer"
            onClick={() => handleAction("font-finder")}
          >
            <CardContainer>
              <CardBody className="bg-gray-50 relative group/card border-black/[0.1] rounded-xl md:p-6 p-3 border">
                <CardItem
                  translateZ="50"
                  className="md:py-5 py-3 md:text-5xl text-3xl"
                >
                  {"\u2712\uFE0F"}
                </CardItem>

                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-900 w-full md:text-lg font-semibold sm:text-center mt-2"
                >
                  Keyword-Based <br className="md:hidden sm:inline hidden" />
                  Font Finder
                </CardItem>

                <CardItem
                  translateZ="80"
                  as="button"
                  className="px-2 py-2 rounded-xl bg-black text-sm text-white text-justify mt-4"
                >
                  Enter a theme-related keyword like &quot;school&quot;,
                  &quot;luxury&quot;, or &quot;comic&quot;, and get 5 free
                  commercial-use fonts.
                </CardItem>
              </CardBody>
            </CardContainer>
          </Link>

          <Link
            href="/features?tool=color-extractor"
            className="cursor-pointer"
            onClick={() => handleAction("color-extractor")}
          >
            <CardContainer>
              <CardBody className="bg-gray-50 relative group/card border-black/[0.1] rounded-xl md:p-6 p-3 border">
                <CardItem
                  translateZ="50"
                  className="md:py-5 py-3 md:text-5xl text-3xl"
                >
                  {"\u{1F308}"}
                </CardItem>

                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-900 w-full md:text-lg font-semibold sm:text-center mt-2"
                >
                  Color Palette <br className="md:hidden sm:inline hidden" />
                  Extractor
                </CardItem>

                <CardItem
                  translateZ="80"
                  as="button"
                  className="px-2 py-2 rounded-xl bg-black text-sm text-white text-justify mt-4"
                >
                  Upload an image (e.g., product photo or moodboard) and get 10
                  dominant HEX and RGB colors.
                </CardItem>
              </CardBody>
            </CardContainer>
          </Link>
        </div>
      </section>
    </div>
  );
}
