import { useState } from "react";
import { MapPin, Tag, Target } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { LISTINGS, STAYS, AREAS, CATEGORIES } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { FeedTabs, type FeedTab } from "../components/FeedTabs";
import { ListingCard } from "../components/ListingCard";
import { StayCard } from "../components/StayCard";
import { SearchSelect } from "../components/SearchSelect";
import { Lock } from "../components/Lock";
import { useIsshoLife } from "../issholife-context";

export function AreaFeedPublicScreen() {
  const { t } = useI18n();
  const { setIsPublic } = useIsshoLife();
  const [tab, setTab] = useState<FeedTab>("discover");
  const [area, setArea] = useState<string | null>(null);
  const [cat, setCat] = useState<string | null>(null);

  const filtered = LISTINGS.filter((l) => {
    if (area && l.area !== area) return false;
    if (cat && l.category !== cat) return false;
    return true;
  });

  return (
    <IsshoLifeLayout showToggle={false}>
      <FeedTabs active={tab} onChange={setTab} />

      {tab === "discover" && (
        <div className="p-4">
          <div className="mb-4 flex gap-2">
            <SearchSelect
              items={AREAS}
              value={area}
              onChange={setArea}
              placeholder={t("feed.allAreas")}
              icon={<MapPin className="size-3.5" />}
            />
            <SearchSelect
              items={CATEGORIES}
              value={cat}
              onChange={setCat}
              placeholder={t("feed.allActivities")}
              icon={<Tag className="size-3.5" />}
            />
          </div>
          {filtered.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
          {filtered.length === 0 && (
            <div className="py-10 text-center text-xs text-muted-foreground">
              {t("feed.noMatches")}
            </div>
          )}
        </div>
      )}

      {tab === "going" && (
        <div className="p-4">
          <Lock isLocked label={t("feed.going")} onUnlock={() => setIsPublic(false)}>
            <div className="py-16 text-center">Placeholder</div>
          </Lock>
        </div>
      )}

      {tab === "stay" && (
        <div className="p-4">
          <p className="mb-3 text-xs text-muted-foreground">
            {t("feed.stayDescription")}
          </p>
          {STAYS.map((s) => (
            <StayCard
              key={s.id}
              stay={s}
              isLocked
              onUnlock={() => setIsPublic(false)}
            />
          ))}
        </div>
      )}

      <ScreenHint
        title="Area Feed (Public)"
        description="Public teaser feed with area-based browsing, filters, and inline locks on gated content."
      >
        <p>
          This screen shows the public discovery experience. Listings appear in
          teaser mode with inline locks on member-only sections. The Going tab
          and Stay pricing are locked behind membership.
        </p>
      </ScreenHint>
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
