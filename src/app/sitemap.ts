import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: `${process.env.NEXT_PUBLIC_URL}` },
    { url: `${process.env.NEXT_PUBLIC_URL}/features` },
    { url: `${process.env.NEXT_PUBLIC_URL}/about` },
    { url: `${process.env.NEXT_PUBLIC_URL}/privacy-policy` },
  ];
}
