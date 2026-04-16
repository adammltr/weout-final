import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildPlanUniversalUrl,
  DISCORD_INVITE_LINK,
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
      setDocumentMeta("WeOut — Ouverture du plan…", "Vérification du lien de sortie WeOut.");
      return;
    }
    if (phase === "age") {
      setDocumentMeta("WeOut — Confirmer ton âge", "Indique ton année de naissance pour vérifier si ce plan t’est ouvert.");
      return;
    }
    if (phase.startsWith("eligible")) {
      setDocumentMeta("Rejoins ce plan sur WeOut", "Ouvre le plan dans l’app WeOut ou installe la bêta TestFlight sur iPhone.");
      return;
    }
    if (phase === "ineligible") {
      setDocumentMeta("Ce plan ne correspond pas à ton profil | WeOut", "Ce lien de sortie a des critères définis par l’organisateur.");
      return;
    }
    setDocumentMeta("WeOut — Lien de plan", "Nous n’avons pas pu ouvrir ce plan depuis le navigateur.");
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
        title: "Ce plan ne correspond pas à ton profil",
        body: isYoung
          ? "Ce plan est réservé à une tranche d’âge : tu es en dessous de l’âge minimum fixé par l’organisateur. Ce n’est pas un bug : c’est un cadre qu’iel a choisi pour que le groupe reste cohérent."
          : "Ce plan est réservé à une tranche d’âge : tu es au-dessus de la limite prévue par l’organisateur. Rien d’anormal : chaque sortie a ses règles.",
      };
    }
    if (gate.gate === "cancelled") {
      return {
        title: "Ce plan n’est plus d’actualité",
        body: "L’organisateur l’a fermé ou annulé. Ça arrive souvent quand les dates bougent — ce n’est pas une erreur de ton côté.",
      };
    }
    if (gate.gate === "private") {
      return {
        title: "Ce plan est privé",
        body: "Seules les personnes invitées peuvent le rejoindre dans l’app. Si tu penses devoir y être, demande une invitation à ton hôte.",
      };
    }
    return { title: "Ce plan ne correspond pas à ton profil", body: "Les critères définis par l’organisateur ne correspondent pas à ta situation pour cette sortie." };
  }, [gate]);

  const neutralCopy = useMemo(() => {
    if (!gate) {
      return {
        title: "Impossible de vérifier ce plan pour l’instant",
        body: "Un souci réseau ou de configuration nous empêche de confirmer ce lien. Réessaie plus tard ou explore WeOut autrement.",
      };
    }
    if (gate.gate === "not_found") {
      return {
        title: "Ce lien ne mène plus à un plan actif",
        body: "Le plan a peut-être été retiré ou le lien est incomplet. Ce n’est pas de ta faute : les liens de sortie peuvent changer.",
      };
    }
    return {
      title: "Impossible de vérifier ce plan pour l’instant",
      body: "Réessaie dans quelques instants. En attendant, tu peux découvrir WeOut sur le site ou rejoindre la communauté.",
    };
  }, [gate]);

  return (
    <section
      className="relative min-h-[100svh] flex flex-col pt-24 pb-16 px-4 sm:px-6"
      aria-busy={phase === "loading"}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-card/80" />
      <div className="container-narrow mx-auto w-full max-w-xl flex flex-col flex-1 justify-center">
        {phase === "loading" ? (
          <div className="text-center space-y-4 py-16">
            <div className="mx-auto h-10 w-10 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
            <p className="text-muted-foreground text-sm">Vérification du lien…</p>
          </div>
        ) : null}

        {phase === "age" ? (
          <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-lg">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Critères du plan
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Une petite info pour continuer</h1>
            <p className="text-muted-foreground leading-relaxed">
              Pour vérifier si ce plan t’est ouvert (notamment sur l’âge), indique ton{" "}
              <strong className="text-foreground">année de naissance</strong>. Elle reste sur ton appareil (session
              navigateur), uniquement pour cette vérification.
            </p>
            <form onSubmit={submitBirthYear} className="space-y-4">
              <label className="block text-sm font-medium text-foreground" htmlFor="weout-birth-year">
                Année de naissance
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
                className="w-full h-12 rounded-xl border border-input bg-background px-4 text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button type="submit" className="w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold">
                Continuer
              </Button>
            </form>
            <p className="text-center text-sm">
              <Link to="/" className="text-muted-foreground hover:text-accent underline underline-offset-4">
                Découvrir d&apos;autres sorties
              </Link>
            </p>
          </div>
        ) : null}

        {phase === "eligible_ios" ? (
          <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-lg text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tu peux rejoindre ce plan</h1>
            <p className="text-muted-foreground leading-relaxed">
              Ouvre le lien dans l’app WeOut. Si l’app est installée, iOS basculera tout seul ; sinon tu resteras sur le
              web ou Safari te guidera.
            </p>
            <Button
              asChild
              className="w-full h-14 rounded-2xl text-base font-bold bg-accent text-accent-foreground shadow-[0_12px_40px_hsl(var(--glow-accent)/0.35)]"
            >
              <a href={universalUrl} rel="noopener noreferrer">
                Ouvrir WeOut
              </a>
            </Button>
            <div className="rounded-xl border border-border/40 bg-muted/20 px-4 py-3 text-left text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Pas encore l’app ?</p>
              <p className="mb-3">
                La bêta WeOut s’installe avec <strong className="text-foreground">TestFlight</strong> (réservé aux
                iPhone et iPad).
              </p>
              <Button variant="outline" asChild className="w-full rounded-full border-accent/40">
                <a href={TESTFLIGHT_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Installer via TestFlight
                </a>
              </Button>
            </div>
            <Link to="/" className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4">
              Découvrir d&apos;autres sorties
            </Link>
          </div>
        ) : null}

        {phase === "eligible_android" || phase === "eligible_other" ? (
          <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">
              Tu es sur {phase === "eligible_android" ? "Android" : "ce navigateur"}
            </h1>
            <p className="text-muted-foreground leading-relaxed text-center">
              La bêta publique WeOut passe aujourd’hui par <strong className="text-foreground">TestFlight</strong>{" "}
              (iPhone / iPad). Sur Android, l’app arrive bientôt : merci pour ta patience — en attendant, rejoins la
              communauté pour suivre les annonces.
            </p>
            <Button
              asChild
              variant="secondary"
              className="w-full h-12 rounded-full font-semibold border border-border/60"
            >
              <a href={universalUrl} rel="noopener noreferrer">
                Essayer d&apos;ouvrir le lien WeOut
              </a>
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Si l’app est déjà installée sur ton appareil, ce lien peut quand même t’aider à ouvrir le plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" asChild className="flex-1 rounded-full">
                <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Discord
                </a>
              </Button>
              <Button variant="outline" asChild className="flex-1 rounded-full">
                <a href={INSTAGRAM_PROFILE_LINK} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </Button>
            </div>
            <Button asChild className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold">
              <Link to="/">Retour au site WeOut</Link>
            </Button>
          </div>
        ) : null}

        {phase === "ineligible" ? (
          <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{ineligibleCopy.title}</h1>
            <p className="text-muted-foreground leading-relaxed">{ineligibleCopy.body}</p>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild className="h-12 rounded-full bg-primary text-primary-foreground font-semibold">
                <Link to="/">Découvrir d&apos;autres sorties</Link>
              </Button>
              {platform === "ios" ? (
                <Button variant="outline" asChild className="h-11 rounded-full border-accent/40">
                  <a href={TESTFLIGHT_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Découvrir WeOut (TestFlight, iOS)
                  </a>
                </Button>
              ) : null}
              {platform === "android" ? (
                <p className="text-sm text-muted-foreground pt-1">
                  Sur Android, suis WeOut sur{" "}
                  <a href={INSTAGRAM_PROFILE_LINK} className="text-accent underline underline-offset-2">
                    Instagram
                  </a>{" "}
                  ou{" "}
                  <a href={DISCORD_INVITE_LINK} className="text-accent underline underline-offset-2">
                    Discord
                  </a>{" "}
                  pour être informé·e de la sortie sur le Play Store.
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {phase === "neutral" ? (
          <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{neutralCopy.title}</h1>
            <p className="text-muted-foreground leading-relaxed">{neutralCopy.body}</p>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button asChild className="h-12 rounded-full bg-primary text-primary-foreground font-semibold">
                <Link to="/">Découvrir d&apos;autres sorties</Link>
              </Button>
              <Button variant="outline" asChild className="h-12 rounded-full">
                <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
                  Rejoindre Discord
                </a>
              </Button>
            </div>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4 w-full text-center"
              onClick={() => void runGate()}
            >
              Réessayer la vérification
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PlanShareLanding;
