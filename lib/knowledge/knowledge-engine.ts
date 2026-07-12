import { KnowledgeItem } from "@/types/knowledge";
import { KnowledgeGraph } from "@/types/knowledge-graph";
import { EntityExtractor } from "./entity-extractor";
import { RelationshipBuilder } from "./relationship-builder";
import { Categorizer } from "./categorizer";
import { Deduplicator } from "./deduplicator";
import { ConfidenceEngine } from "./confidence-engine";
import { GraphBuilder } from "./graph-builder";

/**
 * The Scout Knowledge Engine Entry Point.
 * 
 * Pipeline:
 * KnowledgeItem[] -> Deduplicator -> Categorizer -> EntityExtractor -> RelationshipBuilder -> ConfidenceEngine -> KnowledgeGraph
 */
export class KnowledgeEngine {
  private deduplicator: Deduplicator;
  private categorizer: Categorizer;
  private entityExtractor: EntityExtractor;
  private relationshipBuilder: RelationshipBuilder;
  private confidenceEngine: ConfidenceEngine;
  private graphBuilder: GraphBuilder;

  constructor() {
    this.deduplicator = new Deduplicator();
    this.categorizer = new Categorizer();
    this.entityExtractor = new EntityExtractor();
    this.relationshipBuilder = new RelationshipBuilder();
    this.confidenceEngine = new ConfidenceEngine();
    this.graphBuilder = new GraphBuilder();
  }

  /**
   * Transforms raw normalized KnowledgeItems into a structured Knowledge Graph.
   */
  public buildKnowledgeGraph(rawItems: KnowledgeItem[]): KnowledgeGraph {
    // 1. Deduplication
    const uniqueItems = this.deduplicator.deduplicate(rawItems);

    // 2. Categorization
    this.categorizer.categorize(uniqueItems);

    // 3. Entity Extraction
    const entities = this.entityExtractor.extract(uniqueItems);

    // 4. Relationship Builder
    const relationships = this.relationshipBuilder.build(entities, uniqueItems);

    // 5. Confidence Engine
    const overallConfidence = this.confidenceEngine.compute(uniqueItems, entities, relationships);

    // 6. Graph Builder
    const graph = this.graphBuilder.build(uniqueItems, entities, relationships, overallConfidence);

    return graph;
  }
}
