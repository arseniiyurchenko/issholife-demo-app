import { Calendar, MessageCircle } from "lucide-react";
import type { MouseEvent } from "react";
import { useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { LISTINGS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { useIsshoLife } from "../issholife-context";

export function GoingTabScreen() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { participationByListingId } = useIsshoLife();
  const participatingListings = LISTINGS.filter(
    (listing) => participationByListingId[listing.id] !== undefined,
  );

  function openListingDetails(listingId: number): void {
    const listing = LISTINGS.find((item) => item.id === listingId);
    if (listing?.type === "tour") {
      navigate(`/screens/member/tour/${listingId}`);
      return;
    }

    navigate(`/screens/member/listing/${listingId}`);
  }

  function openListingMessaging(
    event: MouseEvent<HTMLButtonElement>,
    messagingLink: string,
  ): void {
    event.stopPropagation();
    window.open(messagingLink, "_blank", "noopener,noreferrer");
  }

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-3">
        <h2 className="text-sm font-bold text-foreground">{t("feed.going")}</h2>
      </div>
      <div className="p-4">
        {participatingListings.length === 0 && (
          <div className="rounded-xl border bg-card p-6 text-center">
            <div className="mb-2 text-sm font-bold text-foreground">
              {t("feed.noEventsYet")}
            </div>
            <div className="text-xs text-muted-foreground">{t("feed.browseToJoin")}</div>
          </div>
        )}
        {participatingListings.map((l) => {
          const title = lang === "ja" ? l.titleJa : l.title;
          const participation = participationByListingId[l.id];
          const isCancelled = participation.status === "cancelled";
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => openListingDetails(l.id)}
              className="mb-3 w-full overflow-hidden rounded-xl border bg-card text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3 p-3.5">
                <div
                  className="size-13 shrink-0 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url('${l.image}')`, width: 52, height: 52 }}
                />
                <div className="flex-1">
                  <div
                    className={`text-sm font-bold ${isCancelled ? "text-destructive" : "text-[var(--il-going)]"}`}
                  >
                    {title}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    {l.date} &middot; {l.time}
                  </div>
                </div>
                <span
                  className={`rounded-md px-2.5 py-1 text-[10px] font-bold ${isCancelled ? "bg-destructive/10 text-destructive" : "bg-[var(--il-going-bg)] text-[var(--il-going)]"}`}
                >
                  {isCancelled ? "Cancelled" : "Going"}
                </span>
              </div>
              <div className="flex border-t">
                <div className="flex-1 border-r py-2.5 text-center">
                  <div className="text-base font-extrabold text-foreground">{l.attendees + 1}</div>
                  <div className="text-[10px] text-muted-foreground">{t("common.attendees")}</div>
                </div>
                <div className="flex-1 py-2.5 text-center">
                  <div className="text-base font-extrabold text-foreground">{l.date.split(" ")[1]}</div>
                  <div className="text-[10px] text-muted-foreground">{l.date.split(" ")[0]}</div>
                </div>
              </div>
              <div className="border-t p-2.5">
                <button
                  type="button"
                  onClick={(event) => openListingMessaging(event, l.messagingLink)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border bg-muted py-2 text-xs font-semibold text-foreground"
                >
                  <MessageCircle className="size-3.5" />
                  Join {l.messagingPlatform === "whatsapp" ? "WhatsApp" : "LINE"} group
                </button>
              </div>
            </button>
          );
        })}
      </div>
      <ScreenHint title="Going Tab" description="List of events the member has joined, with attendance stats and quick access." />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
