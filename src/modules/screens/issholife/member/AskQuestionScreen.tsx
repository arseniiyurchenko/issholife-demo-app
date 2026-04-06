import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { Badge } from "../components/Badge";

export function AskQuestionScreen() {
  const { t } = useI18n();
  const [text, setText] = useState("");

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <ArrowLeft className="size-4 text-muted-foreground" />
          <span className="text-xs font-semibold text-foreground">Ask a Question</span>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4 flex items-center gap-3 rounded-xl border bg-card p-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-[var(--il-pro-bg)] text-sm font-bold text-[var(--il-pro)]">T</div>
          <div>
            <div className="text-sm font-semibold text-foreground">TrailBlaze JP</div>
            <Badge type="pro" sub="Experience" />
          </div>
        </div>

        <div className="mb-2 text-xs font-bold text-foreground">Your Question</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What would you like to know?"
          rows={5}
          className="w-full rounded-xl border bg-background p-4 text-sm outline-none"
        />

        <div className="mb-3 mt-2 flex flex-wrap gap-1.5">
          {["Pricing", "Difficulty", "Equipment", "Schedule"].map((chip) => (
            <button
              key={chip}
              onClick={() => setText((prev) => prev + (prev ? " " : "") + chip + "?")}
              className="rounded-full border bg-muted px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-accent"
            >
              {chip}
            </button>
          ))}
        </div>

        <button
          disabled={!text.trim()}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold ${
            text.trim() ? "bg-[var(--il-accent)] text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          <Send className="size-4" />
          Submit Question
        </button>

        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          AI will attempt to answer first. Partner will be notified if escalated.
        </p>
      </div>
      <ScreenHint title="Ask Question" description="Question composer for Partner Q&A. Context-aware with suggestion chips. Submit triggers AI-first response." />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
