import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API });

export async function geminiFontResponse(basePrompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: basePrompt,
  });

  return response.text;
}