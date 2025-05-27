let fontCache: any[] = [];
let lastFetchTime = 0;
const TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function getFontsFromCache(fontFamily: string[]) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API;

  if (fontCache.length && Date.now() - lastFetchTime < TTL) {
    return fontCache;
  }

  const response = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch fonts");
  }

  const data = await response.json();

  console.log(data);

  const selectedFonts = data.items.filter((font: any) =>
    fontFamily.includes(font.family)
  );

  lastFetchTime = Date.now();

  return selectedFonts;
}
