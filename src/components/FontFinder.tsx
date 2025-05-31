"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { Divide, Loader2 } from "lucide-react";
import { FontPreview } from "./FontPreview";
import { getFontsFromCache } from "@/utils/getFontsFromCache";
import FontCard from "./FontCard";
import { Skeleton } from "./ui/skeleton";
// import { geminiFontResponse } from "@/utils/geminiFontResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGeminiAPI } from "@/hooks/useGeminiAPI";
import { string } from "zod";
type FontItem = {
  family: string;
  files: {
    regular: string;
  };
  category: string;
};

function FontFinder() {
  const [keyword, setKeyword] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [response, setResponse] = useState<FontItem[]>([]);
  const [previewText, setPreviewText] = useState<string>("Preview");
  const [fontLoading, setFontLoading] = useState(false);
  const route = process.env.NEXT_PUBLIC_FONT_FINDER_ROUTE!;
  const fontCacheRoute = process.env.NEXT_PUBLIC_FONT_CACHE_ROUTE!;
  const { sendPrompt, loading, apiError, result } = useGeminiAPI(route);
  const [responseLoading, setResponseLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    if (e.target.value.trim() !== "") setError("");
  };

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewText(e.target.value);
  };

  const handleSearch = async () => {
    setFontLoading(true);
    setResponse([]);
    if (keyword?.trim() === "") {
      setError("Please enter a keyword!");
    } else {
      const basePrompt = `You are a font recommendation AI. The user will provide a single array of word. Your task is to understand the meaning and connotation of the following word and recommend only 5 best Google Font family name that best visually represents it. The word is: "${keyword}". Output only the font family name array. Do not include any other text, explanations, or formatting.`;
      try {
        const fontFamily = await sendPrompt(basePrompt);
        if (!fontFamily) {
          toast.error("Internal Server Error");
          return;
        }

        const res = await getFontsFromCache(
          JSON.parse(fontFamily),
          fontCacheRoute
        );
        setResponse(res);

        setResponseLoading(false);
      } catch (error) {
        toast.error((error as Error).message || "Internal Server Error");
      } finally {
        setFontLoading(false);
      }
    }
  };

  return (
    <div className="animate-fade-up">
      <p className="sm:text-4xl text-2xl font-bold text-center">
        Type a Word, <br className="sm:hidden inline" /> Get Stunning Fonts
      </p>
      <div className="sm:w-[85%] mx-auto border p-8 my-8 rounded-xl shadow-md space-y-4">
        <div>
          <Label htmlFor="keyword">
            Tell us your theme. One word is all it takes!
          </Label>
          <Input
            id="keyword"
            type="text"
            placeholder="(e.g., school, luxury, comic)"
            value={keyword}
            onChange={handleChange}
            className="mt-4"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <Button onClick={handleSearch} disabled={fontLoading}>
          {fontLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Searching
            </>
          ) : (
            "Go Font Hunting 🚀"
          )}
        </Button>
      </div>

      <div key={fontLoading ? "loading" : "loaded"} className="animate-fade">
        {fontLoading ? (
          <div className="p-4 my-8">
            <p className="sm:text-3xl text-2xl font-bold">Searching for Font...🔍</p>

            <div className="sm:w-[50%] my-8">
              <Skeleton className="h-5 rounded-xl" />
              <Skeleton className="h-9 mt-4 rounded-xl" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <Skeleton className="h-56 rounded-xl" />
              <Skeleton className="h-56 rounded-xl" />
            </div>
          </div>
        ) : (
          response?.length !== 0 && (
            <div className="p-4 rounded-md my-8">
              <p className="text-3xl font-bold">Here Are Your Font Matches!</p>

            <div className="sm:w-[50%] my-8">
              <Label htmlFor="keyword">
                Want a Sneak Peek? Enter Your Text Below
              </Label>
              <Input
                id="previewText"
                type="text"
                placeholder="Enter a your text..."
                value={previewText}
                onChange={handlePreviewChange}
                className="mt-4"
                maxLength={50}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {response.map((font, index) => (
                <FontCard key={index} font={font} previewText={previewText} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-16 mb-8">
        <p className="sm:text-3xl text-2xl font-bold mb-6">How Font Finder works ?</p>

        <ul className="pl-4 list-decimal">
          <li className="my-2">
            Enter a keyword like "modern", "comic", "tech", or "elegant".
          </li>
          <li className="my-2">
            Our AI analyzes the mood, tone, and context of your keyword.
          </li>
          <li className="my-2">
            It recommends the top 5 matching Google Fonts that reflect the
            style.
          </li>
          <li className="my-2">
            All fonts are free to use (commercial-safe) and sourced directly
            from Google Fonts.
          </li>
          <li className="my-2">
            Preview fonts in real-time by typing your own sample text.
          </li>
          <li className="my-2">
            Each font comes with a direct Google Font link for download and more
            details.
          </li>
        </ul>

        <p className="my-2 border-l-4 pl-2 py-1 bg-gray-50 rounded-lg">
          <span className="font-semibold">Great for: </span>Designers looking to
          match fonts to brand personality or mood quickly.
        </p>
      </div>

      <div className="my-8">
        <header>
          <h1 className="sm:text-3xl text-2xl font-bold leading-tight tracking-tight">
            The Best Free AI Font Finder to Instantly Discover Your Perfect
            Typeface
          </h1>
          <p className="mt-2 ">
            Discover high-quality, AI-curated Google Fonts based on your
            keyword. Whether you’re working on a logo, website, app, or ad
            banner — our AI Font Finder suggests the best typography for your
            brand in seconds.
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            Why Font Choice Matters in Design
          </h2>
          <p className="mt-2 ">
            Fonts are more than just letters — they’re visual tone-setters.
            Choosing the right font influences how your brand or message is
            perceived. The wrong typeface can undermine your message, while the
            right one enhances professionalism, emotion, and readability.
          </p>
          <p className="mt-2 ">
            Whether you're designing a website, logo, poster, or app interface,
            font selection should be purposeful. Our{" "}
            <strong>AI Font Finder</strong> simplifies this process by analyzing
            your input and recommending top-matching Google Fonts tailored to
            your needs.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            What Is the AI Font Finder?
          </h2>
          <p className="mt-2 ">
            The <strong>AI Font Finder</strong> is an intelligent tool that
            analyzes your keyword — such as “luxury,” “comic,” or “school” — and
            recommends five Google Fonts that best capture the style and emotion
            of that word. Each font suggestion includes a preview with
            customizable text, helping you visualize it instantly.
          </p>
          <p className="mt-2 ">
            Powered by a large language model and real-time Google Fonts data,
            it eliminates the need to scroll endlessly through font libraries.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
          <ol className="list-decimal list-inside mt-2  space-y-1">
            <li>
              Enter a descriptive keyword like “professional,” “friendly,” or
              “vintage.”
            </li>
            <li>Click “Find Font.”</li>
            <li>
              The tool fetches and displays the top 5 matching Google Fonts.
            </li>
            <li>Type your own text to see real-time previews in each font.</li>
            <li>
              Copy the font name or visit the Google Fonts page directly for
              implementation.
            </li>
          </ol>
          <p className="mt-2 ">
            You can repeat the process with different keywords to explore more
            aesthetic directions.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            Why Use This AI-Powered Tool?
          </h2>
          <ul className="list-disc pl-6  space-y-2">
            <li>
              <strong>Save Time</strong> – No more guessing or manually
              scrolling through fonts.
            </li>
            <li>
              <strong>Precision</strong> – Each font recommendation is based on
              the context of your keyword.
            </li>
            <li>
              <strong>Real-Time Preview</strong> – Type your own content to see
              exactly how it looks.
            </li>
            <li>
              <strong>Google Fonts Only</strong> – All fonts are free, web-safe,
              and easy to use.
            </li>
          </ul>
          <p className="mt-2 ">
            The AI Font Finder empowers everyone — from professional designers
            to students — to select fonts more confidently.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Sample Use Cases</h2>
          <ul className="list-disc pl-6  space-y-2">
            <li>
              <strong>Logo for a Bakery</strong>: “Vintage” → Pacifico, Lobster
              Two, Grand Hotel
            </li>
            <li>
              <strong>Website for a SaaS Tool</strong>: “Tech” → Roboto, Inter,
              Space Grotesk
            </li>
            <li>
              <strong>Comic Book Cover</strong>: “Comic” → Bangers, Luckiest
              Guy, Bubblegum Sans
            </li>
          </ul>
          <p className="mt-2 ">
            The ability to visually compare fonts against your brand’s message
            or audience improves design quality and saves revision time.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            SEO Benefits of Font Optimization
          </h2>
          <p className="mt-2 ">
            While visual, fonts also affect accessibility, performance, and
            engagement. Using optimized Google Fonts can:
          </p>
          <ul className="list-disc pl-6  space-y-2">
            <li>Improve page loading speed</li>
            <li>Enhance user readability across devices</li>
            <li>Support multi-language display with proper subsets</li>
            <li>Increase brand trust with cohesive visual tone</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Final Thoughts</h2>
          <p className="mt-2 ">
            Fonts matter. They influence perception, behavior, and brand memory.
            With the AI Font Finder, you gain a creative partner that makes font
            selection fast, smart, and visual. Stop wasting time toggling
            between font libraries — start generating meaningful typography
            today.
          </p>
          <p className="mt-2 ">
            Try it now and discover the power of keyword-driven font discovery —
            completely free.
          </p>
        </section>
      </div>

      <div className="my-8">
        <p className="sm:text-3xl text-2xl font-bold mb-6">FAQs</p>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What kind of keywords should I use?
            </AccordionTrigger>
            <AccordionContent>
              Use descriptive words that match the brand’s tone or theme — like
              “luxury,” “eco,” “tech,” or “fun.” The more expressive the
              keyword, the better the match.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Are the font suggestions free for commercial use?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Only fonts from Google Fonts with open licenses are
              recommended, making them safe for commercial and personal
              projects.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How many fonts will it show?</AccordionTrigger>
            <AccordionContent>
              You’ll get a curated list of 5 fonts that visually align with your
              keyword.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I preview fonts before downloading?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you can enter your own sample text and see live previews in
              each font.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Where do the fonts come from?</AccordionTrigger>
            <AccordionContent>
              All fonts are sourced from the Google Fonts API and updated
              regularly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default FontFinder;
