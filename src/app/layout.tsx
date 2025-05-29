import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AdDetection from "@/components/AdDetection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    default: "Essential Graphic Design Tools",
    template: "%s - My Awesome Tools",
  },
  description: "Come and use this awesome tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${roboto.variable} font-roboto h-full flex flex-col`}>
        <AdDetection>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AdDetection>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
