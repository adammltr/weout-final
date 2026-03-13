const INSTAGRAM_COMMUNITY_LINK = "https://ig.me/j/Abbq3hHQWv0LUGOG/";
const DISCORD_INVITE_LINK = "https://discord.gg/azSbYCFmS3";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Gradient orbs background (subtle, kept minimal) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[520px] h-[520px] rounded-full bg-primary/18 blur-[130px] animate-pulse-glow" />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[460px] h-[460px] rounded-full bg-accent/14 blur-[110px] animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-[1.25fr_minmax(0,1fr)]">
          {/* Left: narrative + CTA */}
          <div className="max-w-xl">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/15 to-primary/10 border border-accent/30 mb-6 animate-fade-in backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-foreground/90">
                Bêta privée • Lien d'installation réservé à la communauté
              </span>
            </div>

            {/* Headline: emotion first */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-5 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Ce soir, tu{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                sors vraiment
              </span>{" "}
              avec des gens autour de toi.
            </h1>

            {/* Subheadline: vivid scene + SEO keywords */}
            <p
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md mb-8 animate-fade-in leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              WeOut transforme les "On se fait un truc un de ces quatre ?" en vrais plans de
              sorties en ville, simples à lancer, avec tes amis comme avec de nouvelles
              rencontres, notamment pour la vie étudiante à Caen.
            </p>

            {/* Primary CTA + reassurance */}
            <div
              className="flex flex-col items-start gap-4 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Primary CTA - Instagram Community as install funnel */}
                <a
                  href={INSTAGRAM_COMMUNITY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-4 bg-accent text-accent-foreground font-semibold rounded-full transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
                  style={{ boxShadow: "0 10px 40px hsl(var(--glow-accent) / 0.32)" }}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Recevoir le lien d'installation
                </a>

                {/* Secondary CTA - Discord (retours + communauté) */}
                <a
                  href={DISCORD_INVITE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 font-medium rounded-full transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/45 focus:ring-offset-2 focus:ring-offset-background border border-primary/30 text-foreground/90"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.16), hsl(var(--accent) / 0.1), hsl(var(--primary) / 0.22))",
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                  </svg>
                  Rejoindre la communauté
                </a>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
                On t'envoie le lien d'installation dès l'ouverture dans ta zone. Pas de spam, juste les infos utiles.
              </p>
            </div>
          </div>

          {/* Right: asymmetric "moments" collage to feel alive */}
          <div className="hidden sm:block">
            <div className="relative h-[360px] md:h-[420px]">
              {/* Main card */}
              <div className="absolute top-4 right-2 w-64 md:w-72 glass-card rounded-3xl p-5 rotate-[-4deg]">
                <p className="text-xs font-medium text-accent mb-2 uppercase tracking-wide">
                  Ce soir avec WeOut
                </p>
                <p className="text-sm md:text-base text-foreground mb-4 leading-relaxed">
                  20h32 — Tu postes &quot;Bar terrasse, qui est chaud ?&quot;. À 20h41,{" "}
                  <span className="text-accent font-semibold">6 amis</span> ont répondu.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background" />
                    <div className="w-8 h-8 rounded-full bg-secondary border-2 border-background" />
                    <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-medium">
                      +3
                    </div>
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    Plan confirmé • 21h15
                  </span>
                </div>
              </div>

              {/* Secondary card */}
              <div className="absolute bottom-4 left-0 w-60 glass-card rounded-3xl p-4 rotate-3">
                <p className="text-[11px] text-muted-foreground mb-2">
                  &quot;Nouvelle en ville, quelqu&apos;un pour tester ce nouveau bar ?&quot;
                </p>
                <p className="text-xs text-foreground">
                  WeOut te connecte à des gens qui veulent juste{" "}
                  <span className="text-accent font-medium">sortir, sans malaise</span>.
                </p>
              </div>

              {/* Accent pill */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1/3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-[11px] font-medium text-accent">
                    Plus de groupes morts, des vraies soirées
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
