type FontItem = {
  family: string;
  files: {
    regular: string;
  };
  category: string;
};

let fontCache: any[] = [];
let lastFetchTime = 0;
const TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function getFontsFromCache(
  fontFamily: string[],
  apiRoute: string
): Promise<FontItem[]> {
  const isCacheValid = fontCache.length && Date.now() - lastFetchTime < TTL;
  if (!isCacheValid) {
    const response = await fetch(apiRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch fonts");
    }

    const data = await response.json();

    fontCache = data.result.items;
    lastFetchTime = Date.now();
  }

  const selectedFonts = fontCache.filter((font: any) =>
    fontFamily.includes(font.family)
  );

  return selectedFonts;
}
