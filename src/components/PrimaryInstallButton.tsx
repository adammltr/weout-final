import weoutLogo from "@/assets/weout-logo-1.png";
import { useInstallWeOutModal } from "@/contexts/InstallWeOutModalContext";
import { cn } from "@/lib/utils";

type PrimaryInstallButtonProps = {
  className?: string;
  size?: "large" | "default" | "compact";
};

export function PrimaryInstallButton({ className, size = "large" }: PrimaryInstallButtonProps) {
  const { openInstallModal } = useInstallWeOutModal();

  const sizeClasses =
    size === "large"
      ? "px-9 sm:px-10 py-4 text-base sm:text-[1.05rem] font-semibold tracking-tight gap-3.5 min-h-[56px] [&_img]:h-8 [&_img]:w-8 sm:[&_img]:h-9 sm:[&_img]:w-9"
      : size === "compact"
        ? "px-3 py-2 text-xs gap-2 min-h-[40px] [&_img]:h-6 [&_img]:w-6"
        : "px-5 py-2.5 text-sm gap-2.5 min-h-[44px] [&_img]:h-7 [&_img]:w-7";

  const premiumLarge =
    size === "large"
      ? [
          "relative overflow-hidden",
          "bg-gradient-to-b from-[hsl(25_98%_58%)] to-[hsl(25_95%_48%)]",
          "text-white shadow-[0_4px_0_rgba(0,0,0,0.18),0_16px_48px_hsl(var(--glow-accent)/0.55),0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.35)]",
          "ring-1 ring-white/30 ring-inset",
          "hover:from-[hsl(25_98%_62%)] hover:to-[hsl(25_95%_52%)]",
          "hover:shadow-[0_4px_0_rgba(0,0,0,0.15),0_20px_56px_hsl(var(--glow-accent)/0.6),0_10px_28px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.45)]",
          "hover:-translate-y-0.5 active:translate-y-0",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:via-transparent before:to-transparent before:opacity-70",
        ]
      : [
          "bg-accent",
          "shadow-[0_10px_40px_hsl(var(--glow-accent)/0.45),0_4px_14px_rgba(0,0,0,0.25)]",
          "hover:shadow-[0_14px_48px_hsl(var(--glow-accent)/0.5),0_6px_20px_rgba(0,0,0,0.2)]",
        ];

  return (
    <button
      type="button"
      onClick={openInstallModal}
      className={cn(
        "group inline-flex items-center justify-center rounded-full font-semibold",
        size === "large" ? "text-white" : "text-accent-foreground",
        "transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        premiumLarge,
        sizeClasses,
        className,
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
        <span className="drop-shadow-sm">Installer WeOut</span>
      </span>
    </button>
  );
}
