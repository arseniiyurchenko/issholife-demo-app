import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Clock, Users, MessageCircle, MessageCircleQuestion, Car, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { LISTINGS, STAYS } from "@/modules/core/issholife-data";
import type { Stay } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { Badge } from "../components/Badge";
import { JoinSheet } from "../components/JoinSheet";
import { TrustRedirect } from "../components/TrustRedirect";
import { useIsshoLife } from "../issholife-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/modules/shadcn/components/ui/alert-dialog";

export function ListingDetailMemberScreen() {
  const { t, lang } = useI18n();
  const hints = useBackendHints();
  const navigate = useNavigate();
  const { joinListing, cancelParticipation, getParticipationStatus } = useIsshoLife();
  const l = LISTINGS[0];
  const title = lang === "ja" ? l.titleJa : l.title;
  const desc = lang === "ja" ? l.descriptionJa : l.description;
  const participationStatus = getParticipationStatus(l.id);
  const isJoined = participationStatus === "going";
  const messagingLabel = l.messagingPlatform === "whatsapp" ? "WhatsApp" : "LINE";
  const messagingLinkClassName =
    l.messagingPlatform === "whatsapp"
      ? "border-[#25D366]/30 bg-[#25D366]/10 text-[#1f9e4b]"
      : "border-[#06C755]/30 bg-[#06C755]/10 text-[#079744]";

  const [joinOpen, setJoinOpen] = useState(false);
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const nearbyStays = STAYS.filter((stay) => stay.area === l.area);
  const recommendedStays = nearbyStays.length > 0 ? nearbyStays : STAYS.slice(0, 2);

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-2.5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2.5"
        >
          <ArrowLeft className="size-4 text-muted-foreground" />
          <span className="truncate text-xs font-semibold text-foreground">{title}</span>
        </button>
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
          <h3 className="mb-1.5 text-xs font-bold text-foreground">Messaging</h3>
          <p className="text-xs text-muted-foreground">
            Group chat coordination happens on {messagingLabel} after you join.
          </p>
        </div>

        <div className="mb-3 rounded-xl border bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-foreground">
            <Car className="size-3.5" />
            Ride-share
          </h3>
          <div className="text-xs text-muted-foreground">
            Ride-share is coordinated separately and is not included in this listing.
          </div>
          <button
            onClick={() => navigate("/screens/member/rideshare")}
            className="mt-2.5 w-full rounded-lg border bg-muted py-2 text-xs font-semibold text-muted-foreground"
          >
            Open {t("ride.pool")}
          </button>
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

        <div className="mb-3 rounded-xl border bg-card p-4">
          <h3 className="mb-2 text-xs font-bold text-foreground">
            Stay near this event
          </h3>
          <div className="space-y-2">
            {recommendedStays.slice(0, 2).map((stay) => (
              <button
                key={stay.id}
                type="button"
                onClick={() => setSelectedStay(stay)}
                className="flex w-full items-center justify-between rounded-lg border bg-muted/40 px-3 py-2.5 text-left"
              >
                <div>
                  <div className="text-xs font-semibold text-foreground">{stay.title}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {stay.area} · {stay.rating}★
                  </div>
                </div>
                <div className="text-[11px] font-bold text-[var(--il-stay)]">{stay.price}</div>
              </button>
            ))}
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            Book on Trust and return here to continue your event flow.
          </div>
        </div>

        {l.type === "pro" && (
          <div className="mb-3 rounded-xl bg-[var(--il-pro-bg)] p-3 text-xs text-[var(--il-pro)]">
            <MessageCircleQuestion className="mr-1 inline size-3.5" />
            {t("listing.askPartner")}
          </div>
        )}

        {!participationStatus ? (
          <button
            onClick={() => setJoinOpen(true)}
            className="w-full rounded-xl bg-[var(--il-accent)] py-3.5 text-sm font-extrabold text-white shadow-md"
          >
            {t("join.joinEvent")}
          </button>
        ) : (
          <div>
            {isJoined ? (
              <div className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-[var(--il-going)]/15 bg-[var(--il-going-bg)] py-3.5 text-sm font-extrabold text-[var(--il-going)]">
                <CheckCircle className="size-4" />
                {t("join.youreGoing")}
              </div>
            ) : (
              <div className="w-full rounded-xl border border-destructive/25 bg-destructive/10 py-3.5 text-center text-sm font-extrabold text-destructive">
                Participation cancelled
              </div>
            )}
            {isJoined && (
              <a
                href={l.messagingLink}
                target="_blank"
                rel="noreferrer"
                className={`mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border py-2.5 text-xs font-semibold ${messagingLinkClassName}`}
              >
                <MessageCircle className="size-3.5" />
                Join Group Chat ({messagingLabel})
              </a>
            )}
            {isJoined && (
              <button
                onClick={() => setCancelDialogOpen(true)}
                className="mt-2.5 w-full rounded-lg border border-destructive/30 bg-destructive/5 py-2.5 text-xs font-semibold text-destructive"
              >
                Cancel participation
              </button>
            )}
          </div>
        )}
      </div>

      <JoinSheet
        listing={l}
        open={joinOpen}
        onOpenChange={setJoinOpen}
        onConfirm={() => {
          joinListing(l.id);
          hints.push(`Join Record created for "${l.title}". Identity revealed. Group chat handoff enabled.`);
        }}
      />

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel participation?</AlertDialogTitle>
            <AlertDialogDescription>
              You will stay in this event with cancelled status and can still open details.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep participation</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                cancelParticipation(l.id);
                hints.push(`Participation for "${l.title}" marked as cancelled.`);
              }}
            >
              Confirm cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ScreenHint
        title="Listing Detail (Member)"
        description="Full member view with join flow, external messaging handoff, and separate ride-share access."
      />
      <BackendHintButton />

      {selectedStay && (
        <div className="fixed inset-0 z-[120] bg-background">
          <TrustRedirect stay={selectedStay} onBack={() => setSelectedStay(null)} />
        </div>
      )}
    </IsshoLifeLayout>
  );
}
