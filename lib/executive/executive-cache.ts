import { ExecutiveBrief } from "@/types/executive-brief";

export class ExecutiveCache {
  // Key: missionId, Value: { brief, lastUpdated }
  private cache = new Map<string, { brief: ExecutiveBrief; lastUpdated: string }>();

  /**
   * Retrieves a cached brief if it exists.
   */
  public get(missionId: string): ExecutiveBrief | null {
    const cached = this.cache.get(missionId);
    if (cached) {
      return cached.brief;
    }
    return null;
  }

  /**
   * Caches a newly generated brief.
   */
  public set(missionId: string, brief: ExecutiveBrief, missionUpdatedAt: string): void {
    this.cache.set(missionId, {
      brief,
      lastUpdated: missionUpdatedAt
    });
  }
}
