import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Clock, Users, MessageCircle, MessageCircleQuestion, Car, Bus, CheckCircle } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { LISTINGS, RIDES } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { Badge } from "../components/Badge";
import { RidePoolCard } from "../components/RidePoolCard";
import { EventChat } from "../components/EventChat";
import { JoinSheet } from "../components/JoinSheet";
import { useIsshoLife } from "../issholife-context";

export function ListingDetailMemberScreen() {
  const { t, lang } = useI18n();
  const hints = useBackendHints();
  const { joinedIds, joinListing } = useIsshoLife();
  const l = LISTINGS[0];
  const title = lang === "ja" ? l.titleJa : l.title;
  const desc = lang === "ja" ? l.descriptionJa : l.description;
  const isJoined = joinedIds.includes(l.id);

  const [showChat, setShowChat] = useState(false);
  const [showRides, setShowRides] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <ArrowLeft className="size-4 text-muted-foreground" />
          <span className="truncate text-xs font-semibold text-foreground">{title}</span>
        </div>
      </div>

      <div className="relative h-44 bg-cover bg-center" style={{ backgroundImage: `url('${l.image}')` }}>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pt-5 pb-3">
          <Badge type={l.type} sub={l.sub} />
          <h1 className="mt-1.5 text-xl font-extrabold text-white">{title}</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{l.area}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="size-3" />{l.date}</span>
          <span className="inline-flex items-center gap-1"><Clock className="size-3" />{l.time}</span>
          <span className="inline-flex items-center gap-1"><Users className="size-3" />{l.attendees}/{l.maxAttendees}</span>
          {l.price && <span className="font-bold text-[var(--il-pro)]">{l.price}</span>}
        </div>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {l.tags.map((tag) => (
            <span key={tag} className="rounded-md border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">#{tag}</span>
          ))}
        </div>

        <div className="mb-3 rounded-xl border bg-card p-4">
          <h3 className="mb-1.5 text-xs font-bold text-foreground">{t("listing.about")}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
        </div>

        <div className="mb-3 rounded-xl border bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-foreground">
            <Car className="size-3.5" />
            {t("listing.transport")}
          </h3>
          {l.transport === "organizer" ? (
            <>
              <div className="mb-1 flex items-center gap-1.5 rounded-md bg-[var(--il-going-bg)] px-3 py-2 text-xs text-[var(--il-going)]">
                <Bus className="size-3.5" />
                {t("listing.organizerProvides")}
              </div>
              <div className="text-xs text-muted-foreground">{l.transportNote}</div>
            </>
          ) : (
            <div className="text-xs text-muted-foreground">{t("listing.selfOrganized")}</div>
          )}
          <button
            onClick={() => setShowRides(!showRides)}
            className="mt-2.5 w-full rounded-lg border bg-muted py-2 text-xs font-semibold text-muted-foreground"
          >
            {t("ride.pool")} ({RIDES.length})
          </button>
          {showRides && (
            <div className="mt-2.5">
              {RIDES.map((r) => <RidePoolCard key={r.id} ride={r} />)}
              <div className="mt-1.5 rounded-md bg-muted p-2 text-center text-[10.5px] text-muted-foreground">
                {t("ride.costSplitOnly")}
              </div>
            </div>
          )}
        </div>

        <div className="mb-3 flex items-center gap-2.5 rounded-xl border bg-card p-4">
          <div className="flex size-9 items-center justify-center rounded-full bg-[var(--il-community-bg)] text-xs font-bold text-[var(--il-community)]">
            {l.organizer.charAt(0)}
          </div>
          <div>
            <div className="text-xs font-semibold text-foreground">{l.organizer}</div>
            <div className="text-[11px] text-muted-foreground">{t("listing.verified")} &middot; {l.area}</div>
          </div>
        </div>

        {l.type === "pro" && (
          <div className="mb-3 rounded-xl bg-[var(--il-pro-bg)] p-3 text-xs text-[var(--il-pro)]">
            <MessageCircleQuestion className="mr-1 inline size-3.5" />
            {t("listing.askPartner")}
          </div>
        )}

        {!isJoined ? (
          <button
            onClick={() => setJoinOpen(true)}
            className="w-full rounded-xl bg-[var(--il-accent)] py-3.5 text-sm font-extrabold text-white shadow-md"
          >
            {t("join.joinEvent")}
          </button>
        ) : (
          <div>
            <div className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-[var(--il-going)]/15 bg-[var(--il-going-bg)] py-3.5 text-sm font-extrabold text-[var(--il-going)]">
              <CheckCircle className="size-4" />
              {t("join.youreGoing")}
            </div>
            <button
              onClick={() => setShowChat(!showChat)}
              className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border bg-card py-2.5 text-xs font-semibold text-foreground"
            >
              <MessageCircle className="size-3.5" />
              {showChat ? t("chat.closeChat") : t("chat.openChat")}
              {l.chat.length > 0 && ` (${l.chat.length})`}
            </button>
          </div>
        )}

        {showChat && isJoined && (
          <EventChat messages={l.chat} attendeeCount={l.attendees + 1} />
        )}
      </div>

      <JoinSheet
        listing={l}
        open={joinOpen}
        onOpenChange={setJoinOpen}
        onConfirm={() => {
          joinListing(l.id);
          setJoinOpen(false);
          hints.push(`Join Record created for "${l.title}". Transport status: organizer. Identity revealed. Chat access granted.`);
        }}
      />

      <ScreenHint
        title="Listing Detail (Member)"
        description="Full member view with join flow, transport selection, event chat, and ride share pool."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
