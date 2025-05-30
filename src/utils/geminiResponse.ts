export async function geminiResponse(prompt: string): Promise<string> {
  try {
    const res = await fetch("/api/generate-brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    console.log("geminiFunc:", res)

    if (!res.ok) {
      const data = await res.json();
      const message = data?.message || "Failed to generate response";

      if (res.status === 429) {
        throw new Error(message);
      }

      throw new Error(message);
    }

    const data = await res.json();
    return data.result;
  } catch (error) {
    console.log(error)
    throw new Error((error as Error).message || "Someting went wrong!");
  }
}
