import { AlertTriangle, Check, Flag, Shield } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { AdminLayout } from "../components/AdminLayout";

const REPORTS = [
  { id: 1, type: "Spam", content: "User posted promotional content in event chat", reporter: "Auto-detect", time: "1h ago", severity: "medium" },
  { id: 2, type: "Off-platform deal", content: "User suggested cash payment outside platform", reporter: "Member report", time: "3h ago", severity: "high" },
  { id: 3, type: "Profanity", content: "Blocked message in Partner Q&A thread", reporter: "Auto-detect", time: "5h ago", severity: "low" },
  { id: 4, type: "Safety concern", content: "Ride share post missing required insurance info", reporter: "Member report", time: "1d ago", severity: "high" },
];

export function AdminModerationScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-1 text-xl font-bold text-foreground">{t("admin.moderation")}</h1>
        <p className="mb-6 text-sm text-muted-foreground">Content safety, profanity enforcement, and abuse reports</p>

        <div className="space-y-3">
          {REPORTS.map((r) => (
            <div key={r.id} className="rounded-xl border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flag className={`size-4 ${
                    r.severity === "high" ? "text-destructive" : r.severity === "medium" ? "text-[var(--il-accent)]" : "text-muted-foreground"
                  }`} />
                  <span className="text-sm font-semibold text-foreground">{r.type}</span>
                </div>
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                  r.severity === "high" ? "bg-destructive/10 text-destructive"
                    : r.severity === "medium" ? "bg-[var(--il-accent-bg)] text-[var(--il-accent)]"
                    : "bg-muted text-muted-foreground"
                }`}>{r.severity}</span>
              </div>
              <p className="mb-2 text-xs text-muted-foreground">{r.content}</p>
              <div className="mb-3 flex items-center gap-3 text-[10px] text-muted-foreground">
                <span>{r.reporter}</span>
                <span>{r.time}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => hints.push(`Report "${r.type}" acknowledged and resolved. Content removed.`)}
                  className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
                >
                  <Check className="size-3.5" /> Resolve
                </button>
                <button className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold text-foreground">
                  <AlertTriangle className="size-3.5" /> Escalate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScreenHint title="Admin Moderation" description="Content moderation dashboard with safety reports, profanity enforcement, and off-platform deal detection." />
      <BackendHintButton />
    </AdminLayout>
  );
}
