interface Props {
  title: string;
  description: string;
  onAdd: () => void;
  onReviewLater: () => void;
  onSkip: () => void;
  reviewedLater?: boolean;
}

export function SuggestionCard({
  title,
  description,
  onAdd,
  onReviewLater,
  onSkip,
  reviewedLater = false,
}: Props) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="text-xs font-bold text-foreground">{title}</div>
      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{description}</p>

      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={onAdd}
          className="rounded-md bg-[var(--il-accent)] px-2.5 py-1.5 text-[11px] font-bold text-white"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onReviewLater}
          className="rounded-md border bg-card px-2.5 py-1.5 text-[11px] font-semibold text-foreground"
        >
          Review Later
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="rounded-md border bg-card px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground"
        >
          Skip
        </button>
      </div>

      {reviewedLater && (
        <div className="mt-2 text-[11px] font-semibold text-[var(--il-accent)]">
          Saved for review later.
        </div>
      )}
    </div>
  );
}
