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

 const designPrompts = [
  {
    title: "Design Trend Analysis",
    content:
      "I want you to act as an expert graphic design analyst for the year 2025. Please provide a comprehensive and detailed summary of the top current and emerging graphic design trends, with a special focus on branding and UI/UX design. Cover aspects such as:",
    list: [
      "Popular color schemes and their psychological impact",
      "Trending typography styles and font usage",
      "Design elements and motifs gaining popularity (e.g., minimalism, 3D, abstract shapes)",
      "Use of technology in design, such as AI tools, augmented reality, or motion graphics",
      "Sustainability and eco-conscious design trends",
      "How these trends influence brand identity and user experience. Make the explanation suitable for professional designers looking to stay ahead in their projects, including actionable insights they can apply. Please organize your response in clear sections or bullet points."
    ],
  },
  {
    title: "Color Palette Suggestions",
    content:
      "Act as a professional color consultant for branding. I am creating a floral brand that needs a natural, soothing, and calming visual identity. Please suggest a detailed color palette consisting of 5-7 colors, primarily pastel shades, which evoke freshness and a summer vibe. For each color, provide:",
    list: [
      "The hex code",
      "A brief description of the mood or emotion it conveys",
      "How it complements the other colors in the palette. Also, explain how this palette can be effectively used across different branding materials such as logos, packaging, and digital media to create a cohesive and appealing look."
    ],
  },
  {
    title: "Client Communication Templates",
    content:
      "You are a professional graphic designer communicating with a client. Please draft a polite, clear, and professional email template requesting detailed feedback for design revisions. The tone should be friendly and approachable, encouraging the client to provide constructive criticism and preferences without hesitation. The email should:",
    list: [
      "Express gratitude for the client’s time and trust",
      "Summarize what has been delivered so far",
      "Invite specific feedback and mention that revisions are part of the process",
      "Reassure the client of your commitment to delivering the best outcome",
      "Politely suggest a timeline for the feedback. Make sure the language is formal but warm, suitable for business communication."
    ],
  },
  {
    title: "Packaging Design Inspiration",
    content:
      "Please act as a creative packaging design consultant specialized in sustainable products. I am developing packaging ideas for an organic skincare product line. Provide a detailed list of innovative and eco-friendly packaging design concepts that:",
    list: [
      "Emphasize premium quality while maintaining sustainability",
      "Include suggestions for materials (e.g., recycled paper, biodegradable plastics, glass)",
      "Describe suitable textures and finishes (e.g., matte, embossed, soft-touch)",
      "Recommend color schemes and visual elements that communicate natural ingredients and environmental responsibility",
      "Consider usability and shelf appeal for retail environments. Include examples or references where possible, and explain why each concept is effective in attracting environmentally conscious customers while maintaining luxury appeal."
    ],
  },
  {
    title: "Design Presentation Script",
    content:
      "You are preparing to present a logo design to a client. Write a confident, professional, and engaging presentation script that explains:",
    list: [
      "The inspiration behind the logo design",
      "The choice of colors and how they reflect the brand’s personality",
      "The typography selection and its relevance to the brand identity",
      "How the logo design aligns with the client’s business goals and target audience",
      "The versatility and scalability of the logo across different media. Make the script concise yet persuasive, using language that a non-designer client can easily understand, while showcasing your expertise."
    ],
  },
  {
    title: "Design Software Shortcut Tips",
    content:
      "Act as an Adobe Illustrator expert and provide a detailed list of the top 10 keyboard shortcuts that significantly enhance productivity for graphic designers. For each shortcut, include:",
    list: [
      "The exact key combination for both Windows and Mac (if applicable)",
      "A clear explanation of what the shortcut does",
      "Practical examples of how and when to use it during common design tasks",
      "Tips on how mastering this shortcut can save time or improve workflow. Present the list in a clear, easy-to-read format for intermediate to advanced users."
    ],
  },
  {
    title: "Portfolio Review Checklist",
    content:
      "Create a thorough and detailed checklist for graphic designers to review their portfolio before submitting it to potential clients or employers. Include categories such as:",
    list: [
      "Diversity and range of work (different styles, mediums, and projects)",
      "Presentation quality (image resolution, layout, consistency)",
      "Clarity and professionalism of project descriptions and case studies",
      "Visual consistency across the portfolio reflecting personal brand",
      "Relevance and tailoring to the specific job or client target",
      "Inclusion of measurable results or client testimonials (if available)",
      "Contact information and call to action. Provide actionable advice for each checklist item and explain why it is important."
    ],
  },
  {
    title: "Infographic Content Outline",
    content:
      "I want you to act as a content strategist for infographics. Please draft a detailed content outline for an infographic about the impacts of climate change. Organize the content into clear sections such as:",
    list: [
      "Introduction and key facts about climate change",
      "Major causes of climate change with brief explanations",
      "Environmental and societal effects illustrated with relevant statistics",
      "Visual representation ideas (charts, icons, timelines) for each section",
      "Suggested actionable steps for individuals and communities to mitigate climate change. Make sure the outline balances informative content with visual appeal and simplicity to ensure the infographic communicates effectively to a general audience."
    ],
  },
  {
    title: "Packaging Copywriting Help",
    content:
      "You are a copywriter specialized in natural products. Write a concise, attractive, and compelling product description for the packaging of a natural tea brand. The description should:",
    list: [
      "Highlight the unique flavors and aroma of the tea",
      "Emphasize the health benefits and organic, all-natural ingredients",
      "Convey a sense of calm, wellness, and authenticity",
      "Be engaging and easy to read, appealing to health-conscious and environmentally aware consumers",
      "Fit within a short space suitable for product packaging. Please write in a warm, inviting tone that resonates with the target audience."
    ],
  },
  {
    title: "Design Inspiration Sources",
    content:
      "Please act as a design mentor and list the top 5 websites or platforms where graphic designers can find high-quality design inspiration. For each platform, include:",
    list: [
      "The primary focus or types of design showcased (e.g., branding, UI/UX, illustration, print)",
      "Unique features or community aspects that make it valuable",
      "How designers can best use the platform to stay updated and inspired",
      "Examples of popular or noteworthy content available",
      "Any free or premium access details relevant to new users. Format the response as a detailed guide suitable for designers at various levels seeking reliable inspiration resources."
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
            {designPrompts.map((item, index) => (
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
