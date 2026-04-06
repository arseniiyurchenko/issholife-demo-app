import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { STAYS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { StayCard } from "../components/StayCard";
import { useIsshoLife } from "../issholife-context";

export function StayBrowsePublicScreen() {
  const { t } = useI18n();
  const { setIsPublic } = useIsshoLife();

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-3">
        <h2 className="text-sm font-bold text-foreground">{t("feed.stay")}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">{t("feed.stayDescription")}</p>
      </div>
      <div className="p-4">
        {STAYS.map((s) => (
          <StayCard key={s.id} stay={s} isLocked onUnlock={() => setIsPublic(false)} />
        ))}
      </div>
      <ScreenHint
        title="Stay Browse (Public)"
        description="Public view of accommodation listings with locked pricing. Powered by Trust network."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
