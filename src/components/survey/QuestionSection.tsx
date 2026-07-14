import type { ReactNode } from "react";

interface QuestionSectionProps {
  step: number;
  title: string;
  children: ReactNode;
  error?: string;
  compact?: boolean;
}

export function QuestionSection({
  step,
  title,
  children,
  error,
  compact = false,
}: QuestionSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
      <div className="mb-5 flex items-start gap-4 md:mb-6">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dcq-red font-heading text-lg font-bold text-dcq-white md:h-11 md:w-11"
          aria-hidden
        >
          {step}
        </span>
        <h2 className="font-heading text-xl font-semibold leading-snug text-dcq-black md:text-2xl lg:text-3xl">
          {title}
        </h2>
      </div>

      <div
        className={
          compact
            ? "grid grid-cols-2 gap-3"
            : "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        }
      >
        {children}
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-base font-medium text-dcq-red" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
