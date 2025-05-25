import React from "react";
import { Button } from "./ui/button";

interface FontDownloadProps {
  url: string;
  label: string;
}

export function FontDownloadButton({ url, label }: FontDownloadProps) {
  return (
    <a
      href={url}
      download
      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button>Download {label}</Button>
    </a>
  );
}
