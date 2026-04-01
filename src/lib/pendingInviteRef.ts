import { supabase } from "@/integrations/supabase/client";

export const WEOUT_PENDING_INVITE_REF_KEY = "weout_pending_invite_ref";

const REF_PATH_PREFIX = "/ref";

function normalizeRef(raw: string | null | undefined): string | null {
  const t = raw?.trim();
  return t && t.length > 0 ? t : null;
}

export function extractInviteRefFromSearchAndPath(
  search: string,
  pathname: string,
): string | null {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const fromRefParam = normalizeRef(params.get("ref"));
  if (fromRefParam) return fromRefParam;

  const path = pathname.replace(/\/+$/, "") || "/";
  const isRefPath = path === REF_PATH_PREFIX || path.startsWith(`${REF_PATH_PREFIX}/`);
  if (isRefPath) {
    const fromCode = normalizeRef(params.get("code"));
    if (fromCode) return fromCode;
  }

  return null;
}

export function setPendingInviteRef(code: string): void {
  const normalized = normalizeRef(code);
  if (!normalized) return;
  try {
    localStorage.setItem(WEOUT_PENDING_INVITE_REF_KEY, normalized);
  } catch {
    /* quota / private mode */
  }
}

export function readPendingInviteRef(): string | null {
  try {
    return normalizeRef(localStorage.getItem(WEOUT_PENDING_INVITE_REF_KEY));
  } catch {
    return null;
  }
}

export function clearPendingInviteRef(): void {
  try {
    localStorage.removeItem(WEOUT_PENDING_INVITE_REF_KEY);
  } catch {
    /* ignore */
  }
}

/** Si session Supabase active : point d’extension pour enregistrer le parrainage côté backend. */
export async function applyPendingInviteRefForSession(_code: string): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return;
}
