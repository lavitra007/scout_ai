import { RawEvent } from "./types";

export class SignalFilter {
  /**
   * Discards low-confidence or duplicate signals from the raw events.
   */
  public filter(events: RawEvent[]): RawEvent[] {
    const MIN_IMPORTANCE_THRESHOLD = 0.5;
    
    // 1. Remove low importance events
    let filtered = events.filter(e => e.inferredImportance >= MIN_IMPORTANCE_THRESHOLD);

    // 2. Remove redundant signals spanning the same entities and category
    filtered = this.deduplicateSignals(filtered);

    return filtered;
  }

  private deduplicateSignals(events: RawEvent[]): RawEvent[] {
    const unique = new Map<string, RawEvent>();

    for (const event of events) {
      // Create a signature based on the entities involved and the category
      const entityIds = event.involvedEntities.map(e => e.id).sort().join("|");
      const signature = `${entityIds}::${event.inferredCategory}`;

      if (unique.has(signature)) {
        const existing = unique.get(signature)!;
        // Keep the one with the higher importance
        if (event.inferredImportance > existing.inferredImportance) {
          // Merge supporting items
          event.supportingItems = Array.from(new Set([...event.supportingItems, ...existing.supportingItems]));
          unique.set(signature, event);
        } else {
          existing.supportingItems = Array.from(new Set([...existing.supportingItems, ...event.supportingItems]));
        }
      } else {
        unique.set(signature, event);
      }
    }

    return Array.from(unique.values());
  }
}
