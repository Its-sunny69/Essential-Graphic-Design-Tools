import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import RateLimit from "@/models/RateLimit";
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API });

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const prompt = body.prompt;
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0] || "unknown";

  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  let entry = await RateLimit.findOne({ ip });

  if (!entry) {
    await RateLimit.create({ ip });
  } else {
    if (entry.lastRequest < twentyFourHoursAgo) {
      // Reset count
      entry.count = 1;
      entry.lastRequest = now;
      await entry.save();
    } else if (entry.count >= 5) {
      return new NextResponse(
        JSON.stringify({
          blocked: true,
          message:
            "Due to high usage, you have reached the maximum number of AI design brief requests for today. Please try again tomorrow.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      entry.count += 1;
      entry.lastRequest = now;
      await entry.save();
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
