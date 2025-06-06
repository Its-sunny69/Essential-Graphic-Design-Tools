"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel/Carousel";
import { trackEvent } from "@/lib/ga";
import AdBanner from "@/components/Ads/AdBanner";
import { useState, useEffect } from "react";
import AdNativeBanner from "@/components/Ads/AdNativeBanner"
import PromptCard from "@/components/PromptCard";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsMobile(true);
    }
  }, []);

  const carouselItem = [
    {
      description:
        "Design is not just what it looks like and feels like. Design is how it works.",
      author: "Steve Jobs",
    },
    {
      description: "Good design is obvious. Great design is transparent.",
      author: "Joe Sparano",
    },
    {
      description: "Design adds value faster than it adds cost.",
      author: "Joel Spolsky",
    },
    {
      description: "People ignore design that ignores people.",
      author: "Frank Chimero",
    },
    {
      description:
        "Styles come and go. Good design is a language, not a style.",
      author: "Massimo Vignelli",
    },
  ];

  const designPromptData = [
    {
      title: "Design Trend Analysis",
      content:
        "Act as an expert graphic design analyst for the year 2025. Provide a detailed summary of top current and emerging trends, with a focus on branding and UI/UX. Make it suitable for professional designers and include actionable insights.",
      list: [
        "Popular color schemes and their psychological impact",
        "Trending typography styles and font usage",
        "Popular design elements (e.g., minimalism, 3D, abstract shapes)",
        "Use of technology in design (AI tools, AR, motion graphics)",
        "Sustainability and eco-conscious design trends",
        "Impact on brand identity and user experience",
      ],
    },
    {
      title: "Color Palette Suggestions",
      content:
        "Act as a professional color consultant for a floral brand with a calming summer vibe. Suggest a pastel color palette and describe its emotional tone and applications.",
      list: [
        "Hex code for each color",
        "Mood/emotion each color conveys",
        "How the colors complement each other",
        "Use of the palette in logos, packaging, digital media",
      ],
    },
    {
      title: "Client Communication Templates",
      content:
        "Write a friendly, professional email requesting feedback on design revisions. Encourage constructive input and reassure the client about the revision process.",
      list: [
        "Express gratitude for their time and trust",
        "Summarize what has been delivered",
        "Invite specific feedback",
        "Reassure your commitment to quality",
        "Suggest a feedback timeline",
      ],
    },
    {
      title: "Packaging Design Inspiration",
      content:
        "Act as a consultant for eco-friendly skincare packaging. Provide sustainable, luxurious packaging ideas and explain how they appeal to eco-conscious consumers.",
      list: [
        "Premium yet sustainable material suggestions",
        "Texture/finish ideas (matte, embossed, soft-touch)",
        "Color schemes and natural visual elements",
        "Retail usability and shelf appeal",
      ],
    },
    {
      title: "Design Presentation Script",
      content:
        "Write a confident and simple presentation script for a logo design, tailored for non-designer clients.",
      list: [
        "Inspiration behind the logo",
        "Color choices and brand personality",
        "Typography relevance",
        "Business goals and audience alignment",
        "Logo versatility across platforms",
      ],
    },
    {
      title: "Design Software Shortcut Tips",
      content:
        "As an Adobe Illustrator expert, list 10 keyboard shortcuts that improve productivity, with explanations and usage tips.",
      list: [
        "Shortcut key (Windows & Mac)",
        "What the shortcut does",
        "When and how to use it",
        "Time-saving tips",
      ],
    },
    {
      title: "Portfolio Review Checklist",
      content:
        "Create a checklist to review your design portfolio before submitting to clients/employers. Include actionable advice under each item.",
      list: [
        "Work diversity (styles, mediums)",
        "Presentation quality (resolution, layout)",
        "Clarity in descriptions and case studies",
        "Visual consistency and branding",
        "Relevance to job/client",
        "Client results or testimonials",
        "Contact info and call-to-action",
      ],
    },
    {
      title: "Infographic Content Outline",
      content:
        "Draft an outline for an infographic on climate change impacts. Organize the content clearly for a general audience.",
      list: [
        "Intro and key facts",
        "Major causes of climate change",
        "Environmental and social effects (with stats)",
        "Visual ideas (charts, timelines, icons)",
        "Action steps for individuals and communities",
      ],
    },
    {
      title: "Packaging Copywriting Help",
      content:
        "Write a short and attractive product description for a natural tea brand. Emphasize organic ingredients and wellness.",
      list: [
        "Highlight flavor and aroma",
        "Health benefits and natural ingredients",
        "Tone: calm, inviting, authentic",
        "Keep it concise and packaging-friendly",
      ],
    },
    {
      title: "Design Inspiration Sources",
      content:
        "List 5 websites/platforms for high-quality design inspiration. Explain how designers can use them effectively.",
      list: [
        "Type of design featured (e.g., UI/UX, branding)",
        "Unique features/community aspect",
        "Tips on usage",
        "Popular examples available",
        "Free vs premium access info",
      ],
    },
  ];

  const handleAction = (tool: string) => {
    trackEvent("home-to-features", "click", tool);
  };
  
  return (
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
                onClick={() => handleAction("try-now")}
              >
                Try Now
              </Link>
              <p className="text-xs text-gray-600 italic mt-3">
                No login required. 100% free.
              </p>
            </div>
          </div>

          <div className="tool-one flex justify-center items-center">
            {isMobile ? (
              <AdBanner
                id="adtool-two"
                className=" w-fit"
                optionsScript={`
              atOptions = {
                'key' : '8573705c5ce35e173e79954e44b93943',
                'format' : 'iframe',
                'height' : 300,
                'width' : 160,
                'params' : {}
              }`}
                srcScript="//www.highperformanceformat.com/8573705c5ce35e173e79954e44b93943/invoke.js"
              />
            ) : (
              <AdBanner
                id="adtool-one"
                className=" w-fit h-fit"
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
            )}
          </div>

          <div className="sm:my-20 my-14 md:grid grid-cols-2">
            <div className="md:text-left text-justify">
              <h2 className="md:text-6xl text-4xl md:text-left text-center font-bold">
                Design Wisdom
              </h2>
              <p className="md:mt-8 mt-4 text-lg ">
                {" "}
                Discover inspiring quotes on design — handpicked to spark ideas,
                fuel your creativity, and give new perspective to your creative
                journey.
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
                <CardBody className="bg-gray-50 sm:min-h-72 relative group/card border-black/[0.1] rounded-xl md:p-6 p-3 border">
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
                    Design Brief <br className="md:hidden sm:inline hidden" />
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
                <CardBody className="bg-gray-50 sm:min-h-72 relative group/card border-black/[0.1] rounded-xl md:p-6 p-3 border">
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
                <CardBody className="bg-gray-50 sm:min-h-80 md:min-h-72 relative group/card border-black/[0.1] rounded-xl md:p-6 p-3 border">
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
                    Upload an image (e.g., product photo or moodboard) and get
                    10 dominant HEX and RGB colors.
                  </CardItem>
                </CardBody>
              </CardContainer>
            </Link>
          </div>

          <div className="tool-one flex justify-center items-center">
            {isMobile ? (
              <AdBanner
                id="adtool-three"
                className="w-fit"
                optionsScript={`
              atOptions = {
                'key' : '549512edda9a6b03dbade3d2003a14fb',
                'format' : 'iframe',
                'height' : 600,
                'width' : 160,
                'params' : {}
              }`}
                srcScript="//www.highperformanceformat.com/549512edda9a6b03dbade3d2003a14fb/invoke.js"
              />
            ) : (
              <AdBanner
                id="adtool-four"
                className=" w-fit h-fit"
                optionsScript={`
              atOptions = {
                  'key' : 'b51d5be0cb3644c66cd216464cee9d75',
                  'format' : 'iframe',
                  'height' : 50,
                  'width' : 320,
                  'params' : {}
	            }`}
                srcScript="//www.highperformanceformat.com/b51d5be0cb3644c66cd216464cee9d75/invoke.js"
              />
            )}
          </div>
        </section>

        <section className="sm:my-20 my-14">
          <div>
            <h2 className="md:text-6xl text-4xl font-bold text-center">
              Spark Creativity?
            </h2>
            <p className="md:mt-8 mt-4 text-lg text-center">
              {" "}
              Try these amazing AI-powered prompts to jumpstart your next
              design, unlock fresh ideas, and bring your creative vision to life
              — instantly.
            </p>
          </div>

          <div className="sm:grid grid-cols-3 gap-4 pt-8">
            {designPromptData.map((item, index) => (
              <PromptCard key={index} {...item} />
            ))}
          </div>
        </section>
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
  );
}
