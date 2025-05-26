"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { geminiResponse } from "@/utils/geminiResponse";
import toast from "react-hot-toast";
import { Divide, Loader2 } from "lucide-react";
import { fetchGoogleFont } from "@/utils/fetchGoogleFont";
import { FontPreview } from "./FontPreview";
import { FontDownloadButton } from "./FontDownloadButton";
import { getFontsFromCache } from "@/utils/getFontsFromCache";
import FontCard from "./FontCard";

function FontFinder() {
  const [keyword, setKeyword] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
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
    <div>
      <p className="text-4xl font-bold text-center">
        Keyword-Based Font Finder
      </p>
      <div>
        <Label htmlFor="keyword">
          Enter a keyword (e.g., school, luxury, comic)
        </Label>
        <Input
          id="keyword"
          type="text"
          placeholder="Enter a keyword"
          value={keyword}
          onChange={handleChange}
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
          "Search"
        )}
      </Button>

      {response.length !== 0 && (
        <div>
          <div>
            <span>Font Preview: </span>
            <div>
              <Label htmlFor="keyword">
                Enter text to Preview (e.g., school, luxury, comic)
              </Label>
              <Input
                id="previewText"
                type="text"
                placeholder="Enter a text"
                value={previewText}
                onChange={handlePreviewChange}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            {response.map((font, index) => (
              <FontCard key={index} font={font} previewText={previewText} />
            ))}

            {/* {response.items.map((font, index) => (
                  <FontDownloadButton key={index} url={url} />
                ))} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default FontFinder;
