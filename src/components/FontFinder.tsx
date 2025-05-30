"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { geminiResponse } from "@/utils/geminiResponse";
import toast from "react-hot-toast";
import { Divide, Loader2 } from "lucide-react";
import { FontPreview } from "./FontPreview";
import { getFontsFromCache } from "@/utils/getFontsFromCache";
import FontCard from "./FontCard";
import { Skeleton } from "./ui/skeleton";
import { geminiFontResponse } from "@/utils/geminiFontResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<FontItem[]>([]);
  const [previewText, setPreviewText] = useState<string>("Preview");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);

      if (e.target.value.trim() !== "") setError("");
    };
    if (e.target.value.trim() !== "") setError("");
  };

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewText(e.target.value);
  };

  const handleSearch = async () => {
    if (keyword?.trim() === "") {
      setError("Please enter a keyword!");
    } else {
      setLoading(true);

      const basePrompt = `You are a font recommendation AI. The user will provide a single array of word. Your task is to understand the meaning and connotation of the following word and recommend only 5 best Google Font family name that best visually represents it. The word is: "${keyword}". Output only the font family name array. Do not include any other text, explanations, or formatting.`;

      try {
        const fontFamily = await geminiFontResponse(basePrompt);

        console.log("fontFamily:", fontFamily);
        if (!fontFamily) {
          toast.error("Internal Server Error");
          return;
        }
        console.log("fontFamily:", fontFamily);
        if (!fontFamily) {
          toast.error("Internal Server Error");
          return;
        }

        const res = await getFontsFromCache(JSON.parse(fontFamily));

        console.log(res);
        setResponse(res);
      } catch (error) {
        toast.error((error as Error).message || "Internal Server Error");
      }

      setLoading(false);
    }
  };

  console.log(response);
  return (
    <div className="animate-fade-up">
      <p className="text-4xl font-bold text-center">
        Type a Word, Get Stunning Fonts
      </p>
      <div className="border p-8 my-8 rounded-xl shadow-md space-y-4">
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

        <Button onClick={handleSearch} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Searching
            </>
          ) : (
            "Go Font Hunting 🚀"
          )}
        </Button>
      </div>

      <div key={loading ? "loading" : "loaded"} className="animate-fade">
        {loading ? (
          <div className="p-4 my-8">
            <p className="text-3xl font-bold">Searching for Font...🔍</p>

            <div className="my-8">
              <Skeleton className="h-5" />
              <Skeleton className="h-9 mt-4" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Skeleton className="h-56" />
              <Skeleton className="h-56" />
            </div>
          </div>
        ) : (
          response.length !== 0 && (
            <div className="p-4 my-8">
              <p className="text-3xl font-bold">Here Are Your Font Matches!</p>

              <div className="my-8">
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

              <div className="grid grid-cols-2 gap-4">
                {response.map((font, index) => (
                  <FontCard key={index} font={font} previewText={previewText} />
                ))}
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-16 mb-8">
        <p className="text-4xl font-bold mb-6">How Font Finder works ?</p>

        <ul className="pl-4 list-decimal text-lg">
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

        <p className="my-2 text-lg border-l-4 pl-2 py-1 bg-gray-50 rounded-lg">
          <span className="font-semibold">Great for: </span>Designers looking to
          match fonts to brand personality or mood quickly.
        </p>
      </div>

      <div className="my-8">
        <p className="text-4xl font-bold mb-6">FAQs</p>

        <Accordion type="single" className="pl-4" collapsible>
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
