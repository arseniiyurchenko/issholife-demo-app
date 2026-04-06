import { Compass, CheckCircle, Home } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";

export type FeedTab = "discover" | "going" | "stay";

interface Props {
  active: FeedTab;
  onChange: (tab: FeedTab) => void;
  goingCount?: number;
}

const TABS: { key: FeedTab; labelKey: string; icon: React.ElementType }[] = [
  { key: "discover", labelKey: "feed.discover", icon: Compass },
  { key: "going", labelKey: "feed.going", icon: CheckCircle },
  { key: "stay", labelKey: "feed.stay", icon: Home },
];

export function FeedTabs({ active, onChange, goingCount = 0 }: Props) {
  const { t } = useI18n();

  return (
    <div className="flex border-b bg-card">
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs transition-colors ${
              isActive
                ? "border-b-2 border-[var(--il-accent)] font-bold text-foreground"
                : "border-b-2 border-transparent text-muted-foreground"
            }`}
          >
            <Icon className="size-3.5" />
            {t(tab.labelKey)}
            {tab.key === "going" && goingCount > 0 && (
              <span className="rounded-full bg-[var(--il-going-bg)] px-1.5 py-px text-[10px] font-bold text-[var(--il-going)]">
                {goingCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
