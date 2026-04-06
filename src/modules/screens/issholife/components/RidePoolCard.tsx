import { ArrowRight } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import type { RidePool } from "@/modules/core/issholife-data";

interface Props {
  ride: RidePool;
  onClick?: () => void;
}

export function RidePoolCard({ ride, onClick }: Props) {
  const { t } = useI18n();

  return (
    <div
      onClick={onClick}
      className="mb-1.5 flex cursor-pointer items-center justify-between rounded-lg border bg-background p-3 transition-colors hover:bg-muted"
    >
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          {ride.from}
          <ArrowRight className="size-3 text-muted-foreground" />
          {ride.to}
        </div>
        <div className="mt-0.5 text-[11px] text-muted-foreground">
          {ride.time} &middot; {ride.taken}/{ride.seats} {t("ride.seats")}
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs font-bold text-[var(--il-accent)]">
          {ride.cost}
        </div>
        <div className="text-[9px] text-muted-foreground">
          {t("ride.costSplit")}
        </div>
      </div>
    </div>
  );
}
