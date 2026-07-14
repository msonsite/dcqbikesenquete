"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  VISITED_WEBSITE_OPTIONS,
  WEBSITE_ROLE_OPTIONS,
  SOURCE_OPTIONS,
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
  visitedWebsite: null,
  websiteInfluence: null,
  source: null,
};

export function SurveyForm() {
  const [form, setForm] = useState<SurveyFormData>(initialForm);
  const [errors, setErrors] = useState<{
    visited?: string;
    role?: string;
    source?: string;
  }>({});
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const hasVisited = form.visitedWebsite === true;
  const notVisited = form.visitedWebsite === false;

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setErrors({});
    setErrorMessage("");
    setState("idle");
  }, []);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (form.visitedWebsite === null) {
      newErrors.visited = "Selecteer alstublieft een optie.";
    } else if (hasVisited && !form.websiteInfluence) {
      newErrors.role = "Selecteer alstublieft een optie.";
    } else if (notVisited && !form.source) {
      newErrors.source = "Selecteer alstublieft een optie.";
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
        customer_type: null,
        // Kanaal enkel bij bezoekers die de website NIET bekeken hebben
        source: notVisited ? form.source : null,
        visited_website: hasVisited,
        // Rol van de website, of "not_visited" wanneer ze niet bekeken werd
        website_influence: hasVisited ? form.websiteInfluence! : "not_visited",
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

  return (
    <div className="flex min-h-screen flex-col bg-dcq-gray">
      <SurveyHeader />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 md:px-6">
        {/* Vraag 1 — Website bekeken vóór het bezoek? */}
        <QuestionSection
          step={1}
          title="Heeft u dcqbikes.be bekeken vóór uw bezoek?"
          subtitle="Onze website kreeg onlangs een volledig vernieuwde look."
          error={errors.visited}
          compact
        >
          {VISITED_WEBSITE_OPTIONS.map((option) => (
            <TouchButton
              key={String(option.value)}
              icon={option.icon}
              variant={option.value ? "yes" : "no"}
              selected={form.visitedWebsite === option.value}
              onClick={() => {
                setForm(() => ({
                  ...initialForm,
                  visitedWebsite: option.value,
                }));
                setErrors({});
              }}
              disabled={state === "submitting"}
            >
              {option.label}
            </TouchButton>
          ))}
        </QuestionSection>

        {/* Vraag 2a — Rol van de website (enkel indien bekeken) */}
        {hasVisited && (
          <QuestionSection
            step={2}
            title="Welke rol speelde de website in uw bezoek?"
            error={errors.role}
          >
            {WEBSITE_ROLE_OPTIONS.map((option) => (
              <TouchButton
                key={option.value}
                icon={option.icon}
                selected={form.websiteInfluence === option.value}
                onClick={() => {
                  setForm((f) => ({ ...f, websiteInfluence: option.value }));
                  setErrors((e) => ({ ...e, role: undefined }));
                }}
                disabled={state === "submitting"}
              >
                {option.label}
              </TouchButton>
            ))}
          </QuestionSection>
        )}

        {/* Vraag 2b — Kanaal (enkel indien niet bekeken) */}
        {notVisited && (
          <QuestionSection
            step={2}
            title="Hoe heeft u ons dan gevonden?"
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
