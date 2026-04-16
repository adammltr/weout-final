export type DevicePlatform = "ios" | "android" | "other";

/** Détection navigateur (pas d’API d’installation : on guide par plateforme). */
export function detectDevicePlatform(): DevicePlatform {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  return "other";
}
