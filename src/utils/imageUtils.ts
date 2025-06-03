import heic2any from "heic2any";

export const convertHeicToJpg = async (file: File) => {
  try {
    const outputBlob = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.8,
    });

    const convertedBlob = Array.isArray(outputBlob)
      ? outputBlob[0]
      : outputBlob;
    return URL.createObjectURL(convertedBlob);
  } catch (error) {
    console.error("HEIC conversion failed:", error);
    return "";
  }
};

export const getPreviewUrl = async (file: File): Promise<string> => {
  const isHeic =
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif");

  if (isHeic) {
    return await convertHeicToJpg(file);
  } else {
    return URL.createObjectURL(file);
  }
};
