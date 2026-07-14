import type { ReactNode } from "react";

interface QuestionSectionProps {
  title: string;
  children: ReactNode;
  error?: string;
}

export function QuestionSection({ title, children, error }: QuestionSectionProps) {
  return (
    <section className="w-full space-y-4">
      <h2 className="text-2xl font-bold text-dcq-black md:text-3xl lg:text-4xl">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {children}
      </div>
      {error && (
        <p className="text-lg font-medium text-dcq-red" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
