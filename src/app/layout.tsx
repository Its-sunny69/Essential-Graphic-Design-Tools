import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

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
    <html lang="en">
      <body className={inter.className}>
        {/* <AdDetection> */}
        <main>{children}</main>
        {/* </AdDetection> */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
