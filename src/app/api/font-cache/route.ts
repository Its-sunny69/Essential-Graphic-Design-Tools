import { NextResponse } from "next/server";

export async function POST() {
  const API_KEY = process.env.GOOGLE_CLOUD_API;
  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`
    );

    const result = await response.json();
    return NextResponse.json({ result });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
