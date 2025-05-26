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
    <div>
      <p>
        <span>Font Name: </span>
        {font.family}
      </p>

      <div>
        <p>Regular</p>
        <FontPreview
          key={font.family}
          fontFamily={font.family}
          fontUrl={font.files.regular}
          text={previewText}
        />

        <p>
          <span>Category: </span>
          {font.category}
        </p>
      </div>

      <p className="text-sm italic text-gray-600">
        <span className="font-semibold">License: </span>
        All fonts are released under open source licenses. You can use them in
        any non-commercial or commercial project.
      </p>
      <Button onClick={() => window.open(fontUrl, "_blank")}>Go To Font</Button>
    </div>
  );
}

export default FontCard;
