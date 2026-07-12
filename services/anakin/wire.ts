/**
 * Live Anakin API wrapper for wire_discover
 */
export async function executeWireDiscover(url: string, targetSchema: Record<string, unknown>): Promise<unknown> {
  const apiKey = process.env.ANAKIN_API_KEY;
  if (!apiKey) throw new Error("ANAKIN_API_KEY is missing");

  const response = await fetch("https://api.anakin.io/v1/wire/execute-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      url: url,
      schema: targetSchema
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anakin Wire API failed: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return result.data || result;
}
