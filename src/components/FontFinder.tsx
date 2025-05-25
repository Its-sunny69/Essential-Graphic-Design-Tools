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

type FontItem = {
  family: string;
  files: {
    regular: string;
    italic?: string;
  };
  category: string;
};

type FontResponse = {
  items: FontItem[];
};

function FontFinder() {
  const [keyword, setKeyword] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<FontResponse | undefined>();
  const [previewText, setPreviewText] = useState<string | undefined>("Preview");

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

      const basePrompt = `You are a font recommendation AI. The user will provide a single word. Your task is to understand the meaning and connotation of the following word and recommend one and only Google Font family name that best visually represents it. The word is: "${keyword}". Output only the font family name. Do not include any other text, explanations, or formatting.`;

      try {
        const fontFamily = await geminiResponse(basePrompt);

        console.log("fontFamily:", fontFamily);
        if (!fontFamily) {
          toast.error("Internal Server Error");
          return;
        }

        const params = `&family=${fontFamily?.replace(/ /g, "+")}`;

        const res = await fetchGoogleFont(params);
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

      <div>
        {response && (
          <div>
            <p>
              <span>Font Name: </span>
              {response.items[0].family}
            </p>
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
              {Object.entries(response.items[0].files)
                .filter(
                  ([variant]) => variant === "regular" || variant === "italic"
                )
                .map(([variant, url]) => (
                  <div>
                    <p>{variant}</p>
                    <FontPreview
                      key={variant}
                      fontFamily={response.items[0].family}
                      fontUrl={url}
                      text={previewText}
                    />
                  </div>
                ))}
            </div>
            <p>
              <span>Category: </span>
              {response.items[0].category}
            </p>

            {Object.entries(response.items[0].files)
              .filter(
                ([variant]) => variant === "regular" || variant === "italic"
              )
              .map(([variant, url]) => (
                <FontDownloadButton key={variant} label={variant} url={url} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FontFinder;
