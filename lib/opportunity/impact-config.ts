import { SignalCategory } from "@/types/signal";

/**
 * Configurable scoring rules for Business Impact.
 * This separates configuration from business logic.
 * Values are normalized 0.0 to 1.0.
 */
export const IMPACT_CONFIG: Record<SignalCategory, number> = {
  REGULATION: 0.95, // High impact
  ACQUISITION: 0.90,
  FUNDING: 0.85,
  PRODUCT_LAUNCH: 0.80,
  COMPETITOR_MOVE: 0.75,
  SECURITY: 0.95, // Often critical
  RESEARCH: 0.60, // Medium impact
  POLICY: 0.65,
  TREND: 0.50,
  HIRING: 0.40, // Low impact
  BREAKING: 0.90,
  OTHER: 0.30
};
