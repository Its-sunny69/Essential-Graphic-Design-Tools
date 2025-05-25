import { GeneratorForm } from "@/components/GeneratorForm";
import ColorExtractor from "@/components/ImageColorPalette";

export default function Home() {
  return (
    <div className="w-[50%] mx-auto">
      <GeneratorForm />
      <ColorExtractor />
    </div>
  );
}
