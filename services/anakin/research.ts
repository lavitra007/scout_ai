/**
 * Live Anakin API wrapper for agentic_search
 */
export async function executeAgenticSearch(query: string): Promise<unknown> {
  const apiKey = process.env.ANAKIN_API_KEY;
  if (!apiKey) throw new Error("ANAKIN_API_KEY is missing");

  const response = await fetch("https://api.anakin.io/v1/agentic-search/submit-search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      query: query
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anakin Research API failed: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return result.data || result;
}
