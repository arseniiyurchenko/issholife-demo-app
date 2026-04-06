import { useState } from "react";
import { Globe, Mail } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { LanguageToggle } from "../components/LanguageToggle";

export function SignInScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="w-full max-w-sm rounded-2xl border bg-card p-8 text-center shadow-md">
          <Mail className="mx-auto mb-4 size-12 text-[var(--il-accent)]" />
          <h2 className="mb-2 text-xl font-extrabold text-foreground">
            {t("auth.checkEmail")}
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            {t("auth.magicLinkSent")}
          </p>
          <button
            onClick={() => {
              hints.push("Magic link verified. Session created. Redirecting to feed.");
            }}
            className="rounded-xl bg-[var(--il-accent)] px-8 py-3 text-sm font-bold text-white"
          >
            {t("auth.simulateOpen")}
          </button>
          <p className="mt-4 text-[11px] text-muted-foreground">
            {t("auth.expires")}
          </p>
        </div>
        <ScreenHint
          title="Sign In"
          description="Magic link authentication with T&C acceptance and bilingual support."
        />
        <BackendHintButton />
      </div>
    );
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="w-full max-w-[420px] rounded-2xl border bg-card p-8 shadow-md">
        <div className="mb-7 text-center">
          <Globe className="mx-auto mb-2 size-8 text-[var(--il-accent)]" />
          <h1 className="mb-1 text-2xl font-black text-foreground">
            {t("app.name")}
          </h1>
          <p className="text-xs text-muted-foreground">{t("app.tagline")}</p>
        </div>

        <h2 className="mb-1 text-lg font-bold text-foreground">
          {t("auth.signIn")}
        </h2>
        <p className="mb-5 text-xs text-muted-foreground">
          {t("auth.noPassword")}
        </p>

        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {t("auth.email")}
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-1.5 w-full rounded-lg border bg-muted px-4 py-3 text-sm outline-none"
        />

        <label className="mt-4 flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-0.5"
          />
          <span className="text-xs leading-relaxed text-muted-foreground">
            {t("auth.agreeTerms")}{" "}
            <span className="font-semibold text-[var(--il-accent)]">
              {t("auth.terms")}
            </span>{" "}
            {t("auth.and")}{" "}
            <span className="font-semibold text-[var(--il-accent)]">
              {t("auth.privacy")}
            </span>
            {t("auth.agreeTermsSuffix")}
          </span>
        </label>

        <button
          onClick={() => {
            if (email && accepted) {
              setSent(true);
              hints.push(`Magic link sent to ${email}. Token generated. Expires in 10 min.`);
            }
          }}
          disabled={!email || !accepted}
          className={`mt-4 w-full rounded-xl py-3.5 text-sm font-extrabold transition-colors ${
            email && accepted
              ? "bg-[var(--il-accent)] text-white"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {t("auth.sendMagicLink")}
        </button>

        <div className="mt-5 rounded-lg bg-muted px-4 py-3 text-center text-xs leading-relaxed text-muted-foreground">
          {t("auth.inviteOnly")}
        </div>
      </div>
      <ScreenHint
        title="Sign In"
        description="Magic link authentication with T&C acceptance and bilingual support."
      />
      <BackendHintButton />
    </div>
  );
}
