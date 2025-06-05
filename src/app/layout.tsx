import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AdDetection from "@/components/AdDetection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Briefox",
    template: "%s | Briefox",
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
      <head>
        <Script
          async
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-E23ZK9BX78"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-E23ZK9BX78');
            `,
          }}
        />
      </head>
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
