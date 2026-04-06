import { useState } from "react";
import { Bus, Car, PersonStanding, ShieldAlert, CheckCircle } from "lucide-react";
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
  const [transport, setTransport] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const options = [
    { key: "org", label: t("join.organizerTransport"), sub: l.transportNote ?? "", icon: Bus },
    { key: "ride", label: t("join.rideShare"), sub: `3 ${t("ride.rides")}`, icon: Car },
    { key: "self", label: t("join.onMyOwn"), sub: lang === "en" ? "Car, train, bike" : "車・電車・自転車", icon: PersonStanding },
  ];

  if (confirmed) {
    return (
      <IsshoLifeLayout showToggle={false}>
        <div className="flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: 400 }}>
          <CheckCircle className="mb-4 size-16 text-[var(--il-going)]" />
          <h2 className="mb-2 text-xl font-extrabold text-foreground">{t("join.youreGoing")}</h2>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{l.date} &middot; {l.time} &middot; {l.area}</p>
          <div className="mt-4 rounded-lg bg-[var(--il-going-bg)] px-4 py-2 text-xs font-semibold text-[var(--il-going)]">
            Transport: {options.find((o) => o.key === transport)?.label}
          </div>
        </div>
        <ScreenHint title="Join Flow" description="Transport selection step during the join flow. Creates a Join Record with transport status." />
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

        <div className="mb-2 text-xs font-bold text-foreground">{t("join.howGettingThere")}</div>

        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.key}
              onClick={() => setTransport(opt.key)}
              className={`mb-2 flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-colors ${
                transport === opt.key ? "border-[var(--il-accent)] bg-[var(--il-accent-bg)]" : "border-border bg-background"
              }`}
            >
              <Icon className="size-5 text-muted-foreground" />
              <div>
                <div className="text-xs font-semibold text-foreground">{opt.label}</div>
                <div className="text-[11px] text-muted-foreground">{opt.sub}</div>
              </div>
            </button>
          );
        })}

        <button
          onClick={() => {
            if (transport) {
              setConfirmed(true);
              hints.push(`Join Record created. Transport: ${transport}. Identity revealed. Chat access granted.`);
            }
          }}
          disabled={!transport}
          className={`mt-4 w-full rounded-xl py-3.5 text-sm font-bold ${
            transport ? "bg-[var(--il-accent)] text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          {t("join.confirm")}
        </button>

        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-muted px-3 py-2.5 text-[11px] text-muted-foreground">
          <ShieldAlert className="size-3.5" />
          {t("join.identityReveal")}
        </div>
      </div>
      <ScreenHint title="Join Flow" description="Transport selection step during the join flow. Creates a Join Record with transport status." />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
