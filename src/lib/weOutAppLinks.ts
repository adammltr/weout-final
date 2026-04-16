/**
 * Liens officiels WeOut (landing, communauté, deep links). Préférer VITE_* en prod.
 */
export const TESTFLIGHT_URL =
  import.meta.env.VITE_TESTFLIGHT_URL ?? "https://testflight.apple.com/join/rGnABBKz";

export const PLAY_STORE_URL = import.meta.env.VITE_PLAY_STORE_URL as string | undefined;

export const DISCORD_INVITE_LINK = "https://discord.gg/azSbYCFmS3";
export const INSTAGRAM_GROUP_LINK = "https://ig.me/j/AbbdpdeBZYvEMAq8/";
export const INSTAGRAM_PROFILE_LINK = "https://www.instagram.com/weoutsocial";

export const JOIN_SITE_ORIGIN =
  (import.meta.env.VITE_JOIN_SITE_ORIGIN as string | undefined)?.replace(/\/+$/, "") ??
  (typeof window !== "undefined" ? window.location.origin : "https://join-weout.com");

export function buildPlanUniversalUrl(planId: string, sref: string | null): string {
  const u = new URL("/", JOIN_SITE_ORIGIN);
  u.searchParams.set("plan", planId);
  if (sref?.trim()) u.searchParams.set("sref", sref.trim());
  return u.toString();
}
