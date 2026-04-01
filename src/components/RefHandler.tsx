import { useEffect, useLayoutEffect, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { InviteModeProvider } from "@/contexts/InviteModeContext";
import {
  applyPendingInviteRefForSession,
  extractInviteRefFromSearchAndPath,
  readPendingInviteRef,
  setPendingInviteRef,
} from "@/lib/pendingInviteRef";

const INVITE_LANDING_PATHS = new Set(["/", "/ref"]);

type RefHandlerProps = {
  children: ReactNode;
};

const RefHandler = ({ children }: RefHandlerProps) => {
  const location = useLocation();

  const refFromUrl = useMemo(
    () => extractInviteRefFromSearchAndPath(location.search, location.pathname),
    [location.search, location.pathname],
  );

  const normalizedPath =
    location.pathname.replace(/\/+$/, "") === "" ? "/" : location.pathname.replace(/\/+$/, "");

  const isInviteLandingPage = Boolean(
    refFromUrl && INVITE_LANDING_PATHS.has(normalizedPath),
  );

  useLayoutEffect(() => {
    if (refFromUrl) {
      setPendingInviteRef(refFromUrl);
    }
  }, [refFromUrl]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const codeToProcess = refFromUrl ?? readPendingInviteRef();
      if (!codeToProcess || cancelled) return;
      await applyPendingInviteRefForSession(codeToProcess);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [refFromUrl]);

  const inviteModeValue = useMemo(
    () => ({
      activeInviteCodeFromUrl: refFromUrl,
      isInviteLandingPage,
    }),
    [refFromUrl, isInviteLandingPage],
  );

  return <InviteModeProvider value={inviteModeValue}>{children}</InviteModeProvider>;
};

export default RefHandler;
