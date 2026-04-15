import { useState } from "react";
import { useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { LISTINGS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { ListingCard } from "../components/ListingCard";
import {
  FeedFilterBar,
  createDefaultFeedFilters,
  listingMatchesFeedFilters,
} from "../components/FeedFilterBar";

export function AreaFeedPublicScreen() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(createDefaultFeedFilters);

  const filtered = LISTINGS.filter((listing) => listingMatchesFeedFilters(listing, filters));

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="p-4">
        <FeedFilterBar filters={filters} onChange={setFilters} />
        {filtered.map((l) => (
          <ListingCard
            key={l.id}
            listing={l}
            onClick={() => navigate(l.type === "tour" ? `/screens/public/tour/${l.id}` : `/screens/public/listing/${l.id}`)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="py-10 text-center text-xs text-muted-foreground">
            {t("feed.noMatches")}
          </div>
        )}
      </div>
      <ScreenHint
        title="Area Feed (Public)"
        description="Public discovery feed with area-based browsing and filters. Going/Stay are now separate route tabs."
      >
        <p>
          This screen now focuses on Discover-only content. Bottom navigation
          drives route changes for Going and Stay experiences.
        </p>
      </ScreenHint>
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
