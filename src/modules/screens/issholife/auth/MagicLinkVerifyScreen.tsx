import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";

export function MagicLinkVerifyScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();
  const [phase, setPhase] = useState<"verifying" | "success">("verifying");

  useEffect(() => {
    const tm = setTimeout(() => {
      setPhase("success");
      hints.push("Token verified. Session created. User: yuki@issholife.jp. Membership: active.");
    }, 2000);
    return () => clearTimeout(tm);
  }, [hints]);

  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 text-center shadow-md">
        {phase === "verifying" ? (
          <>
            <Loader2 className="mx-auto mb-4 size-12 animate-spin text-[var(--il-accent)]" />
            <h2 className="mb-2 text-lg font-bold text-foreground">
              {t("lang") === "ja" ? "確認中..." : "Verifying..."}
            </h2>
            <p className="text-sm text-muted-foreground">
              Checking your magic link token
            </p>
          </>
        ) : (
          <>
            <CheckCircle className="mx-auto mb-4 size-12 text-[var(--il-going)]" />
            <h2 className="mb-2 text-lg font-bold text-foreground">
              {t("lang") === "ja" ? "認証成功" : "You're in!"}
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              {t("lang") === "ja"
                ? "アカウントが確認されました。"
                : "Your account has been verified. Redirecting to feed..."}
            </p>
            <div className="rounded-lg bg-[var(--il-going-bg)] px-4 py-2 text-xs font-semibold text-[var(--il-going)]">
              yuki@issholife.jp
            </div>
          </>
        )}
      </div>
      <ScreenHint
        title="Magic Link Verify"
        description="Landing page after clicking the magic link from email. Verifies token and creates session."
      />
      <BackendHintButton />
    </div>
  );
}
