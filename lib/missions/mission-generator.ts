import { RankedSignal } from "@/types/ranked-signal";
import { MissionContext as ProfileMissionContext, ScoutProfile } from "@/types/profile";
import { Mission } from "@/types/mission";
import { MissionContextAnalyzer } from "./mission-context";
import { MissionBuilder } from "./mission-builder";

export class MissionGenerator {
  private contextAnalyzer: MissionContextAnalyzer;
  private missionBuilder: MissionBuilder;

  constructor() {
    this.contextAnalyzer = new MissionContextAnalyzer();
    this.missionBuilder = new MissionBuilder();
  }

  /**
   * Iterates through the RankedSignal array and orchestrates the 
   * generation of exactly one candidate Mission per signal.
   */
  public generate(signals: RankedSignal[], context: ProfileMissionContext, profile: ScoutProfile): Mission[] {
    return signals.map(signal => {
      // 1. Generate Contextual Relevance
      const whyRelevant = this.contextAnalyzer.generateWhyRelevant(signal, context, profile);

      // 2. Build the Mission object
      return this.missionBuilder.build(signal, whyRelevant);
    });
  }
}
