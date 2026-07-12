"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Mission } from "@/types/mission";
import { PipelineState } from "@/types/pipeline";
import { scoutPipeline } from "./pipeline";
import { useProfile } from "@/lib/profile/context";

interface MissionContextType {
  missions: Mission[];
  loading: boolean;
  pipelineState: PipelineState;
  lastUpdated: string | null;
  error: string | null;
  refresh: () => Promise<void>;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: ReactNode }) {
  const { profile } = useProfile();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [pipelineState, setPipelineState] = useState<PipelineState>("IDLE");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    if (!profile) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const generatedMissions = await scoutPipeline.run((state) => {
        setPipelineState(state);
      });
      
      setMissions(generatedMissions);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred during pipeline execution.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically run the pipeline when the provider mounts and profile is ready
  useEffect(() => {
    if (profile) {
      refresh();
    } else {
      setLoading(false); // Stop loading if no profile (user might be on onboarding)
    }
  }, [profile]);

  return (
    <MissionContext.Provider
      value={{
        missions,
        loading,
        pipelineState,
        lastUpdated,
        error,
        refresh,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
}

export function useMissions() {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error("useMissions must be used within a MissionProvider");
  }
  return context;
}
