"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { Mission } from "@/types/mission";
import { PipelineState } from "@/types/pipeline";
import { ExecutiveBrief } from "@/types/executive-brief";
import { scoutPipeline } from "./pipeline";
import { useProfile } from "@/lib/profile/context";
import { ExecutiveEngine } from "@/lib/executive/executive-engine";
import { MissionContext as ProfileMissionContext } from "@/types/profile";

interface MissionContextType {
  missions: Mission[];
  loading: boolean;
  pipelineState: PipelineState;
  lastUpdated: string | null;
  error: string | null;
  refresh: () => Promise<void>;
  
  // Executive Engine
  executiveLoading: Record<string, boolean>;
  executiveError: Record<string, string | null>;
  executiveBriefs: Record<string, ExecutiveBrief>;
  loadExecutiveBrief: (missionId: string) => Promise<void>;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: ReactNode }) {
  const { profile } = useProfile();
  
  // Pipeline State
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [pipelineState, setPipelineState] = useState<PipelineState>("IDLE");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Executive State
  const [executiveLoading, setExecutiveLoading] = useState<Record<string, boolean>>({});
  const [executiveError, setExecutiveError] = useState<Record<string, string | null>>({});
  const [executiveBriefs, setExecutiveBriefs] = useState<Record<string, ExecutiveBrief>>({});
  const executiveEngineRef = useRef(new ExecutiveEngine());

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

  const loadExecutiveBrief = async (missionId: string) => {
    if (!profile) return;
    
    // Find target mission
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;
    
    // Filter check: UI level safeguard
    if (mission.priority !== "CRITICAL" && mission.priority !== "HIGH") return;
    
    // Return early if already cached in UI state
    if (executiveBriefs[missionId]) return;

    setExecutiveLoading(prev => ({ ...prev, [missionId]: true }));
    setExecutiveError(prev => ({ ...prev, [missionId]: null }));

    try {
      // Reconstruct context (ideally cached or derived from profile)
      const context: ProfileMissionContext = {
        id: `ctx_exec`,
        focus: profile.interests,
        goals: profile.goals,
        priority: "HIGH",
        riskTolerance: "MEDIUM"
      };

      const result = await executiveEngineRef.current.enrichMission(mission, context, profile);
      
      if (result.brief) {
        setExecutiveBriefs(prev => ({ ...prev, [missionId]: result.brief! }));
      } else {
        throw new Error("Executive filter blocked enrichment or engine failed.");
      }
    } catch (err) {
      setExecutiveError(prev => ({ 
        ...prev, 
        [missionId]: err instanceof Error ? err.message : "Failed to generate executive brief."
      }));
    } finally {
      setExecutiveLoading(prev => ({ ...prev, [missionId]: false }));
    }
  };

  // Automatically run the pipeline when the provider mounts and profile is ready
  useEffect(() => {
    if (profile) {
      refresh();
    } else {
      setLoading(false);
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
        executiveLoading,
        executiveError,
        executiveBriefs,
        loadExecutiveBrief
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
