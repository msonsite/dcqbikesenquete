"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  CUSTOMER_TYPE_OPTIONS,
  SOURCE_OPTIONS,
  WEBSITE_INFLUENCE_OPTIONS,
  THANK_YOU_DURATION_MS,
} from "@/lib/constants";
import { SurveyHeader } from "./SurveyHeader";
import { TouchButton } from "./TouchButton";
import { QuestionSection } from "./QuestionSection";
import { ThankYouScreen } from "./ThankYouScreen";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { SurveyFormData } from "@/types/survey";

type FormState = "idle" | "submitting" | "thankyou" | "error";

const initialForm: SurveyFormData = {
  customerType: null,
  source: null,
  websiteInfluence: null,
};

export function SurveyForm() {
  const [form, setForm] = useState<SurveyFormData>(initialForm);
  const [errors, setErrors] = useState<{
    customerType?: string;
    source?: string;
    website?: string;
  }>({});
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Vraag 2 (kanaal) is enkel relevant voor nieuwe klanten
  const isNewCustomer = form.customerType === "new";

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setErrors({});
    setErrorMessage("");
    setState("idle");
  }, []);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!form.customerType) {
      newErrors.customerType = "Selecteer alstublieft een optie.";
    }
    if (isNewCustomer && !form.source) {
      newErrors.source = "Selecteer alstublieft hoe u ons leerde kennen.";
    }
    if (!form.websiteInfluence) {
      newErrors.website = "Selecteer alstublieft een optie.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setState("submitting");
    setErrorMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.from("survey_answers").insert({
        customer_type: form.customerType!,
        // Kanaal enkel bewaren voor nieuwe klanten
        source: isNewCustomer ? form.source : null,
        visited_website: form.websiteInfluence !== "not_visited",
        website_influence: form.websiteInfluence!,
        purchase_reason: null,
      });

      if (error) {
        throw error;
      }

      setState("thankyou");
      setTimeout(resetForm, THANK_YOU_DURATION_MS);
    } catch {
      setState("error");
      setErrorMessage(
        "Er ging iets mis bij het verzenden. Controleer de internetverbinding en probeer opnieuw."
      );
    }
  };

  if (state === "thankyou") {
    return <ThankYouScreen />;
  }

  // Stapnummers lopen door afhankelijk van conditionele vraag
  const websiteStep = isNewCustomer ? 3 : 2;

  return (
    <div className="flex min-h-screen flex-col bg-dcq-gray">
      <SurveyHeader />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 md:px-6">
        {/* Vraag 1 — Nieuwe of bestaande klant */}
        <QuestionSection
          step={1}
          title="Bent u hier voor het eerst?"
          error={errors.customerType}
          compact
        >
          {CUSTOMER_TYPE_OPTIONS.map((option) => (
            <TouchButton
              key={option.value}
              icon={option.icon}
              selected={form.customerType === option.value}
              onClick={() => {
                setForm((f) => ({
                  ...f,
                  customerType: option.value,
                  // Reset kanaal wanneer men naar bestaande klant wisselt
                  source: option.value === "new" ? f.source : null,
                }));
                setErrors((e) => ({ ...e, customerType: undefined }));
              }}
              disabled={state === "submitting"}
            >
              {option.label}
            </TouchButton>
          ))}
        </QuestionSection>

        {/* Vraag 2 — Kanaal (enkel nieuwe klanten) */}
        {isNewCustomer && (
          <QuestionSection
            step={2}
            title="Hoe heeft u DCQ Bikes leren kennen?"
            error={errors.source}
          >
            {SOURCE_OPTIONS.map((option) => (
              <TouchButton
                key={option.label}
                icon={option.icon}
                selected={form.source === option.label}
                onClick={() => {
                  setForm((f) => ({ ...f, source: option.label }));
                  setErrors((e) => ({ ...e, source: undefined }));
                }}
                disabled={state === "submitting"}
              >
                {option.label}
              </TouchButton>
            ))}
          </QuestionSection>
        )}

        {/* Vraag 3 — Rol van de vernieuwde website */}
        <QuestionSection
          step={websiteStep}
          title="Heeft onze nieuwe website meegespeeld?"
          subtitle="dcqbikes.be kreeg onlangs een volledig vernieuwde look."
          error={errors.website}
        >
          {WEBSITE_INFLUENCE_OPTIONS.map((option) => (
            <TouchButton
              key={option.value}
              icon={option.icon}
              selected={form.websiteInfluence === option.value}
              onClick={() => {
                setForm((f) => ({ ...f, websiteInfluence: option.value }));
                setErrors((e) => ({ ...e, website: undefined }));
              }}
              disabled={state === "submitting"}
            >
              {option.label}
            </TouchButton>
          ))}
        </QuestionSection>

        {state === "error" && (
          <ErrorMessage message={errorMessage} onRetry={() => setState("idle")} />
        )}

        <div className="sticky bottom-0 -mx-4 mt-auto border-t border-gray-200 bg-dcq-gray/95 px-4 py-3 backdrop-blur-sm md:-mx-6 md:px-6">
          <TouchButton
            variant="submit"
            onClick={handleSubmit}
            disabled={state === "submitting"}
            className="min-h-[64px] text-xl"
          >
            {state === "submitting" ? (
              <span className="flex items-center justify-center gap-3">
                <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                Verzenden...
              </span>
            ) : (
              "Verzenden"
            )}
          </TouchButton>
        </div>
      </div>
    </div>
  );
}
