import { useLocation, useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { getIsshoLifeBottomTabs } from "./bottom-tabs-config";

interface Props {
  isPublic: boolean;
  goingCount?: number;
}

export function BottomTabsNav({ isPublic, goingCount = 0 }: Props) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabs = getIsshoLifeBottomTabs({ pathname, isPublic, t });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card md:hidden">
      <div className="mx-auto flex max-w-[520px] border-x [&>button]:pb-[max(0.25rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isGoingTabWithBadge = tab.key === "going" && goingCount > 0;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => navigate(tab.to)}
              className={`relative flex min-h-16 flex-1 flex-col items-center justify-center gap-1 px-2 pt-2 text-[11px] transition-colors ${
                tab.isActive ? "text-[var(--il-accent)]" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-4" />
              <span className={tab.isActive ? "font-bold" : "font-medium"}>
                {tab.label}
              </span>
              {isGoingTabWithBadge && (
                <span className="absolute right-3 top-1.5 rounded-full bg-[var(--il-going-bg)] px-1.5 py-px text-[10px] font-bold text-[var(--il-going)]">
                  {goingCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
