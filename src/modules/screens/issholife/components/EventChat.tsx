import { useState } from "react";
import { Megaphone, Send } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import type { ChatMessage } from "@/modules/core/issholife-data";

interface Props {
  messages: ChatMessage[];
  attendeeCount: number;
}

export function EventChat({ messages, attendeeCount }: Props) {
  const { t } = useI18n();
  const [input, setInput] = useState("");

  return (
    <div className="mt-2.5 overflow-hidden rounded-xl border bg-card">
      <div className="border-b bg-muted px-3.5 py-2.5 text-xs font-bold text-foreground">
        {t("chat.eventChat")} &middot; {attendeeCount}
      </div>
      <div className="max-h-56 overflow-auto p-3.5">
        {messages.length > 0 ? (
          messages.map((m, i) => (
            <div key={i} className="mb-2.5">
              <div className="mb-0.5 flex items-center gap-1.5">
                <span
                  className={`text-[11px] font-bold ${
                    m.isAnnouncement
                      ? "text-[var(--il-accent)]"
                      : "text-[var(--il-community)]"
                  }`}
                >
                  {m.isAnnouncement && (
                    <Megaphone className="mr-0.5 inline size-3" />
                  )}
                  {m.from}
                </span>
                <span className="text-[9.5px] text-muted-foreground">
                  {m.time}
                </span>
              </div>
              <div
                className={`rounded-lg px-3 py-2 text-xs leading-relaxed text-muted-foreground ${
                  m.isAnnouncement ? "bg-[var(--il-accent-bg)]" : "bg-background"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))
        ) : (
          <div className="py-5 text-center text-xs text-muted-foreground">
            {t("chat.noMessages")}
          </div>
        )}
      </div>
      <div className="flex gap-1.5 border-t p-2.5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("chat.placeholder")}
          className="flex-1 rounded-lg border bg-background px-3 py-2 text-xs outline-none"
        />
        <button className="rounded-lg bg-[var(--il-accent)] px-4 py-2 text-xs font-semibold text-white">
          <Send className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
