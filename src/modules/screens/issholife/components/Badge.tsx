interface Props {
  type: "community" | "pro" | "tour" | "stay";
  sub?: string;
}

const STYLES: Record<Props["type"], { bg: string; text: string }> = {
  community: { bg: "bg-[var(--il-community-bg)]", text: "text-[var(--il-community)]" },
  pro: { bg: "bg-[var(--il-pro-bg)]", text: "text-[var(--il-pro)]" },
  tour: { bg: "bg-[var(--il-tour-bg)]", text: "text-[var(--il-tour)]" },
  stay: { bg: "bg-[var(--il-stay-bg)]", text: "text-[var(--il-stay)]" },
};

export function Badge({ type, sub }: Props) {
  const s = STYLES[type];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide ${s.bg} ${s.text}`}
    >
      <span className={`size-1.5 rounded-full bg-current`} />
      {type}
      {sub ? ` \u00b7 ${sub}` : ""}
    </span>
  );
}
