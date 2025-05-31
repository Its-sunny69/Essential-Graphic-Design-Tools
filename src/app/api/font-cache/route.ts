import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const API_KEY = process.env.GOOGLE_CLOUD_API;
  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`
    );

    const result = await response.json();
    // console.log(result);
    return NextResponse.json({ result });
  } catch (error) {
    return error instanceof Error ? error.message : "Something went wrong!";
  }
}
