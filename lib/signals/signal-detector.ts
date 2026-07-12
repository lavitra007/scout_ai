import { KnowledgeGraph } from "@/types/knowledge-graph";
import { RawEvent } from "./types";
import { KnowledgeItem } from "@/types/knowledge";

export class SignalDetector {
  /**
   * Inspects entities and relationships within the KnowledgeGraph 
   * to detect highly connected nodes or significant relationship edges.
   */
  public detect(graph: KnowledgeGraph): RawEvent[] {
    const rawEvents: RawEvent[] = [];
    const eventIds = new Set<string>(); // to prevent duplicates

    // 1. Edge-Based Detection (Strong signals from specific relationship verbs)
    for (const edge of graph.edges) {
      // Find supporting knowledge items
      const supportingItems = graph.events.filter(e => edge.evidence.includes(e.id));
      const sourceEntity = graph.nodes.find(n => n.id === edge.sourceEntityId);
      const targetEntity = graph.nodes.find(n => n.id === edge.targetEntityId);

      if (sourceEntity && targetEntity && supportingItems.length > 0) {
        // High confidence relationships are strong candidates for signals
        if (edge.confidence > 0.6) {
          const rawId = `raw_edge_${edge.id}`;
          if (!eventIds.has(rawId)) {
            rawEvents.push({
              id: rawId,
              primaryEdge: edge,
              involvedEntities: [sourceEntity, targetEntity],
              supportingItems,
              detectedAt: edge.discoveredAt,
              inferredImportance: edge.confidence,
            });
            eventIds.add(rawId);
          }
        }
      }
    }

    // 2. Node-Based Detection (Standalone highly connected entities without strong edges)
    // E.g., A regulation or company blowing up in the news suddenly
    for (const node of graph.nodes) {
      // Find all items referencing this node
      const supportingItems = graph.events.filter(e => 
        e.entities.includes(node.name) || 
        `${e.title} ${e.summary}`.toLowerCase().includes(node.name.toLowerCase())
      );

      if (supportingItems.length >= 2 && node.confidence > 0.8) {
        const rawId = `raw_node_${node.id}`;
        if (!eventIds.has(rawId)) {
          // Calculate average freshness to ensure it's a recent burst
          rawEvents.push({
            id: rawId,
            involvedEntities: [node],
            supportingItems,
            detectedAt: new Date().toISOString(),
            inferredImportance: Math.min(0.99, supportingItems.length * 0.1 + node.confidence * 0.5),
          });
          eventIds.add(rawId);
        }
      }
    }

    return rawEvents;
  }
}
