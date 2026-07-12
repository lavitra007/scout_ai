import { Mission } from "@/types/mission";
import { MissionContext, ScoutProfile } from "@/types/profile";
import { ExecutiveBrief } from "@/types/executive-brief";
import { ExecutiveFilter } from "./executive-filter";
import { ExecutiveContextBuilder } from "./executive-context";
import { ExecutiveService } from "./executive-service";
import { ExecutiveCache } from "./executive-cache";

/**
 * The Scout Executive Intelligence Engine.
 * Enriches HIGH and CRITICAL priority missions with deep agentic research.
 */
export class ExecutiveEngine {
  private filter: ExecutiveFilter;
  private contextBuilder: ExecutiveContextBuilder;
  private service: ExecutiveService;
  private cache: ExecutiveCache;

  constructor() {
    this.filter = new ExecutiveFilter();
    this.contextBuilder = new ExecutiveContextBuilder();
    this.service = new ExecutiveService();
    this.cache = new ExecutiveCache();
  }

  /**
   * Selectively enriches a mission if it meets priority thresholds.
   * Leverages caching to avoid redundant LLM calls.
   */
  public async enrichMission(
    mission: Mission, 
    context: MissionContext, 
    profile: ScoutProfile
  ): Promise<{ mission: Mission; brief: ExecutiveBrief | null }> {
    
    // 1. Filter: Ensure it's worth the compute
    if (!this.filter.isEligible(mission)) {
      return { mission, brief: null };
    }

    // 2. Cache: Check if we already researched this exact mission state
    const cachedBrief = this.cache.get(mission.id);
    if (cachedBrief) {
      // Basic cache validation: if mission was updated after cache generation, invalidate.
      // For this demo, we assume the cache is perfectly synchronized or the mission is immutable.
      return { mission, brief: cachedBrief };
    }

    // 3. Contextualize: Build the payload
    const contextString = this.contextBuilder.buildContextString(mission, context, profile);

    // 4. Execute: Run agentic search
    try {
      const brief = await this.service.researchMission(mission, contextString);
      
      // 5. Cache the result
      this.cache.set(mission.id, brief, mission.updatedAt);
      
      return { mission, brief };
    } catch (error) {
      console.error(`ExecutiveEngine failed to enrich mission ${mission.id}:`, error);
      return { mission, brief: null }; // Degrade gracefully
    }
  }
}
