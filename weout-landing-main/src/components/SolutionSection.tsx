const steps = [
  {
    number: "01",
    title: "Tu installes WeOut",
    description: "On t'envoie le lien d'installation via la communauté. Deux minutes, et c'est sur ton tel.",
  },
  {
    number: "02",
    title: "Tu lances un plan",
    description:
      "\"Apéro demain ?\", \"Basket au city ?\" — tu postes, tu choisis qui voit, et c'est tout.",
  },
  {
    number: "03",
    title: "Vous sortez pour de vrai",
    description:
      "Les réponses arrivent, tu sais qui vient, où et quand. Finis les groupes morts, place aux vraies soirées.",
  },
];

const SolutionSection = () => {
  return (
    <section
      className="section-spacing relative overflow-hidden"
      aria-labelledby="weout-how-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>
      
      <div className="container-narrow relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent mb-4">
            Comment ça marche concrètement
          </span>
          <h2 id="weout-how-heading" className="section-title">
            3 actions pour passer{" "}
            <span className="text-accent">de l'envie à la sortie</span>.
          </h2>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex items-start gap-6 p-7 rounded-2xl bg-gradient-to-r from-card/60 to-card/30 border border-border/40 hover:border-accent/30 transition-all group"
            >
              {/* Step number with gradient background */}
              <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/20 items-center justify-center shrink-0 group-hover:from-accent/30 group-hover:to-primary/30 transition-all">
                <span className="text-lg font-bold text-accent">{step.number}</span>
              </div>
              
              {/* Mobile number */}
              <div className="sm:hidden w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-primary/15 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-accent">{step.number}</span>
              </div>
              
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
