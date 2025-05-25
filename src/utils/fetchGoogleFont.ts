export async function fetchGoogleFont(params: string) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API;

  const response = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}${params}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch fonts");
  }

  const data = await response.json();

  return data;
}
