/**
 * Live Anakin API wrapper for scrape
 */
export async function executeScrape(url: string): Promise<unknown> {
  const apiKey = process.env.ANAKIN_API_KEY;
  if (!apiKey) throw new Error("ANAKIN_API_KEY is missing");

  const response = await fetch("https://api.anakin.io/v1/url-scraper/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      url: url,
      render_js: true
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anakin Scrape API failed: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return result.data || result;
}
