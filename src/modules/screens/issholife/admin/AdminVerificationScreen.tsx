import { Check, X, Clock, ShieldCheck } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { AdminLayout } from "../components/AdminLayout";

const SUBMISSIONS = [
  { id: 1, name: "TrailBlaze JP", type: "Partner", submitted: "Apr 2", status: "pending", docs: "Business license, insurance certificate" },
  { id: 2, name: "Yuki M.", type: "Organizer", submitted: "Apr 3", status: "pending", docs: "Government ID, first aid certificate" },
  { id: 3, name: "Zen Garden Studio", type: "Partner", submitted: "Mar 28", status: "verified", docs: "Business license" },
  { id: 4, name: "Kenji T.", type: "Organizer", submitted: "Mar 25", status: "verified", docs: "Government ID" },
];

export function AdminVerificationScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-1 text-xl font-bold text-foreground">{t("admin.verification")}</h1>
        <p className="mb-6 text-sm text-muted-foreground">Review organizer and partner verification submissions</p>

        <div className="space-y-3">
          {SUBMISSIONS.map((s) => (
            <div key={s.id} className="rounded-xl border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">{s.name}</span>
                  <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{s.type}</span>
                </div>
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                  s.status === "pending" ? "bg-[var(--il-accent-bg)] text-[var(--il-accent)]" : "bg-[var(--il-going-bg)] text-[var(--il-going)]"
                }`}>{s.status}</span>
              </div>
              <div className="mb-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="size-3" />Submitted {s.submitted}</span>
              </div>
              <div className="mb-3 text-xs text-muted-foreground">
                Documents: {s.docs}
              </div>
              {s.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => hints.push(`${s.name} verified as ${s.type}. Badge ${s.type === "Partner" ? "visible to members" : "internal only"}.`)}
                    className="flex items-center gap-1 rounded-lg bg-[var(--il-going)] px-3 py-1.5 text-xs font-bold text-white"
                  >
                    <Check className="size-3.5" /> Verify
                  </button>
                  <button
                    onClick={() => hints.push(`${s.name} verification denied. Notification sent.`)}
                    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold text-destructive"
                  >
                    <X className="size-3.5" /> Deny
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <ScreenHint title="Admin Verification" description="Review and approve organizer/partner verification submissions. Separate workflows for each type." />
      <BackendHintButton />
    </AdminLayout>
  );
}
