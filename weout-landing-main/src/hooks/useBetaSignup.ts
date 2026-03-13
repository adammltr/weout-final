import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().email("Email invalide").max(255);

interface UseBetaSignupReturn {
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useBetaSignup = (): UseBetaSignupReturn => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    const validation = emailSchema.safeParse(email.trim());
    if (!validation.success) {
      setError("Email invalide");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from("beta_signups")
        .insert({ email: email.trim().toLowerCase() });

      if (insertError) {
        // Handle duplicate email (unique constraint violation)
        if (insertError.code === "23505") {
          // Still redirect - they're already signed up
          navigate("/merci");
          return;
        }
        throw insertError;
      }

      // Success - redirect to thank you page
      navigate("/merci");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Une erreur est survenue. Réessaie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    isSubmitting,
    error,
    handleSubmit,
  };
};
