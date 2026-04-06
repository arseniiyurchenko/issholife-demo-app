import { MapPin, Calendar, CheckCircle } from "lucide-react";
import { Badge } from "./Badge";
import { useI18n } from "@/modules/core/i18n";
import type { Listing } from "@/modules/core/issholife-data";

interface Props {
  listing: Listing;
  isJoined?: boolean;
  onClick?: () => void;
}

export function ListingCard({ listing, isJoined, onClick }: Props) {
  const { lang, t } = useI18n();
  const title = lang === "ja" ? listing.titleJa : listing.title;

  return (
    <div
      onClick={onClick}
      className="mb-3 flex cursor-pointer overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div
        className="w-28 shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${listing.image}')`, minHeight: 110 }}
      />
      <div className="flex-1 p-3" style={{ minWidth: 0 }}>
        <div className="mb-1 flex items-center justify-between">
          <Badge type={listing.type} sub={listing.sub} />
          {listing.price && (
            <span className="text-xs font-bold text-[var(--il-pro)]">
              {listing.price}
            </span>
          )}
        </div>
        <h3 className="mb-1 truncate text-sm font-bold text-foreground">
          {title}
        </h3>
        <div className="mb-1 flex items-center gap-2.5 text-[11.5px] text-muted-foreground">
          <span className="inline-flex items-center gap-0.5">
            <MapPin className="size-3" />
            {listing.area}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Calendar className="size-3" />
            {listing.date}
          </span>
          <span>{listing.time}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] text-muted-foreground">
            {listing.attendees}/{listing.maxAttendees} {t("join.goingCount")}
          </span>
          {isJoined && (
            <span className="inline-flex items-center gap-1 rounded bg-[var(--il-going-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--il-going)]">
              <CheckCircle className="size-3" />
              {t("feed.going")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
