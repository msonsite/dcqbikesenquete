import Image from "next/image";
import { withBasePath } from "@/lib/paths";

/** Scanbare Google Review QR — vaste sidebar (landscape) of paneel boven verzenden (portrait). */
export function GoogleReviewQr() {
  return (
    <aside
      className="flex shrink-0 flex-col items-center justify-center border-t border-gray-200 bg-white px-6 py-5 lg:w-52 lg:border-t-0 lg:border-l lg:py-6 xl:w-56"
      aria-label="QR-code voor Google-review"
    >
      <p className="mb-3 text-xs font-medium tracking-wide text-gray-400">
        Google-review
      </p>
      <Image
        src={withBasePath("/images/qrcodereviews.png")}
        alt=""
        width={160}
        height={160}
        className="h-36 w-36 md:h-40 md:w-40"
        aria-hidden
      />
    </aside>
  );
}
