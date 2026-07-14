import Image from "next/image";
import { withBasePath } from "@/lib/paths";

export function SurveyHeader() {
  return (
    <header className="shrink-0">
      <div className="bg-dcq-red px-4 py-2.5 text-center">
        <p className="text-sm font-medium tracking-wide text-dcq-white md:text-base">
          Bedankt voor uw aankoop — heeft u 5 seconden?
        </p>
      </div>
      <div className="border-b border-white/10 bg-dcq-black px-6 py-5 md:py-6">
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <Image
            src={withBasePath("/images/dcqbikeslogotransparent.png")}
            alt="DCQ Bikes"
            width={280}
            height={80}
            priority
            className="h-12 w-auto object-contain md:h-16"
          />
        </div>
      </div>
    </header>
  );
}
