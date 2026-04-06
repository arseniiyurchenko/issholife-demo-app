import { Bot, Check, Reply } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { PartnerLayout } from "../components/PartnerLayout";

const QUESTIONS = [
  { id: 1, from: "Verified member", question: "What MTB skill level is actually needed?", aiDraft: "Trail 2 experience is ideal. We provide a gear briefing before departure.", status: "needs-review", time: "3h ago" },
  { id: 2, from: "Verified member", question: "Can I bring my own bike?", aiDraft: null, status: "escalated", time: "5h ago" },
  { id: 3, from: "Verified member", question: "Is lunch included? Any dietary accommodations?", aiDraft: "Lunch is included. We can accommodate vegetarian and vegan diets with advance notice.", status: "needs-review", time: "1d ago" },
  { id: 4, from: "Verified member", question: "What's the cancellation policy?", aiDraft: null, status: "answered", time: "2d ago" },
];

export function PartnerQAInboxScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();

  return (
    <PartnerLayout>
      <div className="p-6">
        <h1 className="mb-1 text-xl font-bold text-foreground">{t("partner.qaInbox")}</h1>
        <p className="mb-6 text-sm text-muted-foreground">{t("partner.incomingQuestions")}</p>

        <div className="space-y-3">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="rounded-xl border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{q.from} &middot; {q.time}</span>
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                  q.status === "needs-review" ? "bg-[var(--il-accent-bg)] text-[var(--il-accent)]"
                    : q.status === "escalated" ? "bg-destructive/10 text-destructive"
                    : "bg-[var(--il-going-bg)] text-[var(--il-going)]"
                }`}>
                  {q.status}
                </span>
              </div>
              <p className="mb-3 text-sm font-semibold text-foreground">{q.question}</p>

              {q.aiDraft && (
                <div className="mb-3 rounded-lg bg-[var(--il-pro-bg)] p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] text-[var(--il-pro)]">
                    <Bot className="size-3" />
                    AI Draft Response
                  </div>
                  <p className="text-xs text-muted-foreground">{q.aiDraft}</p>
                </div>
              )}

              <div className="flex gap-2">
                {q.aiDraft && (
                  <button
                    onClick={() => hints.push(`AI answer approved for question: "${q.question}". Response published.`)}
                    className="flex items-center gap-1 rounded-lg bg-[var(--il-going)] px-3 py-1.5 text-xs font-bold text-white"
                  >
                    <Check className="size-3.5" />
                    {t("partner.approveAI")}
                  </button>
                )}
                <button
                  onClick={() => hints.push(`Reply sent for question: "${q.question}".`)}
                  className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold text-foreground"
                >
                  <Reply className="size-3.5" />
                  {t("partner.reply")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScreenHint title="Q&A Inbox" description="Partner inbox with incoming questions. AI drafts responses for approval. Partner can reply or escalate." />
      <BackendHintButton />
    </PartnerLayout>
  );
}
