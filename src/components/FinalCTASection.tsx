import { PrimaryInstallButton } from "@/components/PrimaryInstallButton";

const FinalCTASection = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-[150px]" />

      <div className="container-narrow relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 mb-10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/60" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Prêt à sortir{" "}
            <span className="text-accent">ce soir à Caen ?</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8 leading-relaxed">
            Installe l&apos;app, rejoins le mouvement. La communauté t&apos;attend pour partager des plans et des idées.
          </p>

          <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
            <PrimaryInstallButton />
            <p className="text-sm text-muted-foreground leading-relaxed px-2">
              Rejoins aussi la communauté pour proposer des idées et rencontrer du monde
            </p>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            Un projet vivant, construit avec toi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
