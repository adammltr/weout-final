import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Qu'est-ce que je peux faire avec WeOut ?",
    answer: "WeOut te permet d'organiser des sorties entre amis simplement. Tu crées un plan, tu invites qui tu veux, et c'est parti. Pas de friction, pas de discussions interminables.",
  },
  {
    question: "C'est dispo où ?",
    answer: "Les plans privés entre amis fonctionnent partout. Les fonctionnalités de découverte (plans semi-publics, rencontres) sont actuellement en test uniquement à Caen. On ouvre progressivement selon l'usage réel.",
  },
  {
    question: "C'est public ?",
    answer: "Par défaut, tes sorties sont privées et visibles uniquement par les personnes que tu invites. À Caen, tu peux aussi créer des plans semi-publics pour rencontrer de nouvelles personnes.",
  },
  {
    question: "Pourquoi Caen comme zone pilote ?",
    answer: "On préfère tester en conditions réelles sur une zone concentrée avant de déployer plus large. Ça nous permet d'améliorer l'expérience sur des retours concrets.",
  },
  {
    question: "Quand est-ce que ça arrive dans ma ville ?",
    answer: "L'expansion dépend de l'usage réel et des retours utilisateurs. Rejoins le Discord pour être informé des prochaines ouvertures.",
  },
  {
    question: "C'est gratuit ?",
    answer: "Oui, WeOut est gratuit. On ne vend pas tes données et il n'y a pas de pub.",
  },
];

const FAQSection = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>
      
      <div className="container-narrow relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            FAQ
          </span>
          <h2 className="section-title">
            Questions <span className="text-accent">fréquentes</span>.
          </h2>
        </div>

        <Accordion type="single" collapsible className="max-w-xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/40">
              <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline py-5 text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
