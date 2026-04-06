import { useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { Lock } from "../components/Lock";
import { useIsshoLife } from "../issholife-context";

export function GoingPublicScreen() {
  const { t } = useI18n();
  const { isAuthenticated, requestUnlock, setIsPublic } = useIsshoLife();
  const navigate = useNavigate();

  function unlockGoing(): void {
    if (isAuthenticated) {
      setIsPublic(false);
      navigate("/screens/member/going");
      return;
    }

    requestUnlock("/screens/member/going");
    navigate("/screens/auth/sign-in");
  }

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-3">
        <h2 className="text-sm font-bold text-foreground">{t("feed.going")}</h2>
      </div>
      <div className="p-4">
        <Lock isLocked label={t("feed.going")} onUnlock={unlockGoing}>
          <div className="py-16 text-center text-xs text-muted-foreground">
            {t("join.unlockToJoin")}
          </div>
        </Lock>
      </div>
      <ScreenHint
        title="Going (Public)"
        description="Public locked preview for Going. Unlock flows into member Going route."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
