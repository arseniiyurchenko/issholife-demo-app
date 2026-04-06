import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { LISTINGS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { EventChat } from "../components/EventChat";

export function EventChatScreen() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const { id } = useParams();
  const listingId = Number(id);
  const l = LISTINGS.find((listing) => listing.id === listingId) ?? LISTINGS[0];
  const title = lang === "ja" ? l.titleJa : l.title;

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
      <div className="p-4">
        <EventChat messages={l.chat} attendeeCount={l.attendees + 1} />
      </div>
      <ScreenHint
        title="Event Chat"
        description="Contextual event chat with announcements (organizer-only) and logistics (all attendees) channels."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
