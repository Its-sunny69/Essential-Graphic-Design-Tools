// app/api/generate-brief/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import RateLimit from "@/models/RateLimit";
import generateContent from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const prompt = body.prompt;
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0] || "unknown";

    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(0, 0, 0, 0);

    const entry = await RateLimit.findOne({ ip });

    if (!entry) {
      await RateLimit.create({ ip, count: 1, lastRequest: now });
    } else if (entry.lastRequest < midnight) {
      entry.count = 1;
      entry.lastRequest = now;
      await entry.save();
    } else if (entry.count >= 5) {
      return NextResponse.json(
        {
          blocked: true,
          message:
            "Due to high usage, you have reached the maximum number of AI design brief requests for today. Please try again after 12:00 Midnight.",
        },
        { status: 429 }
      );
    } else {
      entry.count += 1;
      entry.lastRequest = now;
      await entry.save();
    }

    const result = await generateContent(prompt);
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
