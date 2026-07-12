import { Profile, MissionContext } from "@/types/profile";

/**
 * Transforms a User Profile into a structured Mission Context.
 * This context is designed to be consumed by the Universal Crawl and AI Reasoning engines.
 */
export function buildMissionContext(profile: Profile): MissionContext {
  return {
    focus: profile.focusAreas,
    role: profile.role,
    industry: profile.focusAreas[0] || "", // legacy mapping
    goals: profile.watchCategories, // legacy mapping
    keywords: [], // legacy mapping
    watchTargets: profile.watchTargets,
    excludedTopics: [], // legacy mapping
    priority: profile.priority,
    timestamp: new Date().toISOString(),
  };
}

export function generateSearchQueries(context: MissionContext): string[] {
  const queries: string[] = [];
  
  // Dynamic generation based on combinations
  const targets = context.watchTargets.length > 0 ? context.watchTargets : [""];
  
  for (const focus of context.focus) {
    for (const category of context.goals) { // goals contains watchCategories
      for (const target of targets) {
        let query = `${focus} ${category}`;
        if (target) {
          query = `${target} ${query}`;
        }
        
        // Add role-specific flavoring if relevant (e.g. Student -> Programs, Scholarships)
        if (context.role.toLowerCase() === "student" && category.toLowerCase().includes("open source")) {
           query += " students";
        }
        
        queries.push(query.trim());
      }
    }
  }
  
  // Return unique queries
  return Array.from(new Set(queries)).slice(0, 5); // Limit to top 5 generated queries
}
