import type { ReactNode } from "react";

interface TouchButtonProps {
  children: ReactNode;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "yes" | "no" | "submit";
  className?: string;
  icon?: string;
}

export function TouchButton({
  children,
  selected = false,
  onClick,
  disabled = false,
  variant = "default",
  className = "",
  icon,
}: TouchButtonProps) {
  const base =
    "group min-h-[64px] w-full rounded-2xl border px-5 py-4 text-left text-lg font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 select-none touch-manipulation md:min-h-[68px] md:text-xl";

  const variants = {
    default: selected
      ? "border-dcq-red bg-dcq-red text-dcq-white shadow-md shadow-dcq-red/20"
      : "border-gray-200 bg-dcq-white text-dcq-black hover:border-dcq-red/40 hover:bg-red-50/50",
    yes: selected
      ? "border-dcq-red bg-dcq-red text-dcq-white shadow-md shadow-dcq-red/20"
      : "border-gray-200 bg-dcq-white text-dcq-black hover:border-dcq-red/40 hover:bg-red-50/50",
    no: selected
      ? "border-dcq-black bg-dcq-black text-dcq-white shadow-md"
      : "border-gray-200 bg-dcq-white text-dcq-black hover:border-dcq-black/30 hover:bg-gray-50",
    submit:
      "border-dcq-red bg-dcq-red text-center text-dcq-white shadow-lg shadow-dcq-red/25 hover:bg-dcq-red-dark disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span
        className={`flex items-center gap-3 ${
          variant === "submit" || variant === "yes" || variant === "no"
            ? "justify-center"
            : "justify-start"
        }`}
      >
        {icon && (
          <span className="text-2xl leading-none" aria-hidden>
            {icon}
          </span>
        )}
        <span className={variant === "submit" ? "" : "flex-1"}>{children}</span>
        {selected && variant !== "submit" && (
          <span className="text-sm opacity-80" aria-hidden>
            ✓
          </span>
        )}
      </span>
    </button>
  );
}
