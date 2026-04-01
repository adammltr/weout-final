import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InviteLandingHero from "@/components/InviteLandingHero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import AppShowcaseSection from "@/components/AppShowcaseSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CommunitySection from "@/components/CommunitySection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import { InstallWeOutModalProvider } from "@/contexts/InstallWeOutModalContext";
import { useInviteMode } from "@/contexts/InviteModeContext";

const Index = () => {
  const { isInviteLandingPage } = useInviteMode();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <InstallWeOutModalProvider>
        <Header />
        {isInviteLandingPage ? (
          <InviteLandingHero />
        ) : (
          <>
            <HeroSection />
            <ProblemSection />
            <SolutionSection />
            <AppShowcaseSection />
            <BenefitsSection />
            <TestimonialsSection />
            <FAQSection />
            <CommunitySection />
            <section id="cta">
              <FinalCTASection />
            </section>
          </>
        )}
        <Footer />
      </InstallWeOutModalProvider>
    </main>
  );
};

export default Index;
