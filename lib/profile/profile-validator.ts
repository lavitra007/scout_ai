import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.string().min(1, "ID is required"),
  missionName: z.string().min(1, "Mission name is required"),
  role: z.string().min(1, "Role is required"),
  focusAreas: z.array(z.string()).min(1, "At least one focus area is required"),
  watchCategories: z.array(z.string()).min(1, "At least one watch category is required"),
  watchTargets: z.array(z.string()).default([]),
  priority: z.enum(["CRITICAL", "ELEVATED", "STANDARD"]).default("STANDARD"),
  riskTolerance: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  feedFrequency: z.enum(["REALTIME", "HOURLY", "DAILY"]).default("REALTIME"),
  language: z.string().default("en"),
  timezone: z.string().default("UTC"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ProfileData = z.infer<typeof ProfileSchema>;
