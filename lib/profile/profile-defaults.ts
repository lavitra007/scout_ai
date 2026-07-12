import { Profile } from "@/types/profile";

export const defaultProfile: Profile = {
  id: crypto.randomUUID ? crypto.randomUUID() : "default-id",
  missionName: "Default Scout Mission",
  role: "Operative",
  industry: "Technology",
  organization: "",
  experienceLevel: "Mid-Level",
  goals: ["Discover emerging trends"],
  interests: ["Artificial Intelligence"],
  watchCompanies: [],
  competitors: [],
  keywords: [],
  ignoredTopics: [],
  regions: ["Global"],
  priority: "STANDARD",
  riskTolerance: "MEDIUM",
  feedFrequency: "REALTIME",
  language: "en",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
