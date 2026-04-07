import { useState } from "react";
import { Eye, EyeOff, MessageCircleQuestion, TrendingUp } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { LISTINGS } from "@/modules/core/issholife-data";
import { PartnerLayout } from "../components/PartnerLayout";
import { Badge } from "../components/Badge";

export function PartnerDashboardScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();
  const managedListings = LISTINGS.filter((l) => l.type === "pro" || l.type === "tour");
  const [availability, setAvailability] = useState<Record<number, boolean>>({ 2: true, 4: true, 6: true });

  return (
    <PartnerLayout>
      <div className="p-6">
        <h1 className="mb-1 text-xl font-bold text-foreground">{t("partner.dashboard")}</h1>
        <p className="mb-6 text-sm text-muted-foreground">TrailBlaze JP &middot; Pro Partner</p>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Active Listings", value: "2", icon: TrendingUp },
            { label: "Open Questions", value: "5", icon: MessageCircleQuestion },
            { label: "Total Joins", value: "47", icon: Eye },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border bg-card p-4">
                <Icon className="mb-2 size-5 text-muted-foreground" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <h2 className="mb-3 text-sm font-bold text-foreground">Your Listings</h2>
        <div className="space-y-3">
          {managedListings.map((l) => {
            const isOn = availability[l.id] ?? true;
            const priceColorClass = l.type === "tour" ? "text-[var(--il-tour)]" : "text-[var(--il-pro)]";
            return (
              <div key={l.id} className="flex items-center gap-4 rounded-xl border bg-card p-4">
                <div
                  className="size-16 shrink-0 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url('${l.image}')` }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge type={l.type} sub={l.sub} />
                    {l.price && <span className={`text-xs font-bold ${priceColorClass}`}>{l.price}</span>}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{l.title}</div>
                  <div className="text-xs text-muted-foreground">{l.area} &middot; {l.date} &middot; {l.attendees}/{l.maxAttendees}</div>
                </div>
                <button
                  onClick={() => {
                    setAvailability((prev) => ({ ...prev, [l.id]: !isOn }));
                    hints.push(`Availability toggled ${isOn ? "OFF" : "ON"} for "${l.title}". ${isOn ? "Removed from feed." : "Now visible in feed."}`);
                  }}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold ${
                    isOn ? "bg-[var(--il-going-bg)] text-[var(--il-going)]" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isOn ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                  {isOn ? t("partner.on") : t("partner.off")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <ScreenHint title="Partner Dashboard" description="Partner listing management with availability toggles, stats overview, and Q&A access." />
      <BackendHintButton />
    </PartnerLayout>
  );
}
