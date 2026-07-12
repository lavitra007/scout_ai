"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface IntelCardProps {
  id: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  time: string;
  title: string;
  whyItMatters: string;
  confidenceScore: number;
  image?: string;
  opacity?: string;
}

export function IntelCard({
  id,
  priority,
  time,
  title,
  whyItMatters,
  confidenceScore,
  image,
  opacity,
}: IntelCardProps) {
  const isCritical = priority === "CRITICAL";
  const isElevated = priority === "HIGH";

  const priorityColor = isCritical
    ? "text-error"
    : isElevated
    ? "text-terminal-lime"
    : "text-text-muted";
  const priorityBg = isCritical
    ? "bg-error-container/20 border-error/30"
    : isElevated
    ? "bg-terminal-lime/10 border-terminal-lime/30"
    : "bg-surface-variant border-border-muted";

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border border-border-muted bg-background hover:bg-surface-slate transition-colors ${opacity}`}
    >
      <div className="border-b border-border-muted p-3 flex justify-between items-center bg-surface-container-high">
        <span
          className={`font-label-caps text-label-caps px-2 py-1 border ${priorityColor} ${priorityBg}`}
        >
          [PRIORITY_{priority}]
        </span>
        <span className="font-code-sm text-code-sm text-text-muted">{time}</span>
      </div>

      <div className="p-6">
        <div className={image ? "flex gap-6 mb-4" : ""}>
          {image && (
            <div className="w-32 h-32 shrink-0 border border-border-muted bg-surface-container-low flex items-center justify-center">
              <img
                src={image}
                alt="Intel visual"
                className="w-full h-full object-cover grayscale opacity-70"
              />
            </div>
          )}
          <div>
            <h3
              className={`font-title-sm text-title-sm mb-4 ${
                (priority === "MEDIUM" || priority === "LOW") ? "text-text-muted" : "text-primary"
              }`}
            >
              {title}
            </h3>
            {whyItMatters && (
              <div className="mb-6">
                <h4 className="font-label-caps text-label-caps text-text-muted mb-2 border-b border-border-muted inline-block">
                  WHY IT MATTERS
                </h4>
                <p className="font-body-base text-body-base text-inverse-surface text-sm">
                  {whyItMatters}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border-muted">
          <div className="flex flex-col">
            <span className="font-code-sm text-code-sm text-text-muted">
              CONFIDENCE_SCORE
            </span>
            <span
              className={`font-title-sm text-title-sm ${
                (priority === "MEDIUM" || priority === "LOW")
                  ? "text-text-muted"
                  : "text-terminal-lime"
              }`}
            >
              {confidenceScore}%
            </span>
          </div>
          <Link href={`/mission/${id}`}>
            <button
              className={`bg-background px-4 py-2 font-label-caps text-label-caps transition-all border ${
                (priority === "MEDIUM" || priority === "LOW")
                  ? "text-text-muted border-border-muted hover:border-primary hover:text-primary"
                  : "text-primary border-border-muted hover:border-primary hover:text-primary"
              }`}
            >
              {">"} {(priority === "MEDIUM" || priority === "LOW") ? "EXECUTE UPDATE" : "ANALYZE IMPACT"}
            </button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
