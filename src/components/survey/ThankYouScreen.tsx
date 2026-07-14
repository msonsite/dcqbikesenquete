import Image from "next/image";
import { withBasePath } from "@/lib/paths";

export function ThankYouScreen() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-dcq-black px-8 py-12 text-center">
      <Image
        src={withBasePath("/images/dcqbikeslogotransparent.png")}
        alt="DCQ Bikes"
        width={320}
        height={100}
        className="mb-8 h-16 w-auto object-contain md:h-20"
      />
      <p className="font-heading text-3xl font-bold text-dcq-white md:text-4xl lg:text-5xl">
        Bedankt voor uw antwoord!
      </p>
      <p className="mt-4 text-4xl md:text-5xl" aria-hidden>
        🚴
      </p>
      <p className="mt-6 text-lg text-dcq-white/70">Prettige rit!</p>
    </div>
  );
}
