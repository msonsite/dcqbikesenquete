import Image from "next/image";
import { GOOGLE_REVIEW_URL } from "@/lib/constants";
import { withBasePath } from "@/lib/paths";

/**
 * Altijd zichtbare Google Review QR — sidebar op iPad landscape,
 * compacte balk op smallere schermen. Blijft staan tijdens enquête én bedankscherm.
 */
export function GoogleReviewQr() {
  return (
    <>
      {/* iPad landscape / desktop: vaste sidebar rechts */}
      <aside className="hidden shrink-0 flex-col items-center justify-center border-l border-gray-200 bg-white px-5 py-6 lg:flex lg:w-56 xl:w-64">
        <p className="text-center font-heading text-base font-semibold text-dcq-black xl:text-lg">
          Tevreden?
        </p>
        <p className="mt-1 text-center text-sm text-gray-600">
          Scan voor een Google-review ⭐
        </p>
        <Image
          src={withBasePath("/images/qrcodereviews.png")}
          alt="QR-code voor Google-review bij DCQ Bikes"
          width={180}
          height={180}
          className="mt-4 h-36 w-36 xl:h-44 xl:w-44"
        />
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-center text-xs text-gray-500 underline-offset-2 hover:text-dcq-red hover:underline"
        >
          Of tik hier
        </a>
      </aside>

      {/* Portrait / smaller: compacte balk boven de verzendknop */}
      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm lg:hidden">
        <Image
          src={withBasePath("/images/qrcodereviews.png")}
          alt="QR-code voor Google-review"
          width={72}
          height={72}
          className="h-[72px] w-[72px] shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-semibold text-dcq-black">
            Tevreden? Laat een Google-review achter ⭐
          </p>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-xs text-dcq-red underline-offset-2 hover:underline"
          >
            Of tik hier om te reviewen
          </a>
        </div>
      </div>
    </>
  );
}
