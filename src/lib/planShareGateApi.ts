import { supabase } from "@/integrations/supabase/client";

export type PlanGateKind =
  | "ok"
  | "not_found"
  | "cancelled"
  | "private"
  | "age_restricted"
  | "needs_birth_year"
  | "unconfigured"
  | "error"
  | "network";

export type PlanGateResult = {
  gate: PlanGateKind;
  minAge?: number | null;
  maxAge?: number | null;
  ageDetail?: "too_young" | "too_old";
};

const GATE_VALUES: PlanGateKind[] = [
  "ok",
  "not_found",
  "cancelled",
  "private",
  "age_restricted",
  "needs_birth_year",
  "unconfigured",
  "error",
];

function parseGate(raw: unknown): PlanGateResult {
  if (!raw || typeof raw !== "object") return { gate: "error" };
  const o = raw as Record<string, unknown>;
  const g = String(o.gate ?? "");
  const gate = (GATE_VALUES.includes(g as PlanGateKind) ? g : "error") as PlanGateKind;
  const out: PlanGateResult = {
    gate,
    minAge: typeof o.min_age === "number" ? o.min_age : o.min_age == null ? null : Number(o.min_age),
    maxAge: typeof o.max_age === "number" ? o.max_age : o.max_age == null ? null : Number(o.max_age),
  };
  const d = o.detail;
  if (d === "too_young" || d === "too_old") out.ageDetail = d;
  return out;
}

/**
 * Appelle la RPC `get_plan_share_gate` (Supabase). Voir `docs/supabase-plan-share-gate.sql`.
 * Sans RPC / table `plans` : retour `unconfigured` ou erreur réseau.
 */
export async function fetchPlanShareGate(
  planId: string,
  birthYear: number | null,
): Promise<PlanGateResult> {
  try {
    // RPC absente des types générés du landing — contrat documenté dans docs/supabase-plan-share-gate.sql
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any).rpc("get_plan_share_gate", {
      p_plan_id: planId,
      p_birth_year: birthYear,
    });
    if (error) {
      const code = String((error as { code?: string }).code ?? "");
      const msg = String((error as { message?: string }).message ?? "").toLowerCase();
      if (
        code === "PGRST202" ||
        code === "42883" ||
        msg.includes("could not find the function") ||
        msg.includes("does not exist")
      ) {
        return { gate: "unconfigured" };
      }
      return { gate: "network" };
    }
    return parseGate(data);
  } catch {
    return { gate: "network" };
  }
}
