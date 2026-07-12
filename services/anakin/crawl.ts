/**
 * Live Anakin API wrapper for crawl
 */
export async function executeCrawl(domain: string, maxDepth: number): Promise<unknown> {
  const apiKey = process.env.ANAKIN_API_KEY;
  if (!apiKey) throw new Error("ANAKIN_API_KEY is missing");

  const response = await fetch("https://api.anakin.io/v1/crawl/submit-crawl-job", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      url: `https://${domain}`,
      max_depth: maxDepth
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anakin Crawl API failed: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return result.data || result;
}
