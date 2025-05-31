import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Black Friday Deals 2024 - macOS apps",
  description: "A directory of macOS apps that are free or 50% off for a limited time.",
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}