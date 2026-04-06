import { Car, LockKeyhole } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { RIDES } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { Lock } from "../components/Lock";
import { RidePoolCard } from "../components/RidePoolCard";
import { useIsshoLife } from "../issholife-context";

export function RideSharePublicScreen() {
  const { t } = useI18n();
  const { setIsPublic } = useIsshoLife();

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Car className="size-4" />
          {t("ride.pool")}
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Mt. Takao &middot; {RIDES.length} {t("ride.ridesAvailable")}
        </p>
      </div>
      <div className="p-4">
        <div className="mb-4 rounded-xl border bg-[var(--il-accent-bg)] p-4 text-center">
          <Car className="mx-auto mb-2 size-8 text-[var(--il-accent)]" />
          <div className="text-2xl font-bold text-foreground">{RIDES.length}</div>
          <div className="text-xs text-muted-foreground">{t("ride.ridesAvailable")}</div>
        </div>

        <Lock isLocked label={t("ride.pool")} onUnlock={() => setIsPublic(false)}>
          <div>
            {RIDES.map((r) => (
              <RidePoolCard key={r.id} ride={r} />
            ))}
          </div>
        </Lock>

        <div className="mt-4 rounded-lg bg-muted p-3 text-center text-[11px] text-muted-foreground">
          {t("ride.costSplitOnly")}
        </div>
      </div>
      <ScreenHint
        title="Ride Share (Public)"
        description="Public teaser view of ride share pool. Shows aggregate count only. Individual posts are locked behind membership."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
