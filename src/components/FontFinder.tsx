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
        const fontFamily = await geminiResponse(basePrompt);

        console.log("fontFamily:", fontFamily);
        if (!fontFamily) {
          toast.error("Internal Server Error");
          return;
        }

        const res = await getFontsFromCache(JSON.parse(fontFamily));

        console.log(res);
        setResponse(res);
      } catch (error) {
        toast.error("Internal Server Error");
      }

      setLoading(false);
    }
  };

  return (
    <>
      <p className="text-4xl font-bold text-center">
        Type a Word, Get Stunning Fonts
      </p>
      <div className="border p-8 my-8 rounded-md shadow-md space-y-4">
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

      {loading ? (
        <div className="p-4 rounded-md my-8">
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
          <div className="p-4 rounded-md my-8">
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
    </>
  );
}

export default FontFinder;
