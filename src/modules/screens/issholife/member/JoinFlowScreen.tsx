import { useState } from "react";
import { Car, ShieldAlert, CheckCircle } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { LISTINGS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";

export function JoinFlowScreen() {
  const { t, lang } = useI18n();
  const hints = useBackendHints();
  const l = LISTINGS[0];
  const title = lang === "ja" ? l.titleJa : l.title;
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <IsshoLifeLayout showToggle={false}>
        <div className="flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: 400 }}>
          <CheckCircle className="mb-4 size-16 text-[var(--il-going)]" />
          <h2 className="mb-2 text-xl font-extrabold text-foreground">{t("join.youreGoing")}</h2>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{l.date} &middot; {l.time} &middot; {l.area}</p>
        </div>
        <ScreenHint title="Join Flow" description="Join confirmation step for event participation." />
        <BackendHintButton />
      </IsshoLifeLayout>
    );
  }

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="p-5">
        <h2 className="mb-1 text-lg font-extrabold text-foreground">{t("join.joinEvent")}</h2>
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="mb-5 text-xs text-muted-foreground">{l.date} &middot; {l.time} &middot; {l.area}</div>

        <div className="rounded-xl border bg-muted/40 p-3 text-left">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-foreground">
            <Car className="size-3.5 text-[var(--il-accent)]" />
            Ride-share is separate
          </div>
          <div className="text-[11px] text-muted-foreground">
            If needed, coordinate rides from the dedicated ride-share area after joining.
          </div>
        </div>

        <button
          onClick={() => {
            setConfirmed(true);
            hints.push("Join Record created. Identity revealed. Chat access granted.");
          }}
          className="mt-4 w-full rounded-xl bg-[var(--il-accent)] py-3.5 text-sm font-bold text-white"
        >
          {t("join.confirm")}
        </button>

        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-muted px-3 py-2.5 text-[11px] text-muted-foreground">
          <ShieldAlert className="size-3.5" />
          {t("join.identityReveal")}
        </div>
      </div>
      <ScreenHint title="Join Flow" description="Join confirmation step for event participation." />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
