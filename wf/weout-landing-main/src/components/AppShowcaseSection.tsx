import socialSceneImage from "@/assets/social-scene.jpg";
import appScreenshot from "@/assets/app-screenshot.png";

const AppShowcaseSection = () => {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      {/* Background kept subtle to let photography stand out */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container-wide relative z-10">
        {/* Section header - moments réels */}
        <div className="text-left md:text-center mb-16 md:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent mb-4">
            Des moments qui n'existent pas sur ton feed
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight max-w-2xl">
            Des vraies soirées,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              pas juste des stories.
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            WeOut, c&apos;est les messages qui se transforment en terrasse, les DM en
            soirées et les &quot;on se voit un jour&quot; en rendez-vous posés dans la ville.
          </p>
        </div>

        {/* Main visual layout: Phone mockup + Social scene */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">
          
          {/* Phone Mockup - Left side with REAL screenshot */}
          <div className="relative z-20 lg:-mr-16 flex-shrink-0">
            {/* Phone frame */}
            <div className="relative w-[280px] md:w-[320px] h-[580px] md:h-[660px] rounded-[3rem] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] p-2 shadow-2xl">
              {/* Phone inner bezel */}
              <div className="relative w-full h-full rounded-[2.5rem] bg-background overflow-hidden border border-border/50">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10" />
                
                {/* Real App Screenshot */}
                <img
                  src={appScreenshot}
                  alt="Interface réelle de l'application WeOut"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Floating notification - stays above the phone */}
            <div className="absolute -right-4 top-32 md:-right-8 p-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-xl animate-fade-in z-30" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <span className="text-sm">✨</span>
                </div>
                <div>
                  <p className="text-xs font-semibold">Marie t'invite !</p>
                  <p className="text-[10px] text-muted-foreground">Apéro ce soir • 20h30</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Scene Image - Right side */}
          <div className="relative lg:w-[55%] lg:-ml-8">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-10 lg:w-1/3" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30 z-10" />
              
              <img
                src={socialSceneImage}
                alt="Groupe d'amis qui s'amusent ensemble en soirée"
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                loading="lazy"
              />

              {/* Overlay content */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="p-4 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/30 max-w-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background" />
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent/60 border-2 border-background" />
                      <div className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium">+12</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        14 personnes ont dit &quot;je viens&quot; ce soir
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Une app qui sert à sortir, pas à scroller. Tu vois qui est chaud, où et quand.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
            <div className="absolute -bottom-4 right-1/4 w-24 h-24 rounded-full bg-primary/15 blur-xl" />
          </div>
        </div>

        {/* Photo strip of real moments below */}
        <div className="mt-16 md:mt-24">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Moments de la ville
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="relative h-28 md:h-32 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80&auto=format&fit=crop"
                alt="Groupe d'amis sur une terrasse en ville"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative h-28 md:h-32 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1561489429-3543e2d4d4b4?w=800&q=80&auto=format&fit=crop"
                alt="Bar animé avec verres et néons"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative h-28 md:h-32 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80&auto=format&fit=crop"
                alt="Amis qui rient ensemble dans la rue"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative h-28 md:h-32 rounded-2xl overflow-hidden hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80&auto=format&fit=crop"
                alt="Vue de rue nocturne avec lumières de ville"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
