import { NextRequest, NextResponse } from "next/server";
import RateLimit from "./models/RateLimit"; // Adjust the path
import { headers } from "next/headers";
import { connectDB } from "./lib/db";
export async function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname !== "/api/generate-brief") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/generate-brief"], // Apply only to this API route
};
