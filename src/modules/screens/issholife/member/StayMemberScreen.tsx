import { useState } from "react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { STAYS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { StayCard } from "../components/StayCard";
import { TrustRedirect } from "../components/TrustRedirect";
import type { Stay } from "@/modules/core/issholife-data";

export function StayMemberScreen() {
  const { t } = useI18n();
  const [redirect, setRedirect] = useState<Stay | null>(null);

  if (redirect) {
    return <TrustRedirect stay={redirect} onBack={() => setRedirect(null)} />;
  }

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-3">
        <h2 className="text-sm font-bold text-foreground">{t("feed.stay")}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">{t("feed.stayDescription")}</p>
      </div>
      <div className="p-4">
        {STAYS.map((s) => (
          <StayCard
            key={s.id}
            stay={s}
            isLocked={false}
            onUnlock={() => {}}
            onClick={() => setRedirect(s)}
          />
        ))}
      </div>
      <ScreenHint
        title="Stay (Member)"
        description="Member view of accommodation with visible pricing. Tapping a stay redirects to Trust for booking."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
