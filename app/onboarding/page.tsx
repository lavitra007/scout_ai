"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useProfile } from "@/lib/profile/profile-context";
import { buildMissionContext, generateSearchQueries } from "@/lib/profile/profile-service";
import { defaultProfile } from "@/lib/profile/profile-defaults";

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, update } = useProfile();
  
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<string>("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [watchCategories, setWatchCategories] = useState<string[]>([]);
  const [watchTargets, setWatchTargets] = useState<string[]>([]);
  const [targetInput, setTargetInput] = useState("");
  const [isInitializing, setIsInitializing] = useState(false);
  const [initLogs, setInitLogs] = useState<string[]>([]);

  useEffect(() => {
    if (profile) {
      setRole(profile.role);
      setFocusAreas(profile.focusAreas);
      setWatchCategories(profile.watchCategories);
      setWatchTargets(profile.watchTargets);
    }
  }, [profile]);

  const roles = [
    { id: "STU-01", name: "> STUDENT", val: "Student", icon: "school", desc: "Prioritize internships, hackathons, and learning resources." },
    { id: "FND-02", name: "> FOUNDER", val: "Founder", icon: "rocket_launch", desc: "Prioritize funding, competitors, and market trends." },
    { id: "ENG-03", name: "> SOFTWARE ENGINEER", val: "Software Engineer", icon: "terminal", desc: "Prioritize open source, developer tools, and APIs." },
    { id: "RSH-04", name: "> RESEARCHER", val: "Researcher", icon: "science", desc: "Prioritize research papers, conferences, and patents." },
    { id: "INV-05", name: "> INVESTOR", val: "Investor", icon: "monitoring", desc: "Prioritize funding news, startups, and acquisitions." },
    { id: "PM-06", name: "> PRODUCT MANAGER", val: "Product Manager", icon: "view_kanban", desc: "Prioritize product launches and feature updates." },
    { id: "DSG-07", name: "> DESIGNER", val: "Designer", icon: "palette", desc: "Prioritize design systems and UI/UX trends." },
    { id: "OTH-08", name: "> OTHER", val: "Other", icon: "blur_on", desc: "Standard intelligence feed with custom parameters." },
  ];

  const focusOptions = [
    "Artificial Intelligence", "Healthcare", "Cybersecurity", "Developer Tools", 
    "Robotics", "Finance", "Climate Tech", "Education", "Open Source", "Cloud Computing"
  ];

  const watchOptions = [
    "Funding", "Hackathons", "Research Papers", "Jobs", "Product Launches", 
    "Competitor Updates", "Government Policies", "Acquisitions", "Open Source Projects", "Startup Programs"
  ];

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const toggleFocus = (opt: string) => {
    setFocusAreas(prev => prev.includes(opt) ? prev.filter(p => p !== opt) : [...prev, opt]);
  };

  const toggleWatch = (opt: string) => {
    setWatchCategories(prev => prev.includes(opt) ? prev.filter(p => p !== opt) : [...prev, opt]);
  };

  const addTarget = () => {
    if (targetInput.trim() && !watchTargets.includes(targetInput.trim())) {
      setWatchTargets([...watchTargets, targetInput.trim()]);
    }
    setTargetInput("");
  };

  const handleTargetKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTarget();
    }
  };

  const removeTarget = (t: string) => {
    setWatchTargets(watchTargets.filter(item => item !== t));
  };

  const runInitialization = async () => {
    setIsInitializing(true);
    const logs = [
      "Saving Profile...",
      "Validating Profile schema...",
      "Generating MissionContext...",
      "Generating Dynamic Search Queries...",
      "Generating Crawl Strategy...",
      "Generating Watch List...",
      "Persisting Profile...",
    ];

    // Build temporary context to demonstrate dynamic search generation
    const tempProfile = { ...defaultProfile, role, focusAreas, watchCategories, watchTargets };
    const ctx = buildMissionContext(tempProfile as any);
    const queries = generateSearchQueries(ctx);

    for (let i = 0; i < logs.length; i++) {
      setInitLogs(prev => [...prev, logs[i]]);
      await new Promise(r => setTimeout(r, 500));
    }

    setInitLogs(prev => [...prev, "> DYNAMIC QUERIES GENERATED:", ...queries.map(q => `  - ${q}`)]);
    await new Promise(r => setTimeout(r, 1500));

    update({ role, focusAreas, watchCategories, watchTargets });
    router.push("/dashboard");
  };

  const isNextDisabled = () => {
    if (step === 1 && !role) return true;
    if (step === 2 && focusAreas.length === 0) return true;
    if (step === 3 && watchCategories.length === 0) return true;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden font-body-base text-body-base">
      <motion.div
        className="absolute left-0 w-full h-1 bg-terminal-lime opacity-20 z-0 shadow-[0_0_15px_#ccff00]"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
      />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-background border border-border-muted relative z-10 flex flex-col shadow-2xl min-h-[600px]"
      >
        <header className="border-b border-border-muted p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-slate">
          <div>
            <h1 className="font-title-sm text-title-sm text-primary tracking-widest uppercase">
              SCOUT_SYSTEM // INIT
            </h1>
            <p className="font-code-sm text-code-sm text-text-muted mt-1 uppercase">
              MODULE_0{step}: {step === 1 ? 'IDENTITY_CLASSIFICATION' : step === 2 ? 'FOCUS_PARAMETERS' : step === 3 ? 'WATCH_CATEGORIES' : step === 4 ? 'TRACKING_TARGETS' : 'INITIALIZATION'}
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="font-label-caps text-label-caps text-text-muted">
              STEP 0{step}/05
            </span>
            <div className="flex-grow md:w-48 h-2 bg-surface-container border border-border-muted overflow-hidden relative">
              <div 
                className="absolute top-0 left-0 h-full bg-terminal-lime transition-all duration-500 shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </header>

        <div className="p-8 md:p-12 flex-grow flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: ROLE */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                <h2 className="font-headline-md text-headline-md text-primary mb-2 crt-glow text-center">WHO ARE YOU?</h2>
                <p className="font-code-sm text-code-sm text-text-muted mb-8 max-w-lg mx-auto text-center">
                  Select primary operational profile. This designation determines default heuristic analysis models.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  {roles.map((r) => {
                    const isSelected = role === r.val;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setRole(r.val)}
                        className={`border p-4 flex flex-col items-start text-left cursor-pointer group focus:outline-none transition-all duration-200 ${
                          isSelected ? "border-terminal-lime bg-surface-container-high crt-glow-box" : "border-border-muted bg-surface-container-lowest hover:bg-surface-slate hover:border-text-muted"
                        }`}
                      >
                        <div className={`icon-container mb-2 transition-colors ${isSelected ? "text-terminal-lime" : "text-text-muted"}`}>
                          <span className="material-symbols-outlined text-3xl">{r.icon}</span>
                        </div>
                        <h3 className={`font-title-sm text-sm mb-2 transition-colors ${isSelected ? "text-terminal-lime" : "text-primary"}`}>{r.name}</h3>
                        <p className="font-code-sm text-xs text-text-muted group-hover:text-inverse-surface transition-colors leading-tight">{r.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: FOCUS AREAS */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                <h2 className="font-headline-md text-headline-md text-primary mb-2 crt-glow text-center">WHAT DO YOU CARE ABOUT?</h2>
                <p className="font-code-sm text-code-sm text-text-muted mb-8 max-w-lg mx-auto text-center">
                  Select your primary focus areas. These become the primary domains for dynamic search queries.
                </p>
                <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
                  {focusOptions.map((opt) => {
                    const isSelected = focusAreas.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => toggleFocus(opt)}
                        className={`px-4 py-2 border font-code-sm text-sm transition-all duration-200 ${
                          isSelected ? "border-terminal-lime bg-terminal-lime/10 text-terminal-lime crt-glow-box" : "border-border-muted bg-surface-container text-text-muted hover:border-primary hover:text-primary"
                        }`}
                      >
                        {isSelected ? "[x] " : "[ ] "}{opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: WATCH CATEGORIES */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                <h2 className="font-headline-md text-headline-md text-primary mb-2 crt-glow text-center">WHAT SHOULD SCOUT WATCH?</h2>
                <p className="font-code-sm text-code-sm text-text-muted mb-8 max-w-lg mx-auto text-center">
                  Which opportunities should Scout actively search for? These determine Anakin tool routing.
                </p>
                <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
                  {watchOptions.map((opt) => {
                    const isSelected = watchCategories.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => toggleWatch(opt)}
                        className={`px-4 py-2 border font-code-sm text-sm transition-all duration-200 ${
                          isSelected ? "border-terminal-lime bg-terminal-lime/10 text-terminal-lime crt-glow-box" : "border-border-muted bg-surface-container text-text-muted hover:border-primary hover:text-primary"
                        }`}
                      >
                        {isSelected ? "[x] " : "[ ] "}{opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: WATCH TARGETS */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full items-center">
                <h2 className="font-headline-md text-headline-md text-primary mb-2 crt-glow text-center">WHO SHOULD SCOUT TRACK?</h2>
                <p className="font-code-sm text-code-sm text-text-muted mb-8 max-w-lg mx-auto text-center">
                  Enter companies, organizations, technologies, or people to monitor. Press Enter to add.
                </p>
                
                <div className="w-full max-w-xl flex gap-2 mb-6">
                  <input 
                    type="text" 
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    onKeyDown={handleTargetKeyDown}
                    placeholder="e.g. OpenAI, MIT, LangChain..."
                    className="flex-grow bg-surface-container border border-border-muted p-3 font-code-sm text-primary focus:outline-none focus:border-terminal-lime transition-colors"
                  />
                  <button onClick={addTarget} className="px-6 border border-border-muted bg-surface-slate hover:bg-surface-bright hover:border-terminal-lime hover:text-terminal-lime transition-colors font-label-caps">
                    ADD
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 w-full max-w-xl">
                  {watchTargets.map(t => (
                    <div key={t} className="flex items-center gap-2 border border-terminal-lime bg-terminal-lime/10 px-3 py-1">
                      <span className="font-code-sm text-terminal-lime">{t}</span>
                      <button onClick={() => removeTarget(t)} className="text-text-muted hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  ))}
                  {watchTargets.length === 0 && (
                    <div className="w-full text-center p-6 border border-dashed border-border-muted text-text-muted font-code-sm">
                      NO TARGETS SPECIFIED. SCOUT WILL USE BROAD SEARCHES.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 5: REVIEW & INITIALIZE */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full w-full">
                {!isInitializing ? (
                  <>
                    <h2 className="font-headline-md text-headline-md text-primary mb-2 crt-glow text-center">REVIEW & INITIALIZE</h2>
                    <p className="font-code-sm text-code-sm text-text-muted mb-8 max-w-lg mx-auto text-center">
                      Confirm your intelligence profile. Scout will continuously monitor these perimeters.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto mb-8">
                      <div className="border border-border-muted p-4 bg-surface-container-lowest">
                        <h4 className="font-label-caps text-text-muted mb-2">ROLE</h4>
                        <div className="font-code-sm text-terminal-lime">{role}</div>
                      </div>
                      <div className="border border-border-muted p-4 bg-surface-container-lowest">
                        <h4 className="font-label-caps text-text-muted mb-2">TRACKED TARGETS ({watchTargets.length})</h4>
                        <div className="font-code-sm text-primary">{watchTargets.length > 0 ? watchTargets.join(", ") : "None"}</div>
                      </div>
                      <div className="border border-border-muted p-4 bg-surface-container-lowest">
                        <h4 className="font-label-caps text-text-muted mb-2">FOCUS AREAS ({focusAreas.length})</h4>
                        <div className="font-code-sm text-primary">{focusAreas.join(", ")}</div>
                      </div>
                      <div className="border border-border-muted p-4 bg-surface-container-lowest">
                        <h4 className="font-label-caps text-text-muted mb-2">WATCH CATEGORIES ({watchCategories.length})</h4>
                        <div className="font-code-sm text-primary">{watchCategories.join(", ")}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto space-y-4">
                    <div className="w-16 h-16 border-4 border-terminal-lime border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="w-full bg-surface-container border border-border-muted p-6 font-code-sm text-left h-64 overflow-y-auto">
                      {initLogs.map((log, i) => (
                        <div key={i} className={`mb-1 ${log.startsWith(">") ? "text-terminal-lime mt-4" : log.startsWith("  -") ? "text-primary" : "text-text-muted"}`}>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Footer */}
        <footer className="border-t border-border-muted p-6 bg-surface-container-lowest flex justify-between items-center mt-auto">
          {step > 1 && !isInitializing ? (
            <button onClick={handleBack} className="px-6 py-3 border border-border-muted bg-background text-primary font-label-caps hover:bg-surface-bright hover:border-text-muted transition-all duration-200">
              [ BACK ]
            </button>
          ) : <div></div>}
          
          {step < 5 ? (
            <button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className={`px-6 py-3 font-label-caps transition-all duration-200 border ${
                !isNextDisabled()
                  ? "bg-terminal-lime text-background border-transparent hover:bg-background hover:text-terminal-lime hover:border-terminal-lime crt-glow-box cursor-pointer"
                  : "bg-surface-container text-text-muted border-border-muted cursor-not-allowed opacity-50"
              }`}
            >
              {">"} CONTINUE_SEQUENCE
            </button>
          ) : (
            !isInitializing && (
              <button
                onClick={runInitialization}
                className="px-6 py-3 font-label-caps transition-all duration-200 border bg-terminal-lime text-background border-transparent hover:bg-background hover:text-terminal-lime hover:border-terminal-lime crt-glow-box cursor-pointer"
              >
                {">"} INITIALIZE SCOUT
              </button>
            )
          )}
        </footer>
      </motion.main>
    </div>
  );
}
