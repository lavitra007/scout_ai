/**
 * Live Anakin API wrapper for search
 */
export async function executeSearch(query: string): Promise<unknown> {
  const apiKey = process.env.ANAKIN_API_KEY;
  if (!apiKey) throw new Error("ANAKIN_API_KEY is missing");

  const response = await fetch("https://api.anakin.io/v1/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      prompt: query,
      limit: 5
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anakin Search API failed: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  // Ensure we return an array for the normalizer
  return result.results || result.data || result;
}
