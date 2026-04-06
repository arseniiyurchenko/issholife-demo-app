import { useState } from "react";
import { MapPin, Tag } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { LISTINGS, STAYS, AREAS, CATEGORIES } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { FeedTabs, type FeedTab } from "../components/FeedTabs";
import { ListingCard } from "../components/ListingCard";
import { StayCard } from "../components/StayCard";
import { SearchSelect } from "../components/SearchSelect";
import { useIsshoLife } from "../issholife-context";

export function AreaFeedMemberScreen() {
  const { t } = useI18n();
  const { joinedIds } = useIsshoLife();
  const [tab, setTab] = useState<FeedTab>("discover");
  const [area, setArea] = useState<string | null>(null);
  const [cat, setCat] = useState<string | null>(null);

  const filtered = LISTINGS.filter((l) => {
    if (area && l.area !== area) return false;
    if (cat && l.category !== cat) return false;
    return true;
  });

  const joinedListings = LISTINGS.filter((l) => joinedIds.includes(l.id));

  return (
    <IsshoLifeLayout showToggle={false}>
      <FeedTabs active={tab} onChange={setTab} goingCount={joinedIds.length} />

      {tab === "discover" && (
        <div className="p-4">
          <div className="mb-4 flex gap-2">
            <SearchSelect items={AREAS} value={area} onChange={setArea} placeholder={t("feed.allAreas")} icon={<MapPin className="size-3.5" />} />
            <SearchSelect items={CATEGORIES} value={cat} onChange={setCat} placeholder={t("feed.allActivities")} icon={<Tag className="size-3.5" />} />
          </div>
          {filtered.map((l) => (
            <ListingCard key={l.id} listing={l} isJoined={joinedIds.includes(l.id)} />
          ))}
          {filtered.length === 0 && (
            <div className="py-10 text-center text-xs text-muted-foreground">{t("feed.noMatches")}</div>
          )}
        </div>
      )}

      {tab === "going" && (
        <div className="p-4">
          {joinedListings.length === 0 ? (
            <div className="py-10 text-center">
              <div className="mb-2 text-sm font-bold text-foreground">{t("feed.noEventsYet")}</div>
              <div className="text-xs text-muted-foreground">{t("feed.browseToJoin")}</div>
            </div>
          ) : (
            joinedListings.map((l) => (
              <ListingCard key={l.id} listing={l} isJoined />
            ))
          )}
        </div>
      )}

      {tab === "stay" && (
        <div className="p-4">
          <p className="mb-3 text-xs text-muted-foreground">{t("feed.stayDescription")}</p>
          {STAYS.map((s) => (
            <StayCard key={s.id} stay={s} isLocked={false} onUnlock={() => {}} />
          ))}
        </div>
      )}

      <ScreenHint
        title="Area Feed (Member)"
        description="Member view of the discovery feed with full access to listings, join CTAs, and unlocked pricing."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
