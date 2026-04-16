import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, MessageCircle, Smartphone } from "lucide-react";
import {
  DISCORD_INVITE_LINK,
  INSTAGRAM_GROUP_LINK,
  TESTFLIGHT_URL,
} from "@/lib/weOutAppLinks";

export { DISCORD_INVITE_LINK, INSTAGRAM_GROUP_LINK, TESTFLIGHT_URL } from "@/lib/weOutAppLinks";

type InstallWeOutModalContextValue = {
  openInstallModal: () => void;
};

const InstallWeOutModalContext = createContext<InstallWeOutModalContextValue | null>(null);

export function useInstallWeOutModal() {
  const ctx = useContext(InstallWeOutModalContext);
  if (!ctx) {
    throw new Error("useInstallWeOutModal must be used within InstallWeOutModalProvider");
  }
  return ctx;
}

export function InstallWeOutModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const openInstallModal = useCallback(() => {
    setStep(1);
    setOpen(true);
  }, []);

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) {
      setTimeout(() => setStep(1), 200);
    }
  }, []);

  const value = useMemo(() => ({ openInstallModal }), [openInstallModal]);

  return (
    <InstallWeOutModalContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md rounded-2xl border-border/50 bg-card/95 backdrop-blur-xl p-6 sm:p-8">
          {step === 1 ? (
            <>
              <DialogHeader className="text-center sm:text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 border border-accent/25">
                  <Smartphone className="h-6 w-6 text-accent" aria-hidden />
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight">
                  Installe l&apos;app via TestFlight
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                  Rejoins la bêta en quelques secondes. Des centaines de personnes testent déjà WeOut. Sois
                  dans le prochain groupe à sortir ce soir.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 flex flex-col gap-3">
                <Button
                  asChild
                  className="h-12 rounded-full bg-accent text-accent-foreground font-semibold shadow-[0_8px_30px_hsl(var(--glow-accent)/0.35)] hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <a href={TESTFLIGHT_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ouvrir TestFlight
                  </a>
                </Button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors flex items-center justify-center gap-1 py-2"
                >
                  Étape suivante : la communauté
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader className="text-center sm:text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 border border-primary/25">
                  <MessageCircle className="h-6 w-6 text-primary" aria-hidden />
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight">
                  Rejoins la communauté
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                  Rejoins la communauté pour discuter, proposer des idées et signaler des bugs. On construit WeOut
                  avec toi, en direct.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 flex flex-col gap-2.5">
                <Button
                  variant="outline"
                  asChild
                  className="h-11 rounded-full border-border/60 bg-muted/30 text-foreground hover:bg-muted/50 font-medium"
                >
                  <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
                    <svg className="mr-2 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                    </svg>
                    Discord
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="h-11 rounded-full border-border/60 bg-muted/30 text-foreground hover:bg-muted/50 font-medium"
                >
                  <a href={INSTAGRAM_GROUP_LINK} target="_blank" rel="noopener noreferrer">
                    <svg className="mr-2 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </a>
                </Button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  ← Retour à l&apos;installation
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </InstallWeOutModalContext.Provider>
  );
}
