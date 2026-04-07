import { ArrowLeft, MapPin, Calendar, Clock, Users, LockKeyhole, MessageCircleQuestion } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { LISTINGS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { Badge } from "../components/Badge";
import { Lock } from "../components/Lock";
import { useIsshoLife } from "../issholife-context";
import { mapPublicPathToMemberPath } from "../demo-route-mapping";

export function ListingDetailPublicScreen() {
  const { t, lang } = useI18n();
  const { isAuthenticated, requestUnlock, setIsPublic } = useIsshoLife();
  const navigate = useNavigate();
  const location = useLocation();
  const l = LISTINGS[0];
  const title = lang === "ja" ? l.titleJa : l.title;
  const desc = lang === "ja" ? l.descriptionJa : l.description;

  const unlock = () => {
    const targetMemberPath = mapPublicPathToMemberPath(location.pathname);

    if (isAuthenticated) {
      setIsPublic(false);
      navigate(targetMemberPath);
      return;
    }

    requestUnlock(targetMemberPath);
    navigate("/screens/auth/sign-in");
  };

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-2.5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2.5"
        >
          <ArrowLeft className="size-4 text-muted-foreground" />
          <span className="truncate text-xs font-semibold text-foreground">{title}</span>
        </button>
      </div>

      <div
        className="relative h-44 bg-cover bg-center"
        style={{ backgroundImage: `url('${l.image}')` }}
      >
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pt-5 pb-3">
          <Badge type={l.type} sub={l.sub} />
          <h1 className="mt-1.5 text-xl font-extrabold text-white">{title}</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{l.area}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="size-3" />{l.date}</span>
          <span className="inline-flex items-center gap-1"><Clock className="size-3" />{l.time}</span>
          <span className="inline-flex items-center gap-1"><Users className="size-3" />{l.attendees}/{l.maxAttendees}</span>
          {l.price && <span className="font-bold text-[var(--il-pro)]">{l.price}</span>}
        </div>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {l.tags.map((tag) => (
            <span key={tag} className="rounded-md border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mb-3 rounded-xl border bg-card p-4">
          <h3 className="mb-1.5 text-xs font-bold text-foreground">{t("listing.about")}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
        </div>

        <div className="mt-3">
          <Lock isLocked label={t("listing.organizer")} onUnlock={unlock}>
            <div className="flex items-center gap-2.5 rounded-xl border bg-card p-4">
              <div className="flex size-9 items-center justify-center rounded-full bg-[var(--il-community-bg)] text-xs font-bold text-[var(--il-community)]">
                {l.organizer.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">{l.organizer}</div>
                <div className="text-[11px] text-muted-foreground">{t("listing.verified")} &middot; {l.area}</div>
              </div>
            </div>
          </Lock>
        </div>

        {l.type === "pro" && (
          <div className="mt-3 rounded-xl bg-[var(--il-pro-bg)] p-3 text-xs text-[var(--il-pro)]">
            <MessageCircleQuestion className="mr-1 inline size-3.5" />
            {t("listing.askPartner")}
          </div>
        )}

        <button
          onClick={unlock}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--il-accent)] py-3.5 text-sm font-extrabold text-white shadow-md"
        >
          <LockKeyhole className="size-4" />
          {t("join.unlockToJoin")}
        </button>
      </div>

      <ScreenHint
        title="Listing Detail (Public)"
        description="Public teaser view of a listing with inline locks on organizer and join sections."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
