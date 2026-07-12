import { z } from "zod";
import { ProfileSchema } from "@/lib/profile/profile-validator";

export type Profile = z.infer<typeof ProfileSchema>;

export interface MissionContext {
  focus: string[];
  role: string;
  industry: string;
  goals: string[];
  keywords: string[];
  watchTargets: string[];
  excludedTopics: string[];
  priority: string;
  timestamp: string;
}
