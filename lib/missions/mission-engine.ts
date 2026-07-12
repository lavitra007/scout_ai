import { RankedSignal } from "@/types/ranked-signal";
import { MissionContext as ProfileMissionContext, ScoutProfile } from "@/types/profile";
import { Mission } from "@/types/mission";
import { MissionGenerator } from "./mission-generator";
import { MissionValidator } from "./mission-validator";

/**
 * The Scout Mission Engine Entry Point.
 * 
 * Pipeline:
 * RankedSignal[] -> MissionGenerator -> MissionBuilder -> MissionValidator -> Mission[]
 */
export class MissionEngine {
  private generator: MissionGenerator;
  private validator: MissionValidator;

  constructor() {
    this.generator = new MissionGenerator();
    this.validator = new MissionValidator();
  }

  /**
   * Transforms prioritized RankedSignals into actionable Mission tasks.
   */
  public buildMissions(signals: RankedSignal[], context: ProfileMissionContext, profile: ScoutProfile): Mission[] {
    
    // 1. Generation: Convert signals to Missions contextually
    const draftMissions = this.generator.generate(signals, context, profile);

    // 2. Validation: Ensure strict structural integrity
    const validMissions = this.validator.validate(draftMissions);

    return validMissions;
  }
}
