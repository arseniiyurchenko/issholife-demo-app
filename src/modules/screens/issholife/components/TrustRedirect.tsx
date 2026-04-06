import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { useBackendHints } from "@/modules/core/backend-hints";
import type { Stay } from "@/modules/core/issholife-data";

interface Props {
  stay: Stay;
  onBack: () => void;
}

export function TrustRedirect({ stay, onBack }: Props) {
  const { t } = useI18n();
  const hints = useBackendHints();
  const [phase, setPhase] = useState<"loading" | "ready">("loading");
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);

  useEffect(() => {
    const tm = setTimeout(() => setPhase("ready"), 2000);
    return () => clearTimeout(tm);
  }, []);

  const priceNum = parseInt(stay.price.replace(/[^0-9]/g, ""));

  const handleRequestBooking = () => {
    if (isRequestSubmitted) {
      return;
    }

    setIsRequestSubmitted(true);
    hints.push(`Trust booking request sent for stay ${stay.id}.`);
  };

  if (phase === "loading") {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-5 bg-[var(--il-trust-dark)]">
        <div className="size-12 animate-spin rounded-full border-3 border-[var(--il-trust-gold)]/30 border-t-[var(--il-trust-gold)]" />
        <div className="text-sm font-semibold text-[var(--il-trust-gold)]">
          {t("stay.connecting")}
        </div>
        <div className="text-xs text-[#71839A]">{t("stay.settingUp")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-[var(--il-trust-dark)]">
      <div className="flex items-center justify-between border-b border-[var(--il-trust-gold)]/12 px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-full border-[1.5px] border-[var(--il-trust-gold)]">
            <div className="size-1.5 rounded-full bg-[var(--il-trust-gold)]" />
          </div>
          <span className="text-base font-bold tracking-wider text-[#F6F3EC]">
            Trust
          </span>
          <span className="rounded bg-[var(--il-trust-gold)]/10 px-2 py-0.5 text-[10px] text-[#71839A]">
            via IsshoLife
          </span>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-md border border-[var(--il-trust-gold)]/12 px-3 py-1.5 text-xs text-[#71839A]"
        >
          <ArrowLeft className="size-3" />
          {t("common.back")}
        </button>
      </div>

      <div className="mx-auto max-w-xl px-6 py-6">
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-[var(--il-trust-gold)]/20 bg-[var(--il-trust-gold)]/8 px-4 py-3 text-xs text-[var(--il-trust-gold)]">
          <CheckCircle className="size-4" />
          {t("stay.linked")}
        </div>

        <div className="mb-5 overflow-hidden rounded-2xl border border-[var(--il-trust-gold)]/12 bg-[#16314F]/45">
          <div
            className="h-44 bg-cover bg-center"
            style={{ backgroundImage: `url('${stay.image}')` }}
          />
          <div className="px-5 py-4">
            <h2 className="mb-1.5 text-xl font-bold text-[#F6F3EC]">
              {stay.title}
            </h2>
            <div className="text-xs text-[#71839A]">
              {stay.area} &middot; {stay.rating} &middot; {stay.rooms}{" "}
              {t("stay.rooms")}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--il-trust-gold)]/12 bg-[#16314F]/45 px-5 py-5">
          <h3 className="mb-4 text-sm font-bold text-[#F6F3EC]">
            {t("stay.requestBooking")}
          </h3>
          <div className="mb-3.5 flex gap-3">
            <div className="flex-1">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#71839A]">
                {t("stay.checkIn")}
              </label>
              <div className="mt-1 rounded-lg border border-[#71839A]/30 bg-[var(--il-trust-dark)]/60 px-3.5 py-2.5 text-sm text-[#F6F3EC]">
                Apr 19
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#71839A]">
                {t("stay.checkOut")}
              </label>
              <div className="mt-1 rounded-lg border border-[#71839A]/30 bg-[var(--il-trust-dark)]/60 px-3.5 py-2.5 text-sm text-[#F6F3EC]">
                Apr 21
              </div>
            </div>
          </div>
          <div className="mb-2 flex justify-between text-xs text-[#71839A]">
            <span>
              {stay.price} x 2 {t("stay.nights")}
            </span>
            <span className="text-[#F6F3EC]">
              &yen;{(priceNum * 2).toLocaleString()}
            </span>
          </div>
          <div className="flex items-baseline justify-between border-t border-[var(--il-trust-gold)]/12 pt-2.5">
            <span className="text-sm font-bold text-[#F6F3EC]">
              {t("stay.total")}
            </span>
            <span className="text-xl font-bold text-[var(--il-trust-gold)]">
              &yen;{(priceNum * 2).toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleRequestBooking}
            disabled={isRequestSubmitted}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-[var(--il-trust-gold)] to-[#E8A75C] py-3.5 text-sm font-bold text-[var(--il-trust-dark)] disabled:cursor-default disabled:opacity-70"
          >
            {isRequestSubmitted
              ? t("lang") === "ja"
                ? "リクエストを送信しました"
                : "Request submitted"
              : t("stay.requestBooking")}
          </button>
        </div>
      </div>
    </div>
  );
}
