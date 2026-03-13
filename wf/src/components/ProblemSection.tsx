const problems = [
  {
    title: "Toujours les mêmes",
    description: "Tu sors qu'avec ton groupe de base, même si t'aimerais varier.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    title: "Personne répond",
    description: "T'envoies un message. Silence radio pendant 3 jours.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    title: "Groupes morts",
    description: "200 messages pour un plan qui capote. Classique.",
    gradient: "from-primary/15 to-accent/10",
  },
  {
    title: "Stories passives",
    description: "Tu vois les autres sortir, mais t'es jamais invité.",
    gradient: "from-accent/15 to-primary/10",
  },
];

const ProblemSection = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-background pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px]" />
      
      <div className="container-narrow relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            Le problème
          </span>
          <h2 className="section-title">
            Sortir devrait pas être<br />
            <span className="text-muted-foreground">aussi compliqué.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${problem.gradient} border border-border/30 hover:border-border/60 transition-all group overflow-hidden`}
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
