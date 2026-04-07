import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { AREAS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";

export function CommunityCreateScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();
  const navigate = useNavigate();
  const [subtype, setSubtype] = useState<"meetup" | "activity" | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-2.5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2.5"
        >
          <ArrowLeft className="size-4 text-muted-foreground" />
          <span className="text-xs font-semibold text-foreground">{t("create.title")}</span>
        </button>
      </div>
      <div className="p-4">
        <h2 className="mb-1 text-base font-bold text-foreground">{t("create.eventTitle")}</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          {t("create.eventDescription")}
        </p>

        <div className="mb-4 rounded-xl border bg-card p-3">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <MapPin className="mr-1 inline size-3" />
            {t("create.locationRequired")}
          </div>
          <div className="flex flex-wrap gap-2">
            {AREAS.slice(0, 6).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setArea(item)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  area === item
                    ? "border-[var(--il-accent)] bg-[var(--il-accent-bg)] text-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 rounded-xl border bg-card p-3">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {t("create.activityTypeRequired")}
          </div>
          <div className="flex gap-3">
          {(["meetup", "activity"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSubtype(type)}
              className={`flex-1 rounded-xl border-2 p-4 text-center transition-colors ${
                subtype === type ? "border-[var(--il-accent)] bg-[var(--il-accent-bg)]" : "border-border"
              }`}
            >
              <div className="text-sm font-bold text-foreground">{t(`create.${type}`)}</div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                {type === "meetup" ? t("create.meetupHint") : t("create.activityHint")}
              </div>
            </button>
          ))}
          </div>
        </div>

        {subtype && area && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{t("create.fieldTitle")}</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={subtype === "meetup" ? t("create.titlePlaceholderMeetup") : t("create.titlePlaceholderActivity")}
                className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none"
              />
              <button className="mt-1 flex items-center gap-1 text-[10px] text-[var(--il-pro)]">
                <Sparkles className="size-3" /> {t("create.aiSuggestion")}
              </button>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{t("create.fieldDescription")}</label>
              <textarea rows={3} placeholder={t("create.descriptionPlaceholder")} className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none" />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <MapPin className="mr-0.5 inline size-3" /> {t("create.fieldArea")}
                </label>
                <input value={area} readOnly className="w-full rounded-lg border bg-muted px-3 py-2.5 text-xs text-foreground outline-none" />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <Calendar className="mr-0.5 inline size-3" /> {t("create.fieldDate")}
                </label>
                <input placeholder={t("create.datePlaceholder")} className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Users className="mr-0.5 inline size-3" /> {t("create.fieldMaxAttendees")}
              </label>
              <input type="number" placeholder={t("create.maxAttendeesPlaceholder")} className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none" />
            </div>

            <div className="flex gap-2">
              <button className="flex-1 rounded-lg border py-2.5 text-xs font-semibold text-muted-foreground">
                {t("create.saveDraft")}
              </button>
              <button
                onClick={() =>
                  hints.push(
                    `Community ${subtype} "${title || "Untitled"}" in ${area} published. Appearing in area feed.`,
                  )
                }
                className="flex-1 rounded-lg bg-[var(--il-accent)] py-2.5 text-xs font-bold text-white"
              >
                {t("create.publish")}
              </button>
            </div>
          </div>
        )}
        {(!subtype || !area) && (
          <div className="rounded-lg bg-muted px-3 py-2 text-center text-xs text-muted-foreground">
            {t("create.selectPrompt")}
          </div>
        )}
      </div>
      <ScreenHint title="Community Create" description="Create a community meetup or activity. AI-suggested topics. Destination required." />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
