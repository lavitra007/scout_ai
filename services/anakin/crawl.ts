/**
 * MCP Service wrapper for crawl
 */
export async function executeCrawl(domain: string, maxDepth: number): Promise<unknown> {
  return [
    {
      title: `Crawled Page 1 from ${domain}`,
      content: `Deep crawl payload (Depth 1 of ${maxDepth}) via Anakin MCP crawl tool.`,
      url: `https://${domain}/page-1`,
      source: domain,
    },
    {
      title: `Crawled Page 2 from ${domain}`,
      content: `Deep crawl payload (Depth 1 of ${maxDepth}) via Anakin MCP crawl tool.`,
      url: `https://${domain}/page-2`,
      source: domain,
    }
  ];
}
