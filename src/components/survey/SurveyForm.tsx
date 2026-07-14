"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  SOURCE_OPTIONS,
  PURCHASE_REASON_OPTIONS,
  SHOW_PURCHASE_REASON,
  THANK_YOU_DURATION_MS,
} from "@/lib/constants";
import { TouchButton } from "./TouchButton";
import { QuestionSection } from "./QuestionSection";
import { ThankYouScreen } from "./ThankYouScreen";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { SurveyFormData } from "@/types/survey";

type FormState = "idle" | "submitting" | "thankyou" | "error";

const initialForm: SurveyFormData = {
  source: null,
  visitedWebsite: null,
  purchaseReason: null,
};

export function SurveyForm() {
  const [form, setForm] = useState<SurveyFormData>(initialForm);
  const [errors, setErrors] = useState<{ source?: string; website?: string }>({});
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setErrors({});
    setErrorMessage("");
    setState("idle");
  }, []);

  const validate = (): boolean => {
    const newErrors: { source?: string; website?: string } = {};

    if (!form.source) {
      newErrors.source = "Selecteer alstublieft hoe u bij ons terechtgekomen bent.";
    }
    if (form.visitedWebsite === null) {
      newErrors.website = "Selecteer alstublieft Ja of Nee.";
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
        source: form.source!,
        visited_website: form.visitedWebsite!,
        purchase_reason: SHOW_PURCHASE_REASON ? form.purchaseReason : null,
      });

      if (error) {
        throw error;
      }

      setState("thankyou");

      // Na bedankscherm: reset en klaar voor volgende klant
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
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-8 md:px-10 md:py-12">
      {/* Header */}
      <header className="text-center">
        <div className="mb-2 inline-block rounded-lg bg-dcq-red px-4 py-1">
          <span className="text-sm font-bold uppercase tracking-widest text-white">
            DCQ Bikes
          </span>
        </div>
        <h1 className="text-3xl font-bold text-dcq-black md:text-4xl">
          Korte enquête
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Heeft u 5 seconden? Uw antwoord helpt ons enorm.
        </p>
      </header>

      {/* Vraag 1: Bron */}
      <QuestionSection
        title="Hoe bent u bij DCQ Bikes terechtgekomen?"
        error={errors.source}
      >
        {SOURCE_OPTIONS.map((option) => (
          <TouchButton
            key={option}
            selected={form.source === option}
            onClick={() => {
              setForm((f) => ({ ...f, source: option }));
              setErrors((e) => ({ ...e, source: undefined }));
            }}
            disabled={state === "submitting"}
          >
            {option}
          </TouchButton>
        ))}
      </QuestionSection>

      {/* Vraag 2: Website bekeken */}
      <QuestionSection
        title="Hebt u vóór uw aankoop onze website bekeken?"
        error={errors.website}
      >
        <div className="col-span-1 grid grid-cols-2 gap-3 sm:col-span-2 lg:col-span-4">
          <TouchButton
            variant="yes"
            selected={form.visitedWebsite === true}
            onClick={() => {
              setForm((f) => ({ ...f, visitedWebsite: true }));
              setErrors((e) => ({ ...e, website: undefined }));
            }}
            disabled={state === "submitting"}
          >
            Ja
          </TouchButton>
          <TouchButton
            variant="no"
            selected={form.visitedWebsite === false}
            onClick={() => {
              setForm((f) => ({ ...f, visitedWebsite: false }));
              setErrors((e) => ({ ...e, website: undefined }));
            }}
            disabled={state === "submitting"}
          >
            Nee
          </TouchButton>
        </div>
      </QuestionSection>

      {/* Vraag 3: Optioneel */}
      {SHOW_PURCHASE_REASON && (
        <QuestionSection title="Wat gaf uiteindelijk de doorslag om bij ons te kopen?">
          {PURCHASE_REASON_OPTIONS.map((option) => (
            <TouchButton
              key={option}
              selected={form.purchaseReason === option}
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  purchaseReason: f.purchaseReason === option ? null : option,
                }))
              }
              disabled={state === "submitting"}
            >
              {option}
            </TouchButton>
          ))}
        </QuestionSection>
      )}

      {/* Foutmelding */}
      {state === "error" && (
        <ErrorMessage message={errorMessage} onRetry={() => setState("idle")} />
      )}

      {/* Verzenden */}
      <div className="pt-2">
        <TouchButton
          variant="submit"
          onClick={handleSubmit}
          disabled={state === "submitting"}
          className="min-h-[72px] text-2xl"
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
  );
}
