import weoutLogo from "@/assets/weout-logo-1.png";
import { useInstallWeOutModal } from "@/contexts/InstallWeOutModalContext";
import { cn } from "@/lib/utils";

type PrimaryInstallButtonProps = {
  className?: string;
  size?: "large" | "default" | "compact";
  /** Libellé du bouton (défaut : installation iOS explicite) */
  label?: string;
  /** Infobulle native */
  title?: string;
};

export function PrimaryInstallButton({
  className,
  size = "large",
  label = "Installer sur iOS",
  title = "WeOut sur iPhone et iPad (TestFlight). Android prévu plus tard.",
}: PrimaryInstallButtonProps) {
  const { openInstallModal } = useInstallWeOutModal();

  const sizeClasses =
    size === "large"
      ? "px-9 sm:px-10 py-4 text-base sm:text-[1.05rem] font-semibold tracking-tight gap-3.5 min-h-[56px] [&_img]:h-8 [&_img]:w-8 sm:[&_img]:h-9 sm:[&_img]:w-9"
      : size === "compact"
        ? "px-3 py-2 text-xs gap-2 min-h-[40px] [&_img]:h-6 [&_img]:w-6"
        : "px-5 py-2.5 text-sm gap-2.5 min-h-[44px] [&_img]:h-7 [&_img]:w-7";

  const outerGlow =
    size === "large"
      ? "shadow-[0_0_40px_hsl(25_100%_52%/0.52),0_0_72px_hsl(275_90%_58%/0.28),0_12px_32px_rgba(0,0,0,0.38)]"
      : size === "default"
        ? "shadow-[0_0_28px_hsl(25_100%_52%/0.45),0_0_52px_hsl(275_90%_58%/0.22),0_8px_24px_rgba(0,0,0,0.32)]"
        : "shadow-[0_0_20px_hsl(25_100%_52%/0.4),0_0_36px_hsl(275_90%_58%/0.18),0_6px_18px_rgba(0,0,0,0.28)]";

  const innerDepth =
    size === "large"
      ? "shadow-[0_4px_0_rgba(0,0,0,0.18),0_12px_28px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.38)]"
      : size === "default"
        ? "shadow-[0_3px_0_rgba(0,0,0,0.16),0_8px_20px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.32)]"
        : "shadow-[0_2px_0_rgba(0,0,0,0.15),0_6px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.28)]";

  return (
    <span
      className={cn(
        "inline-flex rounded-full p-[1.5px]",
        "[background:linear-gradient(135deg,hsl(48,100%,84%)_0%,hsl(32,100%,58%)_42%,hsl(285,78%,58%)_100%)]",
        outerGlow,
        className,
      )}
    >
      <button
        type="button"
        title={title}
        onClick={openInstallModal}
        className={cn(
          "group relative inline-flex min-w-0 w-full items-center justify-center overflow-hidden rounded-full font-semibold text-white",
          "bg-gradient-to-b from-[hsl(25_98%_58%)] to-[hsl(25_95%_48%)]",
          "ring-1 ring-inset ring-white/35",
          innerDepth,
          "transition-all duration-300 ease-out hover:from-[hsl(25_98%_62%)] hover:to-[hsl(25_95%_52%)]",
          "hover:shadow-[0_4px_0_rgba(0,0,0,0.14),0_16px_40px_hsl(var(--glow-accent)/0.45),inset_0_1px_0_rgba(255,255,255,0.45)]",
          "hover:-translate-y-0.5 active:translate-y-0",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/22 before:via-transparent before:to-transparent before:opacity-70",
          "hover:scale-[1.02] active:scale-[0.98]",
          sizeClasses,
        )}
      >
        <span className="relative z-[1] flex items-center gap-[inherit]">
          <img
            src={weoutLogo}
            alt=""
            className="rounded-[10px] object-cover shrink-0 shadow-md ring-2 ring-white/35"
            width={36}
            height={36}
          />
          <span className="drop-shadow-sm">{label}</span>
        </span>
      </button>
    </span>
  );
}
