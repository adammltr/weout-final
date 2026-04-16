-- RPC pour la landing join-weout.com : vérifie l’existence du plan et des règles publiques
-- (sans exposer participants ni données sensibles).
--
-- Prérequis : table public.plans avec au minimum :
--   id uuid PK, min_age int null, max_age int null, status text null,
--   cancelled_at timestamptz null, visibility text ou enum castable en text
--
-- Déploiement : SQL Editor Supabase ou `supabase db push` après revue des colonnes.
-- Droits : anon + authenticated en EXECUTE (SECURITY DEFINER contourne la RLS lecture).

CREATE OR REPLACE FUNCTION public.get_plan_share_gate(p_plan_id uuid, p_birth_year int DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rec record;
  age_years int;
BEGIN
  IF to_regclass('public.plans') IS NULL THEN
    RETURN jsonb_build_object('gate', 'unconfigured');
  END IF;

  BEGIN
    EXECUTE
      'SELECT id, min_age, max_age, status, cancelled_at, visibility::text AS visibility FROM public.plans WHERE id = $1'
      INTO STRICT rec
      USING p_plan_id;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RETURN jsonb_build_object('gate', 'not_found');
  END;

  IF rec.cancelled_at IS NOT NULL OR lower(coalesce(rec.status, '')) IN ('cancelled', 'canceled') THEN
    RETURN jsonb_build_object('gate', 'cancelled');
  END IF;

  IF lower(coalesce(rec.visibility, '')) IN ('private', 'draft') THEN
    RETURN jsonb_build_object('gate', 'private');
  END IF;

  IF (rec.min_age IS NOT NULL OR rec.max_age IS NOT NULL) AND p_birth_year IS NULL THEN
    RETURN jsonb_build_object(
      'gate', 'needs_birth_year',
      'min_age', rec.min_age,
      'max_age', rec.max_age
    );
  END IF;

  IF p_birth_year IS NOT NULL AND (rec.min_age IS NOT NULL OR rec.max_age IS NOT NULL) THEN
    age_years := (extract(year FROM age(current_date, make_date(p_birth_year, 6, 15))))::int;
    IF rec.min_age IS NOT NULL AND age_years < rec.min_age THEN
      RETURN jsonb_build_object(
        'gate', 'age_restricted',
        'detail', 'too_young',
        'min_age', rec.min_age,
        'max_age', rec.max_age
      );
    END IF;
    IF rec.max_age IS NOT NULL AND age_years > rec.max_age THEN
      RETURN jsonb_build_object(
        'gate', 'age_restricted',
        'detail', 'too_old',
        'min_age', rec.min_age,
        'max_age', rec.max_age
      );
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'gate', 'ok',
    'min_age', rec.min_age,
    'max_age', rec.max_age
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_plan_share_gate(uuid, int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_plan_share_gate(uuid, int) TO anon, authenticated;
