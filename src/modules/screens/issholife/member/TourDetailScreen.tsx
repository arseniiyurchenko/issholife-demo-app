import { ArrowLeft, Calendar, Clock, MapPin, ShieldCheck, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { LISTINGS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { Badge } from "../components/Badge";
import { useIsshoLife } from "../issholife-context";

export function TourDetailScreen() {
  const { lang, t } = useI18n();
  const navigate = useNavigate();
  const { id } = useParams();
  const listingId = Number(id);
  const fallbackTour = LISTINGS.find((listing) => listing.type === "tour") ?? LISTINGS[0];
  const tour = LISTINGS.find((listing) => listing.id === listingId && listing.type === "tour") ?? fallbackTour;
  const title = lang === "ja" ? tour.titleJa : tour.title;
  const description = lang === "ja" ? tour.descriptionJa : tour.description;
  const { getParticipationStatus, joinListing } = useIsshoLife();
  const isJoined = getParticipationStatus(tour.id) === "going";

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-2.5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2.5">
          <ArrowLeft className="size-4 text-muted-foreground" />
          <span className="truncate text-xs font-semibold text-foreground">{title}</span>
        </button>
      </div>

      <div className="relative h-44 bg-cover bg-center" style={{ backgroundImage: `url('${tour.image}')` }}>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pt-5 pb-3">
          <Badge type="tour" sub={tour.sub} />
          <h1 className="mt-1.5 text-xl font-extrabold text-white">{title}</h1>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{tour.area}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="size-3" />{tour.date}</span>
          <span className="inline-flex items-center gap-1"><Clock className="size-3" />{tour.time}</span>
          <span className="inline-flex items-center gap-1"><Users className="size-3" />{tour.attendees}/{tour.maxAttendees}</span>
          {tour.price && <span className="font-bold text-[var(--il-tour)]">{tour.price}</span>}
        </div>

        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-1.5 text-xs font-bold text-foreground">{t("listing.about")}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <div className="rounded-xl border bg-[var(--il-tour-bg)] p-4 text-xs text-[var(--il-tour)]">
          <div className="mb-1.5 inline-flex items-center gap-1 font-bold">
            <ShieldCheck className="size-3.5" />
            Licensed tour package
          </div>
          <p className="text-xs text-foreground">
            This tier allows bundled coordination for transport and accommodation under licensed operations.
          </p>
        </div>

        {!isJoined ? (
          <button
            onClick={() => joinListing(tour.id)}
            className="w-full rounded-xl bg-[var(--il-tour)] py-3.5 text-sm font-extrabold text-white shadow-md"
          >
            {t("join.joinEvent")}
          </button>
        ) : (
          <div className="w-full rounded-xl border-2 border-[var(--il-going)]/15 bg-[var(--il-going-bg)] py-3.5 text-center text-sm font-extrabold text-[var(--il-going)]">
            {t("join.youreGoing")}
          </div>
        )}
      </div>

      <ScreenHint
        title="Tour Detail (Member)"
        description="Licensed tour details with bundled inclusions and a dedicated join CTA."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
