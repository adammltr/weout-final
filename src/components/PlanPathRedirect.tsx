import { useMemo } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

/**
 * Anciens liens partagés : /plan/<uuid>[?query] → canonique /?plan=<uuid>[&query conservée]
 * (ex. sref=) pour éviter une 404 côté routeur tout en gardant la query lisible par l’app.
 */
const PlanPathRedirect = () => {
  const { planId } = useParams();
  const [searchParams] = useSearchParams();

  const target = useMemo(() => {
    const id = planId?.trim();
    if (!id) return "/";
    const next = new URLSearchParams(searchParams);
    next.set("plan", id);
    const q = next.toString();
    return q ? `/?${q}` : `/?plan=${encodeURIComponent(id)}`;
  }, [planId, searchParams]);

  if (!planId?.trim()) {
    return <Navigate to="/" replace />;
  }

  return <Navigate to={target} replace />;
};

export default PlanPathRedirect;
