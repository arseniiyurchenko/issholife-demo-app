import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { LISTINGS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { EventChat } from "../components/EventChat";

export function EventChatScreen() {
  const { lang } = useI18n();
  const l = LISTINGS[0];
  const title = lang === "ja" ? l.titleJa : l.title;

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <ArrowLeft className="size-4 text-muted-foreground" />
          <span className="truncate text-xs font-semibold text-foreground">{title}</span>
        </div>
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
