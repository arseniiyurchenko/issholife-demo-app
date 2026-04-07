import { useState } from "react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { PartnerLayout } from "../components/PartnerLayout";

export function PartnerTourCreateScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();
  const [tourName, setTourName] = useState("");

  return (
    <PartnerLayout>
      <div className="p-6">
        <h1 className="mb-1 text-xl font-bold text-foreground">{t("partner.createTour")}</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Create a licensed tour package where bundled transport and accommodation are allowed.
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold text-foreground">Tour title</label>
            <input
              value={tourName}
              onChange={(event) => setTourName(event.target.value)}
              placeholder="e.g. Niseko Snow Weekend Tour"
              className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-foreground">Bundle inclusions</label>
            <textarea
              rows={3}
              placeholder="List what is included: guide, transfers, accommodation, meals..."
              className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-bold text-foreground">Area</label>
              <input placeholder="Niseko" className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none" />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-bold text-foreground">Price</label>
              <input placeholder="¥48,000" className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none" />
            </div>
          </div>
          <div className="rounded-xl border bg-[var(--il-tour-bg)] p-3 text-xs text-[var(--il-tour)]">
            Regulatory note: use this flow only for licensed tour operations with compliant bundled services.
          </div>
          <button
            onClick={() => hints.push(`Licensed tour draft created: "${tourName || "Untitled Tour"}".`)}
            className="w-full rounded-lg bg-[var(--il-tour)] py-2.5 text-xs font-bold text-white"
          >
            Save tour draft
          </button>
        </div>
      </div>
      <ScreenHint
        title="Create Tour Listing"
        description="Partner flow for licensed bundled tour products."
      />
      <BackendHintButton />
    </PartnerLayout>
  );
}
