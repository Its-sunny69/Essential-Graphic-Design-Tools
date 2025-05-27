import FontFinder from "@/components/FontFinder";
import GeneratorForm from "@/components/GeneratorForm";
import ColorExtractor from "@/components/ImageColorPalette";
import MainLayout from "@/components/AdDetection"

export default function Home() {

  return (
    <div className="w-[50%] mx-auto">
      <GeneratorForm />
      <ColorExtractor />
      {/* {<FontFinder />} */}
    </div>
  );
}
