import Image from "next/image";
import { withBasePath } from "@/lib/paths";

export function SurveyHeader() {
  return (
    <header className="shrink-0 border-b border-white/10 bg-dcq-black px-5 py-3 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          <Image
            src={withBasePath("/images/dcqbikeslogotransparent.png")}
            alt="DCQ Bikes"
            width={280}
            height={80}
            priority
            className="h-10 w-auto object-contain md:h-12"
          />
          <div className="hidden h-9 w-px bg-white/20 sm:block" />
          <div>
            <p className="font-heading text-base font-semibold text-dcq-white md:text-lg">
              Help ons in 2 korte vragen
            </p>
            <p className="text-xs text-dcq-white/60 md:text-sm">
              Minder dan 10 seconden
            </p>
          </div>
        </div>
        <span className="rounded-full bg-dcq-red px-3 py-1.5 text-xs font-semibold text-dcq-white md:text-sm">
          Website vernieuwd
        </span>
      </div>
    </header>
  );
}
