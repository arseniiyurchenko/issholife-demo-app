import type { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  ShieldCheck,
  Shield,
  Globe,
} from "lucide-react";

const NAV = [
  { href: "/screens/admin", label: "Console", icon: LayoutDashboard },
  { href: "/screens/admin/verification", label: "Verification", icon: ShieldCheck },
  { href: "/screens/admin/moderation", label: "Moderation", icon: Shield },
];

export function AdminLayout({ children }: PropsWithChildren) {
  const location = useLocation();

  return (
    <div className="flex min-h-svh">
      <aside className="hidden w-56 shrink-0 border-r bg-card md:block">
        <div className="flex items-center gap-2 border-b px-5 py-4">
          <Globe className="size-5 text-[var(--il-accent)]" />
          <span className="text-sm font-black text-foreground">
            IsshoLife
          </span>
          <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
            Admin
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
                    ? "bg-primary/10 font-semibold text-foreground"
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
