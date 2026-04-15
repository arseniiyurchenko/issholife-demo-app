import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { SuggestionCard } from "./SuggestionCard";

export interface CoachSuggestion {
  id: string;
  title: string;
  description: string;
}

interface Props {
  sectionTitle: string;
  introVisible?: boolean;
  open: boolean;
  suggestions: CoachSuggestion[];
  reviewedSuggestionIds: string[];
  onToggle: () => void;
  onAddSuggestion: (suggestion: CoachSuggestion) => void;
  onReviewLaterSuggestion: (suggestionId: string) => void;
  onSkipSuggestion: (suggestionId: string) => void;
  children?: ReactNode;
}

export function CoachPrompt({
  sectionTitle,
  introVisible = false,
  open,
  suggestions,
  reviewedSuggestionIds,
  onToggle,
  onAddSuggestion,
  onReviewLaterSuggestion,
  onSkipSuggestion,
  children,
}: Props) {
  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--il-pro)]"
      >
        <Sparkles className="size-3.5" />
        Not sure? Get a suggestion
      </button>

      {open && (
        <div className="mt-2 rounded-xl border bg-[var(--il-pro-bg)]/60 p-3">
          <div className="text-[11px] font-bold uppercase tracking-wide text-[var(--il-pro)]">
            IsshoLife Coach · {sectionTitle}
          </div>
          {introVisible && (
            <p className="mt-1 text-xs text-muted-foreground">
              I&apos;m a subject matter expert in shared-time experiences. When you&apos;re not
              sure, ask me for a suggestion.
            </p>
          )}

          <div className="mt-2 space-y-2">
            {suggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                title={suggestion.title}
                description={suggestion.description}
                onAdd={() => onAddSuggestion(suggestion)}
                onReviewLater={() => onReviewLaterSuggestion(suggestion.id)}
                onSkip={() => onSkipSuggestion(suggestion.id)}
                reviewedLater={reviewedSuggestionIds.includes(suggestion.id)}
              />
            ))}
          </div>

          {children ? <div className="mt-2">{children}</div> : null}
        </div>
      )}
    </div>
  );
}
