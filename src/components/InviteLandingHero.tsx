import { Link } from "react-router-dom";
import socialSceneImage from "@/assets/social-scene.png";
import heroPeer1 from "@/assets/hero-peer-1.png";
import heroPeer2 from "@/assets/hero-peer-2.png";
import heroPeer3 from "@/assets/hero-peer-3.png";
import { TESTFLIGHT_URL } from "@/contexts/InstallWeOutModalContext";
import { ExternalLink, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const invitePeers = [
  { src: heroPeer1, alt: "Amis qui sortent avec WeOut" },
  { src: heroPeer2, alt: "Amis qui sortent avec WeOut" },
  { src: heroPeer3, alt: "Amis qui sortent avec WeOut" },
] as const;

const InviteLandingHero = () => {
  return (
    <section
      className="relative min-h-[100svh] flex items-center justify-center pt-20 pb-16 overflow-hidden"
      aria-labelledby="weout-invite-hero-heading"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={socialSceneImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 20%, hsl(var(--primary) / 0.35), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 80%, hsl(var(--accent) / 0.2), transparent 50%)",
          }}
        />
      </div>

      <div className="container-narrow relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/45 border border-accent/45 mb-8 animate-fade-in backdrop-blur-sm">
            <Gift className="h-4 w-4 text-accent shrink-0" aria-hidden />
            <span className="text-sm font-medium text-white/95 tracking-tight">
              Invitation personnelle — quelqu&apos;un veut sortir avec toi
            </span>
          </div>

          <h1
            id="weout-invite-hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6 animate-fade-in [text-shadow:0_1px_2px_rgba(0,0,0,0.45),0_0_20px_rgba(0,0,0,0.35)]"
            style={{ animationDelay: "0.08s" }}
          >
            Tu as été invité sur{" "}
            <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent [text-shadow:none]">
              WeOut
            </span>
            {" !"}
          </h1>

          <p
            className="text-lg md:text-xl text-white/95 max-w-lg mx-auto mb-10 animate-fade-in leading-relaxed [text-shadow:0_1px_4px_rgba(0,0,0,0.75)]"
            style={{ animationDelay: "0.16s" }}
          >
            Rejoins tes amis pour tes prochaines sorties. Moins de blabla, plus de réel.
          </p>

          <div
            className="flex flex-col items-stretch w-full max-w-md animate-fade-in gap-4"
            style={{ animationDelay: "0.24s" }}
          >
            <Button
              asChild
              className="h-14 sm:h-16 rounded-2xl text-base sm:text-lg font-bold bg-accent text-accent-foreground shadow-[0_12px_40px_hsl(var(--glow-accent)/0.45)] hover:bg-accent/92 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/10"
            >
              <a href={TESTFLIGHT_URL} target="_blank" rel="noopener noreferrer" className="gap-2.5">
                <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" aria-hidden />
                Télécharger WeOut sur TestFlight
              </a>
            </Button>

            <div
              className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.1] to-black/50 backdrop-blur-xl px-5 py-5 sm:px-6 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
              role="region"
              aria-label="Après installation"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/25 border border-primary/35 text-primary">
                  <Sparkles className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">
                  En 2 minutes sur iPhone
                </span>
              </div>
              <p className="text-[15px] sm:text-base leading-snug text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                Installe la bêta, ouvre l&apos;app : ton invitation est déjà prise en compte. Prépare tes prochains
                plans sans groupe WhatsApp interminable.
              </p>
              <div className="mt-4 flex items-center gap-3 pt-3 border-t border-white/[0.1]">
                <div className="flex -space-x-2 shrink-0">
                  {invitePeers.map((peer, i) => (
                    <img
                      key={i}
                      src={peer.src}
                      alt={peer.alt}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-black/50 shadow-md"
                      loading="lazy"
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-[13px] text-white/75 leading-relaxed text-left [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
                  Rejoins la bêta : des centaines de personnes organisent déjà leurs soirées avec WeOut.
                </p>
              </div>
            </div>

            <p className="text-center pt-1">
              <Link
                to="/"
                className="text-sm text-white/55 hover:text-white/85 underline underline-offset-4 decoration-white/25 hover:decoration-white/50 transition-colors"
              >
                Découvrir le site WeOut
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InviteLandingHero;
