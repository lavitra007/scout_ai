import { KnowledgeGraph } from "@/types/knowledge-graph";
import { Signal } from "@/types/signal";
import { SignalDetector } from "./signal-detector";
import { SignalClassifier } from "./signal-classifier";
import { SignalFilter } from "./signal-filter";
import { SignalBuilder } from "./signal-builder";

/**
 * The Scout Signal Engine Entry Point.
 * 
 * Pipeline:
 * KnowledgeGraph -> SignalDetector -> SignalClassifier -> SignalFilter -> SignalBuilder -> Signal[]
 */
export class SignalEngine {
  private detector: SignalDetector;
  private classifier: SignalClassifier;
  private filter: SignalFilter;
  private builder: SignalBuilder;

  constructor() {
    this.detector = new SignalDetector();
    this.classifier = new SignalClassifier();
    this.filter = new SignalFilter();
    this.builder = new SignalBuilder();
  }

  /**
   * Transforms a structured Knowledge Graph into actionable Signal events.
   */
  public buildSignals(graph: KnowledgeGraph): Signal[] {
    // 1. Detection: Extract raw event nodes and edges from the graph
    const rawEvents = this.detector.detect(graph);

    // 2. Classification: Assign a strict category to each event
    this.classifier.classify(rawEvents);

    // 3. Filtering: Strip out noise, low-confidence, and duplicate events
    const filteredEvents = this.filter.filter(rawEvents);

    // 4. Builder: Construct the final strongly typed Signal array
    const signals = this.builder.build(filteredEvents);

    // Sort by importance descending so the most critical signals are first
    return signals.sort((a, b) => b.importance - a.importance);
  }
}
