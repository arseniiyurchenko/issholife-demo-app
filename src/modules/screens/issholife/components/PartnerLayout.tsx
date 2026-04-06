import type { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  PlusCircle,
  MessageCircleQuestion,
  Globe,
} from "lucide-react";

const NAV = [
  { href: "/screens/partner", label: "Dashboard", icon: LayoutDashboard },
  { href: "/screens/partner/create", label: "Create Listing", icon: PlusCircle },
  { href: "/screens/partner/qa", label: "Q&A Inbox", icon: MessageCircleQuestion },
];

export function PartnerLayout({ children }: PropsWithChildren) {
  const location = useLocation();

  return (
    <div className="flex min-h-svh">
      <aside className="hidden w-56 shrink-0 border-r bg-card md:block">
        <div className="flex items-center gap-2 border-b px-5 py-4">
          <Globe className="size-5 text-[var(--il-pro)]" />
          <span className="text-sm font-black text-foreground">
            IsshoLife
          </span>
          <span className="ml-auto rounded bg-[var(--il-pro-bg)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--il-pro)]">
            Partner
          </span>
        </div>
        <nav className="space-y-0.5 p-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-[var(--il-pro)]/10 font-semibold text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
