import { Profile, MissionContext } from "@/types/profile";

/**
 * Transforms a User Profile into a structured Mission Context.
 * This context is designed to be consumed by the Universal Crawl and AI Reasoning engines.
 */
export function buildMissionContext(profile: Profile): MissionContext {
  // Derive focus areas by merging interests, industry and role dynamically
  const focusAreas = Array.from(
    new Set([
      ...profile.interests,
      profile.industry,
      `${profile.industry} ${profile.role}`,
      ...profile.goals.map((g) => `${g} in ${profile.industry}`),
    ])
  );

  const watchTargets = Array.from(
    new Set([...profile.watchCompanies, ...profile.competitors])
  );

  return {
    focus: focusAreas,
    role: profile.role,
    industry: profile.industry,
    goals: profile.goals,
    keywords: profile.keywords,
    watchTargets: watchTargets,
    excludedTopics: profile.ignoredTopics,
    priority: profile.priority,
    timestamp: new Date().toISOString(),
  };
}

export function generateSearchQueries(context: MissionContext): string[] {
  // Example utility that might be used by Universal Crawl
  return context.focus.map(
    (focus) => `${focus} ${context.keywords.join(" OR ")}`
  );
}
