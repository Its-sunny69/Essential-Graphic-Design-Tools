// let fontCache: any[] = [];
// let lastFetchTime = 0;
// const TTL = 1000 * 60 * 60 * 24; // 24 hours

// export async function getFontsFromCache(fontFamily: string[]) {
//   const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API;

//   const isCacheValid = fontCache.length && Date.now() - lastFetchTime < TTL;

//   if (!isCacheValid) {
//     const response = await fetch(
//       `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch fonts");
//     }

//     const data = await response.json();

//     fontCache = data.items;
//     lastFetchTime = Date.now();
//   }

//   const selectedFonts = fontCache.filter((font: any) =>
//     fontFamily.includes(font.family)
//   );

//   return selectedFonts;
// }
