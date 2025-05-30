import generateContent from "@/lib/gemini";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const prompt = body.prompt;
  const result = await generateContent(prompt);
  return NextResponse.json({ result });
}
