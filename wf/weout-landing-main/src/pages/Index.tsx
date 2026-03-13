import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AppShowcaseSection from "@/components/AppShowcaseSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main
      className="min-h-screen overflow-x-hidden"
      role="main"
      id="weout-main"
      aria-label="Page d'accueil WeOut, sorties et rencontres en ville"
    >
      <Header />
      <HeroSection />
      <AppShowcaseSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQSection />
      <section id="cta">
        <FinalCTASection />
      </section>
      <Footer />
    </main>
  );
};

export default Index;
