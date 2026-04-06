import { Calendar, MessageCircle, Users } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { LISTINGS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { Badge } from "../components/Badge";

export function GoingTabScreen() {
  const { t, lang } = useI18n();
  const joinedListings = LISTINGS.slice(0, 2);

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-3">
        <h2 className="text-sm font-bold text-foreground">{t("feed.going")}</h2>
      </div>
      <div className="p-4">
        {joinedListings.map((l) => {
          const title = lang === "ja" ? l.titleJa : l.title;
          return (
            <div key={l.id} className="mb-3 overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="flex items-center gap-3 p-3.5">
                <div
                  className="size-13 shrink-0 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url('${l.image}')`, width: 52, height: 52 }}
                />
                <div className="flex-1">
                  <div className="text-sm font-bold text-[var(--il-going)]">{title}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    {l.date} &middot; {l.time}
                  </div>
                  {l.transport === "organizer" && (
                    <div className="mt-0.5 text-[11px] text-[var(--il-community)]">{l.transportNote}</div>
                  )}
                </div>
                <span className="rounded-md bg-[var(--il-going-bg)] px-2.5 py-1 text-[10px] font-bold text-[var(--il-going)]">
                  Going
                </span>
              </div>
              <div className="flex border-t">
                <div className="flex-1 border-r py-2.5 text-center">
                  <div className="text-base font-extrabold text-foreground">{l.attendees + 1}</div>
                  <div className="text-[10px] text-muted-foreground">{t("common.attendees")}</div>
                </div>
                <div className="flex-1 border-r py-2.5 text-center">
                  <div className="text-base font-extrabold text-foreground">{l.chat.length}</div>
                  <div className="text-[10px] text-muted-foreground">{t("common.messages")}</div>
                </div>
                <div className="flex-1 py-2.5 text-center">
                  <div className="text-base font-extrabold text-foreground">{l.date.split(" ")[1]}</div>
                  <div className="text-[10px] text-muted-foreground">{l.date.split(" ")[0]}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ScreenHint title="Going Tab" description="List of events the member has joined, with attendance stats and quick access." />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
