import { ArrowLeft, Bot, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { Badge } from "../components/Badge";

const THREADS = [
  { id: 1, question: "What MTB skill level is actually needed?", answer: "Trail 2 experience is ideal. We provide gear briefing before departure. Beginners welcome if comfortable on dirt paths.", status: "answered", aiHandled: true, time: "3h ago" },
  { id: 2, question: "Can I bring my own bike?", answer: "Yes! We have a bike rack at the meeting point. Discount of ¥3,000 if you bring your own.", status: "answered", aiHandled: false, time: "1d ago" },
  { id: 3, question: "Is lunch included? Any dietary accommodations?", answer: null, status: "open", aiHandled: false, time: "2h ago" },
];

export function PartnerQAThreadScreen() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-2.5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2.5"
        >
          <ArrowLeft className="size-4 text-muted-foreground" />
          <div className="flex-1">
            <span className="text-xs font-semibold text-foreground">TrailBlaze JP</span>
            <span className="ml-2 text-[10px] text-muted-foreground">Q&A</span>
          </div>
          <Badge type="pro" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-3 rounded-lg bg-muted p-3 text-[11px] text-muted-foreground">
          Partner Q&A room. Any member can ask questions. AI-first responses with partner escalation.
        </div>

        {THREADS.map((thread) => (
          <div key={thread.id} className="mb-3 rounded-xl border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <User className="size-3.5 text-[var(--il-community)]" />
              <span className="text-xs font-semibold text-foreground">{thread.question}</span>
            </div>
            {thread.answer ? (
              <div className="rounded-lg bg-background p-3">
                <div className="mb-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  {thread.aiHandled ? (
                    <><Bot className="size-3" /><span className="rounded bg-[var(--il-pro-bg)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--il-pro)]">AI</span></>
                  ) : (
                    <span className="font-semibold text-[var(--il-pro)]">TrailBlaze JP</span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{thread.answer}</p>
              </div>
            ) : (
              <div className="rounded-lg bg-[var(--il-accent-bg)] p-2.5 text-[11px] text-[var(--il-accent)]">
                Waiting for response...
              </div>
            )}
            <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{thread.time}</span>
              <span className={`rounded px-1.5 py-0.5 font-semibold ${
                thread.status === "answered" ? "bg-[var(--il-going-bg)] text-[var(--il-going)]" : "bg-[var(--il-accent-bg)] text-[var(--il-accent)]"
              }`}>{thread.status}</span>
            </div>
          </div>
        ))}

        <div className="mt-2 flex gap-1.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
          />
          <button className="rounded-lg bg-[var(--il-accent)] px-4 text-xs font-semibold text-white">
            Ask
          </button>
        </div>
      </div>
      <ScreenHint title="Partner Q&A Thread" description="Single Q&A room per Partner. Threads are member-initiated. AI-first responses with partner escalation." />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
