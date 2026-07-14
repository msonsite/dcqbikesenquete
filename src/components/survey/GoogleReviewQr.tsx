import Image from "next/image";
import { withBasePath } from "@/lib/paths";

/** Subtiele, altijd zichtbare Google Review QR — één vaste plek rechtsonder. */
export function GoogleReviewQr() {
  return (
    <aside
      className="pointer-events-none fixed bottom-5 right-5 z-10 flex flex-col items-center rounded-xl border border-gray-200/60 bg-white/80 px-3 py-2.5 shadow-sm backdrop-blur-sm md:bottom-6 md:right-6"
      aria-label="QR-code voor Google-review"
    >
      <p className="text-[10px] font-medium tracking-wide text-gray-400 md:text-xs">
        Google-review
      </p>
      <Image
        src={withBasePath("/images/qrcodereviews.png")}
        alt=""
        width={80}
        height={80}
        className="mt-1.5 h-16 w-16 md:h-20 md:w-20"
        aria-hidden
      />
    </aside>
  );
}
