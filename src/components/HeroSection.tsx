import socialSceneImage from "@/assets/social-scene.png";
import heroPeer1 from "@/assets/hero-peer-1.png";
import heroPeer2 from "@/assets/hero-peer-2.png";
import heroPeer3 from "@/assets/hero-peer-3.png";
import { PrimaryInstallButton } from "@/components/PrimaryInstallButton";
import { MessageCircle, Sparkles, Users } from "lucide-react";

const heroPeers = [
  { src: heroPeer1, alt: "Membre de la communauté WeOut" },
  { src: heroPeer2, alt: "Membre de la communauté WeOut" },
  { src: heroPeer3, alt: "Membres de la communauté WeOut" },
] as const;

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[100svh] flex items-center justify-center pt-20 pb-12 overflow-hidden"
      aria-labelledby="weout-hero-heading"
    >
      {/* Full-bleed real-life background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={socialSceneImage}
          alt="Foule en soirée, mains levées au coucher de soleil, événement et nightlife"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="container-narrow relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Promise Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 border border-accent/40 mb-8 animate-fade-in backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-foreground/90">
              Bêta iOS ouverte : rejoins ceux qui sortent déjà ce soir
            </span>
          </div>

          {/* Headline - inchangé */}
          <h1
            id="weout-hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in [text-shadow:0_1px_2px_rgba(0,0,0,0.4),0_0_12px_rgba(0,0,0,0.25)]"
            style={{ animationDelay: "0.1s" }}
          >
            Sortir à Caen{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.4),0_0_12px_rgba(0,0,0,0.25)]">
              avec tes amis, ce soir.
            </span>
          </h1>

          {/* Subheadline - inchangé */}
          <p
            className="text-lg md:text-xl text-white/95 max-w-lg mx-auto mb-10 animate-fade-in leading-relaxed [text-shadow:0_1px_4px_rgba(0,0,0,0.8),0_0_20px_rgba(0,0,0,0.5)]"
            style={{ animationDelay: "0.2s" }}
          >
            WeOut est l'app pour organiser des sorties entre amis, rencontrer des gens
            et profiter de la nightlife étudiante dans ta ville.
          </p>

          {/* Bloc CTA : bouton premium + carte vitrée pour le reste */}
          <div
            className="flex flex-col items-center w-full max-w-[420px] animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex w-full flex-col items-center gap-1.5 sm:w-auto">
              <PrimaryInstallButton className="w-full sm:w-auto" />
              <p className="mx-auto max-w-[18rem] text-center text-balance text-[11px] sm:text-xs text-white/65 leading-snug [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                Uniquement iPhone et iPad (TestFlight).
                <br />
                Android arrive ensuite.
              </p>
            </div>

            {/* Carte suite du parcours */}
            <div
              className="mt-5 w-full rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.09] to-black/45 backdrop-blur-xl px-5 py-4 sm:px-6 sm:py-5 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
              role="region"
              aria-label="Après l'installation"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/20 border border-accent/25 text-accent">
                  <Sparkles className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-accent/90">
                  Et ensuite ?
                </span>
              </div>

              <p className="text-[15px] sm:text-base leading-snug text-white/92 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                Rejoins aussi la communauté : idées, retours, et des gens qui sortent vraiment, comme toi.
              </p>

              <div className="mt-4 flex items-center gap-3 pt-3 border-t border-white/[0.1]">
                <div className="flex -space-x-2 shrink-0">
                  {heroPeers.map((peer, i) => (
                    <img
                      key={i}
                      src={peer.src}
                      alt={peer.alt}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-black/50 shadow-md"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="flex items-start gap-2 min-w-0">
                  <Users className="h-4 w-4 text-accent/80 shrink-0 mt-0.5" aria-hidden />
                  <p className="text-xs sm:text-[13px] leading-relaxed text-white/75 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                    <span className="text-white/90 font-medium">Déjà des centaines</span> sur la bêta. Les places
                    s&apos;épuisent vite.
                  </p>
                </div>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-[11px] text-white/50">
                <MessageCircle className="h-3.5 w-3.5 shrink-0 text-accent/60" aria-hidden />
                Discord &amp; Instagram en un clic après l&apos;install.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
