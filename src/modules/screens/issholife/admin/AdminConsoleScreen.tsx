import { useState } from "react";
import { Settings, ToggleLeft, ToggleRight, Tag } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { AdminLayout } from "../components/AdminLayout";

const FEATURE_TOGGLES = [
  { key: "stay_injection", label: "Stay Feed Injection", desc: "Inject Stay cards into main feed (max 20%)", default: true },
  { key: "ai_qa", label: "AI Q&A Responses", desc: "AI-first responses in Partner Q&A rooms", default: false },
  { key: "social_proof", label: "Social Proof Signals", desc: "Show join count and activity indicators", default: true },
  { key: "freshness", label: "Feed Freshness Algorithm", desc: "12-hour coalescing window for ranking bumps", default: true },
  { key: "media", label: "Media System", desc: "Partner video generation and distribution", default: false },
];

const TAXONOMY = [
  { name: "Hiking", count: 23, status: "active" },
  { name: "Cycling", count: 18, status: "active" },
  { name: "Skiing", count: 15, status: "active" },
  { name: "Yoga", count: 12, status: "active" },
  { name: "Outdoor Cooking", count: 2, status: "dormant" },
  { name: "Paragliding", count: 1, status: "dormant" },
];

export function AdminConsoleScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(FEATURE_TOGGLES.map((f) => [f.key, f.default]))
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-1 text-xl font-bold text-foreground">{t("admin.console")}</h1>
        <p className="mb-6 text-sm text-muted-foreground">Platform operations and configuration</p>

        <div className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
            <Settings className="size-4" />
            {t("admin.featureToggles")}
          </h2>
          <div className="space-y-2">
            {FEATURE_TOGGLES.map((f) => {
              const isOn = toggles[f.key];
              return (
                <div key={f.key} className="flex items-center justify-between rounded-lg border bg-card p-4">
                  <div>
                    <div className="text-sm font-semibold text-foreground">{f.label}</div>
                    <div className="text-xs text-muted-foreground">{f.desc}</div>
                  </div>
                  <button
                    onClick={() => {
                      setToggles((prev) => ({ ...prev, [f.key]: !isOn }));
                      hints.push(`Feature "${f.label}" ${isOn ? "disabled" : "enabled"}.`);
                    }}
                    className={isOn ? "text-[var(--il-going)]" : "text-muted-foreground"}
                  >
                    {isOn ? <ToggleRight className="size-8" /> : <ToggleLeft className="size-8" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
            <Tag className="size-4" />
            {t("admin.taxonomy")}
          </h2>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-left text-xs">
              <thead className="border-b bg-muted">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Interest</th>
                  <th className="px-4 py-2.5 font-semibold">Listings</th>
                  <th className="px-4 py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {TAXONOMY.map((t) => (
                  <tr key={t.name} className="border-b last:border-0">
                    <td className="px-4 py-2.5 font-medium text-foreground">{t.name}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{t.count}</td>
                    <td className="px-4 py-2.5">
                      <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        t.status === "active" ? "bg-[var(--il-going-bg)] text-[var(--il-going)]" : "bg-muted text-muted-foreground"
                      }`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ScreenHint title="Admin Console" description="Admin hub with feature toggles, taxonomy moderation, and entitlements management." />
      <BackendHintButton />
    </AdminLayout>
  );
}
