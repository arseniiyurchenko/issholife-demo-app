import { MapPin, Star } from "lucide-react";
import { Badge } from "./Badge";
import { Lock } from "./Lock";
import { useI18n } from "@/modules/core/i18n";
import type { Stay } from "@/modules/core/issholife-data";

interface Props {
  stay: Stay;
  isLocked: boolean;
  onUnlock: () => void;
  onClick?: () => void;
}

export function StayCard({ stay, isLocked, onUnlock, onClick }: Props) {
  const { t } = useI18n();

  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className="mb-3 flex cursor-pointer overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div
        className="w-28 shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${stay.image}')`, minHeight: 100 }}
      />
      <div className="flex-1 p-3">
        <Badge type="stay" sub="Trust" />
        <h3 className="mt-1.5 mb-1 text-sm font-bold text-foreground">
          {stay.title}
        </h3>
        <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-0.5">
            <MapPin className="size-3" />
            {stay.area}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Star className="size-3" />
            {stay.rating}
          </span>
        </div>
        {isLocked ? (
          <Lock isLocked label={t("stay.pricing")} onUnlock={onUnlock}>
            <div className="py-2">
              <span className="text-sm font-bold text-[var(--il-stay)]">
                {stay.price}
              </span>
            </div>
          </Lock>
        ) : (
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-sm font-bold text-[var(--il-stay)]">
              {stay.price}
            </span>
            <span className="text-[11px] font-semibold text-[var(--il-accent)]">
              {t("stay.bookOnTrust")} &rarr;
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
