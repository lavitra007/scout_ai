import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.string().min(1, "ID is required"),
  missionName: z.string().min(1, "Mission name is required"),
  role: z.string().min(1, "Role is required"),
  industry: z.string().min(1, "Industry is required"),
  organization: z.string().optional(),
  experienceLevel: z.string().optional(),
  goals: z.array(z.string()).min(1, "At least one goal is required"),
  interests: z.array(z.string()).min(1, "At least one interest is required"),
  watchCompanies: z.array(z.string()).default([]),
  competitors: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  ignoredTopics: z.array(z.string()).default([]),
  regions: z.array(z.string()).default(["Global"]),
  priority: z.enum(["CRITICAL", "ELEVATED", "STANDARD"]).default("STANDARD"),
  riskTolerance: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  feedFrequency: z.enum(["REALTIME", "HOURLY", "DAILY"]).default("REALTIME"),
  language: z.string().default("en"),
  timezone: z.string().default("UTC"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ProfileData = z.infer<typeof ProfileSchema>;
