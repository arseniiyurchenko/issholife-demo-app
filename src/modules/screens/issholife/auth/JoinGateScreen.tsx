import { useState } from "react";
import { useNavigate } from "react-router";
import { Globe, Mail } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { useIsshoLife } from "../issholife-context";
import { ResponsiveShell } from "../components/ResponsiveShell";

export function JoinGateScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();
  const navigate = useNavigate();
  const { completeAuth, postAuthRedirectPath, setPostAuthRedirectPath } = useIsshoLife();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const completeAuthAndNavigate = () => {
    completeAuth();
    const targetPath = postAuthRedirectPath ?? "/screens/member/feed";
    setPostAuthRedirectPath(null);
    navigate(targetPath, { replace: true });
  };

  const handleSendMagicLink = () => {
    if (!email) {
      return;
    }

    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      return;
    }

    setSent(true);
    hints.push(`Join gate magic link sent to ${normalizedEmail}.`);
    navigate("/screens/auth/magic");
  };

  return (
    <ResponsiveShell desktopMainClassName="flex items-center justify-center p-8">
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-md">
          <div className="mb-6 text-center">
            <Globe className="mx-auto mb-2 size-8 text-[var(--il-accent)]" />
            <h1 className="mb-1 text-xl font-black text-foreground">
              {t("app.name")}
            </h1>
          </div>

          <div className="mb-5 rounded-xl bg-[var(--il-accent-bg)] p-4 text-center">
            <Mail className="mx-auto mb-2 size-6 text-[var(--il-accent)]" />
            <h2 className="mb-1 text-sm font-bold text-foreground">
              {t("auth.joinToSend")}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t("lang") === "ja"
                ? "質問を投稿するにはメンバー登録が必要です。"
                : "You need to be a member to post questions. Sign in via magic link to continue."}
            </p>
          </div>

          {sent ? (
            <button
              onClick={completeAuthAndNavigate}
              className="w-full rounded-xl bg-[var(--il-accent)] py-3 text-sm font-bold text-white"
            >
              {t("auth.simulateOpen")}
            </button>
          ) : (
            <>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border bg-muted px-4 py-3 text-sm outline-none"
              />

              <button
                onClick={handleSendMagicLink}
                disabled={!email.trim()}
                className={`mt-3 w-full rounded-xl py-3 text-sm font-bold ${
                  email.trim()
                    ? "bg-[var(--il-accent)] text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {t("auth.sendMagicLink")}
              </button>
            </>
          )}

          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            {t("lang") === "ja"
              ? "質問の下書きは保存されます。"
              : "Your draft question will be saved."}
          </p>
        </div>
      </div>
      <ScreenHint
        title="Join Gate"
        description="Modal invoked when a public user attempts to submit a Q&A question. Triggers magic link sign-in flow."
      />
      <BackendHintButton />
    </ResponsiveShell>
  );
}
