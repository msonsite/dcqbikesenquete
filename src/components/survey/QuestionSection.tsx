import type { ReactNode } from "react";

interface QuestionSectionProps {
  step: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  error?: string;
  compact?: boolean;
}

export function QuestionSection({
  step,
  title,
  subtitle,
  children,
  error,
  compact = false,
}: QuestionSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-5">
      <div className="mb-3 flex items-center gap-3 md:mb-4">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dcq-red font-heading text-base font-bold text-dcq-white md:h-10 md:w-10 md:text-lg"
          aria-hidden
        >
          {step}
        </span>
        <div>
          <h2 className="font-heading text-xl font-semibold leading-snug text-dcq-black md:text-2xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
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
