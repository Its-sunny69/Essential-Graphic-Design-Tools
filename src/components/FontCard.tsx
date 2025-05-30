"use client";

import React from "react";
import { FontPreview } from "./FontPreview";
import { Button } from "./ui/button";

type FontItem = {
  family: string;
  files: {
    regular: string;
  };
  category: string;
};

type FontCardProps = {
  font: FontItem;
  previewText: string;
};

function FontCard({ font, previewText }: FontCardProps) {
  const fontUrl = `https://fonts.google.com/specimen/${font.family.replace(
    / /g,
    "+"
  )}`;

  return (
    <div className="border rounded-xl p-4 flex flex-col justify-between">
      <div>
        <p className="text-xl font-bold">{font.family}</p>

        <div className="my-3 border-l-4 rounded-sm pl-2">
          <p>Preview:</p>
          <FontPreview
            key={font.family}
            fontFamily={font.family}
            fontUrl={font.files.regular}
            text={previewText}
          />
        </div>
      </div>

      <div>
        <p>
          <span className="font-semibold">Category: </span>
          {font.category}
        </p>

        <p className="text-sm italic text-gray-600 my-1">
          <span className="font-semibold">License: </span>
          SIL Open Font License
        </p>

        <Button
          className="mt-2 w-full"
          onClick={() => window.open(fontUrl, "_blank")}
        >
          Go to Google Font
        </Button>
      </div>
    </div>
  );
}

export default FontCard;
