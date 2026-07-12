import { Profile } from "@/types/profile";
import { ProfileSchema } from "./profile-validator";
import { defaultProfile } from "./profile-defaults";

const STORAGE_KEY = "scout_ai_profile";

export function saveProfile(profile: Profile): void {
  if (typeof window === "undefined") return;
  
  // Validate before saving
  const validated = ProfileSchema.parse(profile);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
}

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  
  try {
    const parsed = JSON.parse(data);
    // Return validated profile
    return ProfileSchema.parse(parsed);
  } catch (error) {
    console.error("Failed to parse or validate profile from storage:", error);
    return null;
  }
}

export function updateProfile(updates: Partial<Profile>): Profile {
  const current = loadProfile() || defaultProfile;
  const updated = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveProfile(updated);
  return updated;
}

export function deleteProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function resetProfile(): Profile {
  const newProfile = {
    ...defaultProfile,
    id: crypto.randomUUID ? crypto.randomUUID() : "reset-id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveProfile(newProfile);
  return newProfile;
}
