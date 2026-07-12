"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Profile } from "@/types/profile";
import { loadProfile, updateProfile, resetProfile } from "./profile-storage";

interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  update: (updates: Partial<Profile>) => void;
  reset: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initProfile = () => {
      const localProfile = loadProfile();
      if (mounted) {
        setProfile(localProfile || null);
        setIsLoading(false);
      }
    };

    initProfile();

    return () => { mounted = false; };
  }, []);

  const update = (updates: Partial<Profile>) => {
    const newProfile = updateProfile(updates);
    setProfile(newProfile);
  };

  const reset = () => {
    const newProfile = resetProfile();
    setProfile(newProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, isLoading, update, reset }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
