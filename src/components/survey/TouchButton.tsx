import type { ReactNode } from "react";

interface TouchButtonProps {
  children: ReactNode;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "yes" | "no" | "submit";
  className?: string;
}

export function TouchButton({
  children,
  selected = false,
  onClick,
  disabled = false,
  variant = "default",
  className = "",
}: TouchButtonProps) {
  const base =
    "min-h-[60px] w-full rounded-xl border-2 px-6 py-4 text-xl font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed select-none touch-manipulation";

  const variants = {
    default: selected
      ? "border-dcq-red bg-dcq-red text-white shadow-lg"
      : "border-dcq-gray-border bg-white text-dcq-black hover:border-dcq-red hover:bg-red-50",
    yes: selected
      ? "border-green-600 bg-green-600 text-white shadow-lg"
      : "border-dcq-gray-border bg-white text-dcq-black hover:border-green-600 hover:bg-green-50",
    no: selected
      ? "border-dcq-black bg-dcq-black text-white shadow-lg"
      : "border-dcq-gray-border bg-white text-dcq-black hover:border-dcq-black hover:bg-gray-100",
    submit:
      "border-dcq-red bg-dcq-red text-white shadow-lg hover:bg-dcq-red-dark disabled:bg-gray-300 disabled:border-gray-300",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
