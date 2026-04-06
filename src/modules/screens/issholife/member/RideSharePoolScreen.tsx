import { Car, AlertTriangle, Plus } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { RIDES } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { RidePoolCard } from "../components/RidePoolCard";

export function RideSharePoolScreen() {
  const { t } = useI18n();

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="flex items-center justify-between border-b bg-card px-4 py-3">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Car className="size-4" />
            {t("ride.pool")}
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Mt. Takao &middot; {RIDES.length} {t("ride.ridesAvailable")}
          </p>
        </div>
        <button className="flex items-center gap-1 rounded-lg bg-[var(--il-accent)] px-3 py-1.5 text-xs font-bold text-white">
          <Plus className="size-3.5" />
          {t("ride.createRide")}
        </button>
      </div>
      <div className="p-4">
        {RIDES.map((r) => (
          <RidePoolCard key={r.id} ride={r} />
        ))}
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted p-3 text-[11px] text-muted-foreground">
          <AlertTriangle className="size-3.5 shrink-0" />
          {t("ride.costSplitOnly")}
        </div>
      </div>
      <ScreenHint
        title="Ride Share Pool (Member)"
        description="Member view of destination-based ride share pool. Browse rides, create new ride posts, and join existing ones."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
