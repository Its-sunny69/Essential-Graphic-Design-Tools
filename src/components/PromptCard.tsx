"use client";

import { useState } from "react";
import { ModalBox } from "./ModalBox";

export default function PromptCard({
  title,
  content,
  list,
}: {
  title: string;
  content: string;
  list?: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  function limitWords(text: string, wordLimit: number): string {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ...";
  }

  return (
    <div className="bg-gray-50 border shadow-md p-4 my-4 sm:my-0 rounded-xl">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-800">
        {limitWords(content, 20)}{" "}
        <button
          className="text-gray-600 underline underline-offset-2 hover:text-black active:scale-95 transition-all"
          onClick={() => setIsOpen(true)}
        >
          See more
        </button>
      </p>

      <ModalBox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        content={content}
        list={list}
      />
    </div>
  );
}
