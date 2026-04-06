import { MessageCircle, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { LISTINGS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";

export function MemberChatThreadsScreen() {
  const { lang, t } = useI18n();
  const navigate = useNavigate();

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-3">
        <h2 className="text-sm font-bold text-foreground">{t("chat.openChat")}</h2>
      </div>
      <div className="p-4">
        {LISTINGS.map((listing) => {
          const listingTitle = lang === "ja" ? listing.titleJa : listing.title;

          return (
            <button
              key={listing.id}
              type="button"
              onClick={() => navigate(`/screens/member/chat/${listing.id}`)}
              className="mb-3 flex w-full items-center justify-between rounded-xl border bg-card p-3 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <div className="text-sm font-bold text-foreground">{listingTitle}</div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Users className="size-3.5" />
                    {listing.attendees + 1}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="size-3.5" />
                    {listing.chat.length}
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[var(--il-accent)]">
                {t("chat.openChat")}
              </span>
            </button>
          );
        })}
      </div>
      <ScreenHint
        title="Member Chat Threads"
        description="Threads list for member event chats. Opens existing event chat route by listing id."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
