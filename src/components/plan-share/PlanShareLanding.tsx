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

/** Encadré commun : réduit les « c’est un bug » — la cause la plus fréquente est le non-respect des critères du plan. */
function PlanReassuranceCard({ variant = "default" }: { variant?: "default" | "compact" }) {
  const isCompact = variant === "compact";
  return (
    <div
      className="rounded-xl border border-accent/30 bg-accent/[0.08] px-4 py-3.5 text-sm leading-relaxed shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      role="note"
    >
      <p className="font-semibold text-foreground mb-1.5">
        {isCompact ? "Ce n’est pas un bug WeOut" : "Très probablement : ce n’est pas un bug"}
      </p>
      <p className="text-muted-foreground">
        {isCompact ? (
          <>
            L’accès à un plan suit des règles (âge, visibilité, dates…). Si tu es sur cet écran, c’est en général que{" "}
            <strong className="text-foreground/90">ces règles ne sont pas remplies pour toi</strong> — ou plus — pour
            cette sortie. Ce comportement est <strong className="text-foreground/90">attendu</strong>, pas une panne de
            l’app.
          </>
        ) : (
          <>
            Le site et l’app fonctionnent en principe correctement. Dans la grande majorité des cas, tu vois cet
            écran parce que <strong className="text-foreground/90">le créateur du plan a défini des critères</strong>{" "}
            (souvent une <strong className="text-foreground/90">tranche d’âge</strong>, une visibilité, des dates, ou
            d’autres règles) et que{" "}
            <strong className="text-foreground/90">ta situation ne les remplit pas</strong> pour cette sortie — ou
            parce que le lien n’est plus actif. Ce n’est pas une erreur technique à signaler comme « bug » : c’est le
            cadre choisi pour ce plan.
          </>
        )}
      </p>
    </div>
  );
}

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
      setDocumentMeta(
        "Ce plan ne correspond pas à ton profil | WeOut",
        "Souvent lié aux critères du plan (âge, etc.) — ce n’est en général pas un bug.",
      );
      return;
    }
    setDocumentMeta(
      "WeOut — Lien de plan",
      "Souvent lié aux critères du plan ou au lien — ce n’est en général pas un bug.",
    );
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
          ? "Ce plan est réservé à une tranche d’âge : tu es en dessous de l’âge minimum fixé par l’organisateur·ice. Ce n’est pas un bug : c’est une règle du plan, comme en soirée ou en asso quand une entrée est « majeurs seulement » ou avec une limite d’âge."
          : "Ce plan est réservé à une tranche d’âge : tu es au-dessus de la limite prévue par l’organisateur·ice. Ce n’est pas un bug : c’est une condition volontaire pour ce groupe ou cette sortie.",
      };
    }
    if (gate.gate === "cancelled") {
      return {
        title: "Ce plan n’est plus d’actualité",
        body: "L’organisateur·ice l’a fermé ou annulé. Ce n’est pas un bug : le lien ne mène plus à une sortie active. Ça arrive souvent quand les dates ou le lieu changent.",
      };
    }
    if (gate.gate === "private") {
      return {
        title: "Ce plan est privé",
        body: "Seules les personnes prévues par l’hôte peuvent le rejoindre dans l’app. Ce n’est pas un bug : c’est une sortie fermée. Demande une invitation si tu penses devoir faire partie du groupe.",
      };
    }
    return {
      title: "Ce plan ne correspond pas à ton profil",
      body: "Les critères fixés pour ce plan ne correspondent pas à ta situation ici. Ce n’est pas un bug : c’est le cadre défini par l’organisateur·ice (âge, visibilité, autre règle côté WeOut).",
    };
  }, [gate]);

  const neutralCopy = useMemo(() => {
    if (!gate) {
      return {
        title: "On n’a pas pu confirmer ce lien tout de suite",
        body: "Soit la connexion ou le service a calé, soit la vérification automatique n’est pas disponible. Réessaie dans un instant. Si ça persiste, ce n’est pas forcément un bug : dans beaucoup de cas, c’est aussi que le plan a des critères (âge, etc.) que nous n’avons pas pu vérifier depuis le navigateur — l’app pourra être plus précise une fois installée.",
      };
    }
    if (gate.gate === "not_found") {
      return {
        title: "Ce lien ne mène plus à un plan actif",
        body: "Le plan a peut-être été supprimé, le lien est incomplet ou expiré. Ce n’est en général pas un bug WeOut : soit le plan n’existe plus, soit l’URL ne correspond plus. Demande un nouveau lien à la personne qui t’a invité·e.",
      };
    }
    if (gate.gate === "unconfigured") {
      return {
        title: "Vérification indisponible pour l’instant",
        body: "Le site n’a pas pu interroger les règles de ce plan automatiquement. Ce n’est pas chez toi « une panne » obligatoire : souvent, soit la configuration côté serveur n’est pas encore branchée ici, soit le plan a des critères (âge, etc.) qu’on ne peut pas tout vérifier depuis le web. Réessaie plus tard ou ouvre le lien depuis l’app si tu l’as déjà.",
      };
    }
    if (gate.gate === "network" || gate.gate === "error") {
      return {
        title: "Impossible de vérifier ce plan pour l’instant",
        body: "Un souci réseau ou temporaire nous empêche de lire les infos du plan. Ce n’est pas la preuve d’un bug côté toi : réessaie. Si ça continue, ce peut aussi être que le plan a des critères (tranche d’âge, etc.) — dans le doute, demande à l’organisateur·ice si tu es bien dans les conditions.",
      };
    }
    return {
      title: "Impossible de vérifier ce plan pour l’instant",
      body: "Réessaie dans quelques instants. Ce message n’indique pas tout seul un « bug » : le plus fréquent, c’est un critère du plan (âge, visibilité, lien plus valide) ou une vérif qui n’a pas abouti depuis le site.",
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
            <PlanReassuranceCard variant="compact" />
            <p className="text-muted-foreground leading-relaxed">
              Pour savoir si tu entres dans les critères du plan (souvent la{" "}
              <strong className="text-foreground">tranche d’âge</strong>), indique ton{" "}
              <strong className="text-foreground">année de naissance</strong>. Elle reste sur ton appareil (session du
              navigateur), uniquement               pour cette vérification, pour respecter les règles fixées par l’organisateur·ice.
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
            <p className="text-muted-foreground leading-relaxed text-center text-sm">
              Ce n’est <strong className="text-foreground">pas un bug</strong> : sur Android, la bêta publique passe
              aujourd’hui par <strong className="text-foreground">TestFlight</strong> (iPhone / iPad seulement).
              L’app Android arrive — merci pour ta patience. Tu peux suivre les annonces sur les réseaux ou retourner
              sur le site.
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
            <PlanReassuranceCard variant="compact" />
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
            <PlanReassuranceCard />
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
