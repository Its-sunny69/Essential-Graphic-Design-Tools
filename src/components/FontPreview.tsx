import { useEffect } from "react";

interface FontPreviewProps {
  fontFamily: string;
  fontUrl: string;
  text: string | undefined;
}

export function FontPreview({ fontFamily, fontUrl, text }: FontPreviewProps) {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @font-face {
        font-family: '${fontFamily}';
        src: url('${fontUrl}');
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [fontFamily, fontUrl]);

  return (
    <div className="text-3xl min-h-9 break-words" style={{ fontFamily }}>
      {text}
    </div>
  );
}
