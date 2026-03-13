import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import weoutLogo from "@/assets/weout-logo-1.png";

const AMBASSADEUR_FORM_LINK = "https://tally.so/r/RGooB9";

const faqItems = [
  {
    question: "Qui peut candidater ?",
    answer:
      "Le programme est ouvert à tous les lycéens et étudiants motivés. Pas besoin d'avoir une grande audience ou une expérience particulière — ce qui compte, c'est ton état d'esprit, ta créativité et ton envie de faire partie de l'aventure WeOut dès le début.",
  },
  {
    question: "Combien de temps dure l'engagement ?",
    answer:
      "Il n'y a pas de durée définie. Tu restes ambassadeur aussi longtemps que tu le souhaites et que tu es actif. On construit ça ensemble, à ton rythme.",
  },
  {
    question: "Quel type de contenu dois-je partager ?",
    answer:
      "Tu es libre ! On encourage la créativité. Tu peux t'inspirer des contenus partagés sur WeOut : sorties entre amis, bons plans, moments de vie... L'idée, c'est de montrer l'ambiance WeOut de façon authentique.",
  },
  {
    question: "Est-ce que c'est rémunéré ?",
    answer:
      "Le programme n'est pas rémunéré directement, mais tu bénéficies d'avantages exclusifs dans l'app, d'une visibilité auprès de la communauté, et d'une expérience enrichissante à ajouter à ton parcours.",
  },
];

const Ambassadeur = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container-narrow py-12 md:py-20">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Retour à l'accueil</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <img
            src={weoutLogo}
            alt="WeOut"
            className="w-16 h-16 rounded-2xl mx-auto mb-6"
          />
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-accent fill-accent" />
            <span className="text-accent font-medium text-sm uppercase tracking-wide">
              Programme Ambassadeur
            </span>
          </div>
          <h1 className="section-title mb-4">Ambassadeurs</h1>
          <p className="section-subtitle max-w-xl mx-auto">
            Rejoins les premiers ambassadeurs WeOut et fais partie de l'aventure
            dès le lancement. Partage ta passion, inspire ta communauté.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mb-20">
          <a
            href={AMBASSADEUR_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta"
          >
            Candidater au programme
          </a>
          <p className="text-sm text-muted-foreground mt-4">
            Quelques minutes suffisent pour postuler
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-8">
            Questions fréquentes
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-border/50"
              >
                <AccordionTrigger className="text-left font-medium py-5 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
};

export default Ambassadeur;
