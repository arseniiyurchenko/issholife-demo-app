import type { PropsWithChildren } from "react";
import { Globe } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { LanguageToggle } from "./LanguageToggle";
import { PublicMemberToggle } from "./PublicMemberToggle";
import { useIsshoLife } from "../issholife-context";
import { getIsshoLifeBottomTabs } from "./bottom-tabs-config";
import { BottomTabsNav } from "./BottomTabsNav";
import { ResponsiveShell } from "./ResponsiveShell";

interface Props extends PropsWithChildren {
  showToggle?: boolean;
  showBottomNav?: boolean;
}

export function IsshoLifeLayout({
  children,
  showToggle = true,
  showBottomNav = true,
}: Props) {
  const { t } = useI18n();
  const { isPublic, setIsPublic, joinedIds } = useIsshoLife();
  const { pathname } = useLocation();
  const isIsshoLifeMainFlow =
    pathname.startsWith("/screens/public") || pathname.startsWith("/screens/member");
  const shouldShowBottomNav = showBottomNav && isIsshoLifeMainFlow;
  const productTabs = isIsshoLifeMainFlow
    ? getIsshoLifeBottomTabs({ pathname, isPublic, t })
    : [];
  const goingCount = joinedIds.length;

  const desktopSidebar =
    productTabs.length > 0 ? (
      <aside className="w-56 shrink-0 border-r bg-card">
        <div className="flex items-center gap-2 border-b px-5 py-4">
          <Globe className="size-5 text-[var(--il-accent)]" />
          <span className="text-sm font-black text-foreground">IsshoLife</span>
          <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
            Demo
          </span>
        </div>
        <nav className="space-y-0.5 p-3">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {t("layout.productNav")}
          </p>
          <div className="space-y-0.5">
            {productTabs.map((tab) => {
              const Icon = tab.icon;
              const showGoingBadge = tab.key === "going" && goingCount > 0;

              return (
                <Link
                  key={tab.key}
                  to={tab.to}
                  className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    tab.isActive
                      ? "bg-primary/10 font-semibold text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="min-w-0 flex-1">{tab.label}</span>
                  {showGoingBadge && (
                    <span className="rounded-full bg-[var(--il-going-bg)] px-1.5 py-px text-[10px] font-bold text-[var(--il-going)]">
                      {goingCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    ) : undefined;

  return (
    <ResponsiveShell
      desktopSidebar={desktopSidebar}
      desktopMainClassName="overflow-auto"
    >
      <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-card px-4 py-2.5 md:px-6">
        <div className="flex items-center gap-2 md:gap-2.5">
          <Globe className="size-5 text-[var(--il-accent)]" />
          <span className="text-base font-black text-foreground">IsshoLife</span>
        </div>
        <div className="flex items-center gap-1.5">
          <LanguageToggle />
          {showToggle && (
            <PublicMemberToggle isPublic={isPublic} onChange={setIsPublic} />
          )}
        </div>
      </div>
      <div
        className={`md:px-6 ${
          shouldShowBottomNav
            ? "pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0"
            : ""
        }`}
      >
        {children}
      </div>
      {shouldShowBottomNav && (
        <BottomTabsNav
          isPublic={isPublic}
          goingCount={joinedIds.length}
        />
      )}
    </ResponsiveShell>
  );
}
