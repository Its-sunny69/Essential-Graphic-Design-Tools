import { useState } from "react";

export function useGeminiAPI(apiRoute: string) {
  const [loading, setLoading] = useState(false);
  const [apiError, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  async function sendPrompt(prompt: string): Promise<string | null> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(apiRoute, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data?.message || "Failed to generate response";
        throw new Error(message);
      }

      setResult(data.result);
      return data.result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong!";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    sendPrompt,
    loading,
    apiError,
    result,
  };
}
