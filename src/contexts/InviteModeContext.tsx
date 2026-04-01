import { createContext, useContext, type ReactNode } from "react";

export type InviteModeContextValue = {
  /** Code présent dans l’URL (paramètre ref ou /ref?code=). */
  activeInviteCodeFromUrl: string | null;
  /** Accueil ou /ref avec code dans l’URL : afficher la landing invitation. */
  isInviteLandingPage: boolean;
};

const InviteModeContext = createContext<InviteModeContextValue | null>(null);

export function useInviteMode(): InviteModeContextValue {
  const ctx = useContext(InviteModeContext);
  if (!ctx) {
    throw new Error("useInviteMode must be used within InviteModeContext.Provider");
  }
  return ctx;
}

export function InviteModeProvider({
  value,
  children,
}: {
  value: InviteModeContextValue;
  children: ReactNode;
}) {
  return <InviteModeContext.Provider value={value}>{children}</InviteModeContext.Provider>;
}
