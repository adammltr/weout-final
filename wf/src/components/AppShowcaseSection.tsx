import socialSceneImage from "@/assets/social-scene.jpg";
import appScreenshot from "@/assets/app-screenshot.png";

const AppShowcaseSection = () => {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      {/* Large organic background shape */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[900px] bg-gradient-to-br from-accent/8 via-primary/6 to-transparent rounded-[50%] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-accent/15 to-transparent rounded-full blur-[100px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[80px]" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header - more breathing */}
        <div className="text-center mb-20 md:mb-28">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent mb-6">
            L'expérience WeOut
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            Là où les <span className="text-accent">plans</span> deviennent{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">réalité</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Plus qu'une app, une façon de vivre tes soirées.
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
                      <p className="text-sm font-semibold">14 personnes rejoignent ce plan</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Connecte-toi avec des gens qui partagent tes envies de sortir.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
            <div className="absolute -bottom-4 right-1/4 w-24 h-24 rounded-full bg-primary/15 blur-xl" />
          </div>
        </div>

        {/* Feature highlights below - more spacing */}
        <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Plans géolocalisés</h3>
            <p className="text-sm text-muted-foreground">Découvre ce qui se passe près de toi, en temps réel.</p>
          </div>

          <div className="text-center p-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Cercles de confiance</h3>
            <p className="text-sm text-muted-foreground">Sorties privées ou ouvertes, tu décides qui vois quoi.</p>
          </div>

          <div className="text-center p-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent/15 to-primary/15 border border-accent/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Rencontres naturelles</h3>
            <p className="text-sm text-muted-foreground">Finis les matchs qui mènent nulle part.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
