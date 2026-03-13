import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";

// Lien Discord modifiable facilement
const DISCORD_INVITE_LINK = "https://discord.gg/Uqjt6N5A";

const Merci = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/15 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container-narrow relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">Bêta confirmée</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Tu es sur la <span className="text-accent">liste</span>.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Tu fais partie des premiers à tester WeOut.<br />
          On te prévient dès que c'est prêt.
        </p>

        {/* Discord CTA */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <a
            href="https://discord.gg/azSbYCFmS3"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta group inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Rejoindre le Discord
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <p className="text-sm text-muted-foreground mt-6">
            Rejoins la communauté pour suivre l'avancement 🚀
          </p>
        </div>

        {/* Reassurance */}
        <div className="mt-12 pt-8 border-t border-white/10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <p className="text-xs text-muted-foreground">
            Pas de spam, promis. Juste les infos importantes. 🤙
          </p>
        </div>

        {/* Back link */}
        <Link 
          to="/" 
          className="inline-block mt-8 text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    </main>
  );
};

export default Merci;
