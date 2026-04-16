import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildPlanUniversalUrl,
  DISCORD_INVITE_LINK,
  INSTAGRAM_GROUP_LINK,
  INSTAGRAM_PROFILE_LINK,
  TESTFLIGHT_URL,
} from "@/lib/weOutAppLinks";
import { detectDevicePlatform, type DevicePlatform } from "@/lib/platform";
import { fetchPlanShareGate, type PlanGateResult } from "@/lib/planShareGateApi";

const BIRTH_YEAR_KEY = "weout_plan_visitor_birth_year";

const DEFAULT_PAGE_TITLE =
  "WeOut — Sortir à Caen, rencontrer des amis et vivre la nightlife étudiante";
const DEFAULT_PAGE_DESC =
  "WeOut est l’app pour sortir à Caen, rencontrer des gens et organiser des soirées étudiantes en ville. Crée un plan, vois qui est chaud et profite de la nightlife avec tes amis.";

export const PLAN_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Phase =
  | "loading"
  | "age"
  | "eligible_ios"
  | "eligible_android"
  | "eligible_other"
  | "ineligible"
  | "neutral";

function readStoredBirthYear(): number | null {
  try {
    const raw = sessionStorage.getItem(BIRTH_YEAR_KEY);
    if (!raw) return null;
    const y = parseInt(raw, 10);
    if (Number.isNaN(y) || y < 1900 || y > new Date().getFullYear()) return null;
    return y;
  } catch {
    return null;
  }
}

function storeBirthYear(y: number) {
  try {
    sessionStorage.setItem(BIRTH_YEAR_KEY, String(y));
  } catch {
    /* private mode */
  }
}

function resolvePhase(
  gate: PlanGateResult,
  platform: DevicePlatform,
  hadBirthYearForFetch: boolean,
): Phase {
  switch (gate.gate) {
    case "needs_birth_year":
      return hadBirthYearForFetch ? "neutral" : "age";
    case "ok":
      if (platform === "ios") return "eligible_ios";
      if (platform === "android") return "eligible_android";
      return "eligible_other";
    case "age_restricted":
    case "cancelled":
    case "private":
      return "ineligible";
    default:
      return "neutral";
  }
}

function setDocumentMeta(title: string, description: string) {
  document.title = title;
  let el = document.querySelector('meta[name="description"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "description");
    document.head.appendChild(el);
  }
  el.setAttribute("content", description);
}

const cardClass =
  "rounded-2xl border border-primary/20 bg-card/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.55)] ring-1 ring-inset ring-white/[0.05]";

function PlanBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[hsl(265_32%_7%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 130% 75% at 50% -15%, hsl(var(--primary) / 0.2), transparent 58%)",
            "radial-gradient(ellipse 85% 55% at 100% 65%, hsl(var(--accent) / 0.12), transparent 52%)",
            "radial-gradient(ellipse 75% 50% at 0% 55%, hsl(var(--primary) / 0.14), transparent 48%)",
            "linear-gradient(165deg, hsl(268 28% 9%) 0%, hsl(250 18% 6%) 42%, hsl(28 25% 8%) 100%)",
          ].join(", "),
        }}
      />
    </>
  );
}

function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function SocialButtonsRow() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="outline"
        asChild
        className="h-11 rounded-full border-border/50 bg-muted/15 text-foreground hover:bg-muted/30 text-sm font-medium"
      >
        <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="mr-2 h-4 w-4 shrink-0 opacity-80" />
          Discord
        </a>
      </Button>
      <Button
        variant="outline"
        asChild
        className="h-11 rounded-full border-border/50 bg-muted/15 text-foreground hover:bg-muted/30 text-sm font-medium"
      >
        <a href={INSTAGRAM_GROUP_LINK} target="_blank" rel="noopener noreferrer" title="Groupe Instagram WeOut">
          <IgIcon className="mr-2 h-4 w-4 shrink-0 opacity-80" />
          Instagram
        </a>
      </Button>
    </div>
  );
}

/** Rappel court : évite le reflex « bug ». */
function PlanHint({ short }: { short?: boolean }) {
  if (short) {
    return (
      <p className="text-sm text-muted-foreground rounded-lg border border-accent/25 bg-accent/[0.06] px-3 py-2.5">
        <span className="font-medium text-foreground/90">Souvent pas un bug.</span> Le plan a des règles (âge, etc.).
        Ici ça ne colle pas pour toi, c’est normal.
      </p>
    );
  }
  return (
    <p className="text-sm text-muted-foreground rounded-lg border border-primary/20 bg-primary/[0.06] px-3 py-2.5">
      <span className="font-medium text-foreground/90">Souvent pas un bug.</span> Lien expiré, âge, ou autre règle
      du plan. Réessaie ou demande à la personne qui t’envoie le lien.
    </p>
  );
}

type PlanShareLandingProps = {
  planId: string;
  sref: string | null;
};

const PlanShareLanding = ({ planId, sref }: PlanShareLandingProps) => {
  const [phase, setPhase] = useState<Phase>("loading");
  const [gate, setGate] = useState<PlanGateResult | null>(null);
  const [birthInput, setBirthInput] = useState("");
  const [platform, setPlatform] = useState<DevicePlatform>("other");

  const universalUrl = useMemo(() => buildPlanUniversalUrl(planId, sref), [planId, sref]);

  const runGate = useCallback(async () => {
    setPhase("loading");
    const plat = detectDevicePlatform();
    setPlatform(plat);
    const stored = readStoredBirthYear();
    const res = await fetchPlanShareGate(planId, stored);
    setGate(res);
    setPhase(resolvePhase(res, plat, stored !== null));
  }, [planId]);

  useEffect(() => {
    void runGate();
  }, [runGate]);

  useEffect(() => {
    return () => {
      setDocumentMeta(DEFAULT_PAGE_TITLE, DEFAULT_PAGE_DESC);
    };
  }, []);

  useEffect(() => {
    if (phase === "loading") {
      setDocumentMeta("WeOut — Plan…", "Ouverture du lien WeOut.");
      return;
    }
    if (phase === "age") {
      setDocumentMeta("WeOut — Ton âge", "Pour vérifier si le plan te correspond.");
      return;
    }
    if (phase.startsWith("eligible")) {
      setDocumentMeta("WeOut — Rejoins le plan", "Ouvre WeOut ou TestFlight.");
      return;
    }
    if (phase === "ineligible") {
      setDocumentMeta("WeOut — Plan inaccessible", "Critères du plan ou lien.");
      return;
    }
    setDocumentMeta("WeOut — Plan", "Lien ou critères du plan.");
  }, [phase]);

  const submitBirthYear = (e: React.FormEvent) => {
    e.preventDefault();
    const y = parseInt(birthInput.trim(), 10);
    const maxY = new Date().getFullYear();
    if (Number.isNaN(y) || y < 1900 || y > maxY) return;
    storeBirthYear(y);
    void runGate();
  };

  const ineligibleCopy = useMemo(() => {
    if (!gate) return { title: "", body: "" };
    if (gate.gate === "age_restricted") {
      const isYoung = gate.ageDetail === "too_young";
      return {
        title: "Ce plan ne colle pas pour toi",
        body: isYoung
          ? "Tu es en dessous de l’âge prévu pour cette sortie. Ce n’est pas un bug, c’est une limite posée par l’hôte."
          : "Tu es au dessus de l’âge max pour ce plan. Pareil, c’est une règle du plan, pas la panne de l’app.",
      };
    }
    if (gate.gate === "cancelled") {
      return {
        title: "Ce plan n’existe plus",
        body: "Il a été fermé ou annulé. Demande un nouveau lien à ton hôte.",
      };
    }
    if (gate.gate === "private") {
      return {
        title: "Plan privé",
        body: "Là il faut une vraie invitation dans l’app. Écris à la personne qui organise.",
      };
    }
    return {
      title: "Tu ne peux pas rejoindre ce plan ici",
      body: "Les règles du plan ne matchent pas. Ce n’est pas un bug, demande si tu dois être invité·e.",
    };
  }, [gate]);

  const neutralCopy = useMemo(() => {
    if (!gate) {
      return {
        title: "On n’a pas pu vérifier",
        body: "Petit souci technique ou réseau. Réessaie. Souvent ce n’est toujours pas un bug, juste le lien ou les règles du plan.",
      };
    }
    if (gate.gate === "not_found") {
      return {
        title: "Lien plus bon",
        body: "Soit le plan est parti, soit l’URL est fausse. Demande un nouveau lien, ça arrive tout le temps.",
      };
    }
    if (gate.gate === "unconfigured") {
      return {
        title: "Vérif pas dispo",
        body: "Le site ne peut pas lire les règles du plan pour l’instant. Réessaie plus tard ou ouvre depuis l’app.",
      };
    }
    if (gate.gate === "network" || gate.gate === "error") {
      return {
        title: "Ça n’a pas répondu",
        body: "Réessaie dans une minute. Si ça bloque encore, demande à l’hôte si tu es dans les critères (âge, etc.).",
      };
    }
    return {
      title: "Bloqué pour l’instant",
      body: "Réessaie. Le plus souvent c’est le lien ou une règle du plan, pas un bug WeOut.",
    };
  }, [gate]);

  return (
    <section
      className="relative min-h-[100svh] flex flex-col pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
      aria-busy={phase === "loading"}
    >
      <PlanBackdrop />
      <div className="container-narrow mx-auto w-full max-w-md flex flex-col flex-1 justify-center">
        {phase === "loading" ? (
          <div className="text-center space-y-4 py-16">
            <div className="mx-auto h-10 w-10 rounded-full border-2 border-accent/35 border-t-accent animate-spin" />
            <p className="text-muted-foreground text-sm">Un instant…</p>
          </div>
        ) : null}

        {phase === "age" ? (
          <div className={`${cardClass} space-y-4`}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Plan
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Ton année de naissance</h1>
            <PlanHint short />
            <p className="text-sm text-muted-foreground">
              Juste pour voir si l’âge du plan te correspond. Ça reste dans ton navigateur, sur cet appareil.
            </p>
            <form onSubmit={submitBirthYear} className="space-y-3">
              <label className="block text-sm font-medium text-foreground" htmlFor="weout-birth-year">
                Année
              </label>
              <input
                id="weout-birth-year"
                type="number"
                inputMode="numeric"
                min={1900}
                max={new Date().getFullYear()}
                placeholder="2002"
                value={birthInput}
                onChange={(e) => setBirthInput(e.target.value)}
                className="w-full h-12 rounded-xl border border-input bg-background/80 px-4 text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button type="submit" className="w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold">
                OK
              </Button>
            </form>
            <SocialButtonsRow />
            <p className="text-center text-sm">
              <Link to="/" className="text-muted-foreground hover:text-accent underline underline-offset-4">
                Accueil WeOut
              </Link>
            </p>
          </div>
        ) : null}

        {phase === "eligible_ios" ? (
          <div className={`${cardClass} space-y-5 text-center`}>
            <h1 className="text-2xl font-bold tracking-tight">Go, tu peux y aller</h1>
            <p className="text-sm text-muted-foreground">Ouvre dans l’app. Pas d’app ? TestFlight, c’est iPhone et iPad.</p>
            <Button
              asChild
              className="w-full h-14 rounded-2xl text-base font-bold bg-accent text-accent-foreground shadow-[0_12px_40px_hsl(var(--glow-accent)/0.32)]"
            >
              <a href={universalUrl} rel="noopener noreferrer">
                Ouvrir WeOut
              </a>
            </Button>
            <div className="rounded-xl border border-accent/25 bg-accent/[0.07] px-4 py-3 text-left text-sm">
              <p className="font-medium text-foreground mb-2">TestFlight (iOS)</p>
              <Button variant="outline" asChild className="w-full rounded-full border-accent/40 h-11">
                <a href={TESTFLIGHT_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Télécharger la bêta
                </a>
              </Button>
            </div>
            <SocialButtonsRow />
            <Link to="/" className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4 block">
              Accueil
            </Link>
          </div>
        ) : null}

        {phase === "eligible_android" || phase === "eligible_other" ? (
          <div className={`${cardClass} space-y-4 text-center`}>
            <h1 className="text-2xl font-bold tracking-tight">
              {phase === "eligible_android" ? "Tu es sur Android" : "Depuis ce navigateur"}
            </h1>
            <p className="text-sm text-muted-foreground">
              La bêta publique passe par TestFlight (iPhone). Pas un bug. L’app Android arrive, promis.
            </p>
            <Button
              asChild
              variant="secondary"
              className="w-full h-11 rounded-full font-semibold border border-border/50 bg-muted/20"
            >
              <a href={universalUrl} rel="noopener noreferrer">
                Ouvrir le lien
              </a>
            </Button>
            <SocialButtonsRow />
            <Button asChild className="w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold">
              <Link to="/">Accueil WeOut</Link>
            </Button>
          </div>
        ) : null}

        {phase === "ineligible" ? (
          <div className={`${cardClass} space-y-4`}>
            <h1 className="text-2xl font-bold tracking-tight">{ineligibleCopy.title}</h1>
            <PlanHint short />
            <p className="text-sm text-muted-foreground leading-snug">{ineligibleCopy.body}</p>
            <Button asChild className="h-11 w-full rounded-full bg-primary text-primary-foreground font-semibold">
              <Link to="/">Autres sorties</Link>
            </Button>
            {platform === "ios" ? (
              <Button variant="outline" asChild className="h-11 w-full rounded-full border-accent/40">
                <a href={TESTFLIGHT_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  TestFlight (iOS)
                </a>
              </Button>
            ) : null}
            <SocialButtonsRow />
            {platform === "android" ? (
              <p className="text-xs text-center text-muted-foreground">
                Actus Android :{" "}
                <a href={INSTAGRAM_PROFILE_LINK} className="text-accent underline underline-offset-2">
                  @weoutsocial
                </a>
              </p>
            ) : null}
          </div>
        ) : null}

        {phase === "neutral" ? (
          <div className={`${cardClass} space-y-4`}>
            <h1 className="text-2xl font-bold tracking-tight">{neutralCopy.title}</h1>
            <PlanHint />
            <p className="text-sm text-muted-foreground leading-snug">{neutralCopy.body}</p>
            <Button asChild className="h-11 w-full rounded-full bg-primary text-primary-foreground font-semibold">
              <Link to="/">Accueil</Link>
            </Button>
            <SocialButtonsRow />
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4 w-full text-center pt-1"
              onClick={() => void runGate()}
            >
              Réessayer
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PlanShareLanding;
