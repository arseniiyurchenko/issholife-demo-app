import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Tag, Plus } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { LISTINGS, AREAS, CATEGORIES } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { ListingCard } from "../components/ListingCard";
import { SearchSelect } from "../components/SearchSelect";
import { useIsshoLife } from "../issholife-context";

export function AreaFeedMemberScreen() {
  const { t } = useI18n();
  const { joinedIds } = useIsshoLife();
  const navigate = useNavigate();
  const [area, setArea] = useState<string | null>(null);
  const [cat, setCat] = useState<string | null>(null);

  const filtered = LISTINGS.filter((l) => {
    if (area && l.area !== area) return false;
    if (cat && l.category !== cat) return false;
    return true;
  });

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="p-4">
        <button
          type="button"
          onClick={() => navigate("/screens/member/create")}
          className="mb-4 flex w-full items-center justify-between rounded-xl border bg-[var(--il-accent-bg)] px-4 py-3 text-left"
        >
          <div>
            <div className="text-xs font-bold text-foreground">{t("feed.createCtaTitle")}</div>
            <div className="text-[11px] text-muted-foreground">{t("feed.createCtaDescription")}</div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--il-accent)] px-2.5 py-1 text-[10px] font-bold text-white">
            <Plus className="size-3" />
            {t("common.create")}
          </span>
        </button>

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
          <ListingCard
            key={l.id}
            listing={l}
            isJoined={joinedIds.includes(l.id)}
            onClick={() => navigate(l.type === "tour" ? `/screens/member/tour/${l.id}` : `/screens/member/listing/${l.id}`)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="py-10 text-center text-xs text-muted-foreground">
            {t("feed.noMatches")}
          </div>
        )}
      </div>
      <ScreenHint
        title="Area Feed (Member)"
        description="Member discovery feed with full listing access. Going/Stay/Chat live in dedicated route tabs."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
