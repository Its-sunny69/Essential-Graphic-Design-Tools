import { Sparkle, Sparkles } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel/Carousel";

export default function Home() {
  const carouselItem = [
    { description: "Cool text animations for your projects." },
    { description: "Smooth animations for your projects." },
    { description: "Reusable components for your projects." },
    { description: "Beautiful backgrounds and patterns for your projects." },
    { description: "Common UI components are coming soon!" },
  ];

  return (
    <div className="w-[70%] mx-auto">
      <div className="my-20">
        <h1 className="tracking-tighter text-7xl text-center font-bold">
          Unlock Smarter Design with
          <br />
          <p className="bg-gradient-to-r from-purple-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">
            AI-Powered Tools
          </p>
        </h1>

        <p className="mt-8 mb-14 text-center text-lg">
          Fast-track your creative workflow using intelligent design generators
          <br />
          from design briefs to color palettes and perfect fonts.
        </p>

        <div className="text-center">
          <Link
            href="/features"
            className="bg-black text-white text-lg px-10 py-2 font-semibold tracking-wider rounded-full hover:outline hover:outline-gray-400 hover:outline-1 hover:bg-gray-50 hover:text-gray-900 transition-all"
          >
            Try Now
          </Link>
          <p className="text-xs text-gray-600 italic mt-1">
            No login required. 100% free.
          </p>
        </div>
      </div>

      <div className="my-20 grid grid-cols-2">
        <div className="text-left">
          <p className="text-6xl font-bold">Spark Creativity?</p>
          <p className="mt-8 text-lg"> Try these amazing AI-powered prompts to jumpstart your next design, unlock fresh ideas, and bring your creative vision to life — instantly.</p>
        </div>

        <div className="flex justify-end">
          <Carousel
            baseWidth={400}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
            items={carouselItem}
          />
        </div>
      </div>

      <div className="my-20">
        <p className="text-6xl font-bold text-center">What we Offer ?</p>

        <div className="grid grid-cols-3 gap-2">
          <CardContainer>
            <CardBody className="bg-gray-50 relative group/card border-black/[0.1] rounded-xl p-6 border">
              <CardItem translateZ="50" className="py-5 text-5xl">
                {"\u2728"}
              </CardItem>

              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-900 text-lg font-semibold text-center mt-2"
              >
                AI Design Brief Generator
              </CardItem>

              <CardItem
                translateZ="80"
                as="button"
                className="px-2 py-2 rounded-xl text-sm bg-black text-white text-left mt-4"
              >
                Generate concise and professional design briefs tailored to your
                industry, style, and brand.
              </CardItem>
            </CardBody>
          </CardContainer>

          <CardContainer>
            <CardBody className="bg-gray-50 relative group/card border-black/[0.1] rounded-xl p-6 border">
              <CardItem translateZ="50" className="py-5 text-5xl">
                {"\u2712\uFE0F"}
              </CardItem>

              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-900 text-lg font-semibold text-center mt-2"
              >
                Keyword-Based Font Finder
              </CardItem>

              <CardItem
                translateZ="80"
                as="button"
                className="px-2 py-2 rounded-xl bg-black text-sm text-white text-left mt-4"
              >
                Enter a theme-related keyword like "school", "luxury", or
                "comic", and get 5 free commercial-use fonts.
              </CardItem>
            </CardBody>
          </CardContainer>

          <CardContainer>
            <CardBody className="bg-gray-50 relative group/card border-black/[0.1] rounded-xl p-6 border">
              <CardItem translateZ="50" className="py-5 text-5xl">
                {"\u{1F308}"}
              </CardItem>

              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-900 text-lg font-semibold text-center mt-2"
              >
                Color Palette Extractor
              </CardItem>

              <CardItem
                translateZ="80"
                as="button"
                className="px-2 py-2 rounded-xl bg-black text-sm text-white text-left mt-4"
              >
                Upload an image (e.g., product photo or moodboard) and get 10
                dominant HEX and RGB colors.
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}
