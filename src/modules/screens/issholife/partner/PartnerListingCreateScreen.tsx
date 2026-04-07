import { useState } from "react";
import { Link } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { PartnerLayout } from "../components/PartnerLayout";

export function PartnerListingCreateScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();
  const [type, setType] = useState<"experience" | "offer" | null>(null);

  return (
    <PartnerLayout>
      <div className="p-6">
        <h1 className="mb-1 text-xl font-bold text-foreground">{t("partner.createListing")}</h1>
        <p className="mb-6 text-sm text-muted-foreground">{t("partner.createListingDescription")}</p>
        <div className="mb-4 rounded-xl border bg-[var(--il-tour-bg)] p-3 text-xs">
          <div className="font-bold text-[var(--il-tour)]">{t("partner.tourNudgeTitle")}</div>
          <div className="mt-1 text-muted-foreground">
            {t("partner.tourNudgeDescription")}
          </div>
          <Link
            to="/screens/partner/create-tour"
            className="mt-2 inline-flex rounded-md bg-[var(--il-tour)] px-2.5 py-1 text-[10px] font-bold text-white"
          >
            {t("partner.openTourFlow")}
          </Link>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-xs font-bold text-foreground">{t("partner.listingType")}</label>
          <div className="flex gap-3">
            {(["experience", "offer"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 rounded-xl border-2 p-4 text-center transition-colors ${
                  type === t ? "border-[var(--il-pro)] bg-[var(--il-pro-bg)]" : "border-border"
                }`}
              >
                <div className="text-sm font-bold capitalize text-foreground">{t}</div>
                <div className="mt-1 text-[10px] text-muted-foreground">
                  {t === "experience" ? `${type === "experience" ? "" : ""}` : ""}
                </div>
              </button>
            ))}
          </div>
        </div>

        {type && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-foreground">{t("partner.fieldTitle")}</label>
              <input placeholder="e.g. Hakone MTB Downhill" className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-foreground">{t("partner.fieldDescription")}</label>
              <textarea rows={3} placeholder="Describe the experience..." className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-bold text-foreground">{t("partner.fieldArea")}</label>
                <input placeholder="Hakuba" className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none" />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs font-bold text-foreground">{t("partner.fieldPrice")}</label>
                <input placeholder="¥12,000" className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-bold text-foreground">{t("partner.fieldDate")}</label>
                <input placeholder="Apr 26" className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none" />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs font-bold text-foreground">{t("partner.fieldMaxCapacity")}</label>
                <input type="number" placeholder="8" className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none" />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 rounded-lg border py-2.5 text-xs font-semibold text-muted-foreground">{t("partner.saveDraft")}</button>
              <button
                onClick={() => hints.push(`Pro ${type} listing published. Now visible in area feed.`)}
                className="flex-1 rounded-lg bg-[var(--il-pro)] py-2.5 text-xs font-bold text-white"
              >
                {t("partner.publish")}
              </button>
            </div>
          </div>
        )}
      </div>
      <ScreenHint title="Create Pro Listing" description="Create/edit flow for Partner Pro listings. Choose Experience or Offer type." />
      <BackendHintButton />
    </PartnerLayout>
  );
}
