import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";

export function CommunityCreateScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();
  const navigate = useNavigate();
  const [subtype, setSubtype] = useState<"meetup" | "activity" | null>(null);
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
        <h2 className="mb-4 text-base font-bold text-foreground">What are you creating?</h2>

        <div className="mb-4 flex gap-3">
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
                {type === "meetup" ? "Casual, open meetup" : "Structured activity with plan"}
              </div>
            </button>
          ))}
        </div>

        {subtype && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={subtype === "meetup" ? "Weekend hike group" : "Cycling workshop"}
                className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none"
              />
              <button className="mt-1 flex items-center gap-1 text-[10px] text-[var(--il-pro)]">
                <Sparkles className="size-3" /> AI suggestion
              </button>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Description</label>
              <textarea rows={3} placeholder="What's the plan?" className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none" />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <MapPin className="mr-0.5 inline size-3" /> Area
                </label>
                <input placeholder="e.g. Tokyo" className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none" />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <Calendar className="mr-0.5 inline size-3" /> Date
                </label>
                <input placeholder="e.g. Apr 30" className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Users className="mr-0.5 inline size-3" /> Max attendees
              </label>
              <input type="number" placeholder="15" className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none" />
            </div>

            <div className="flex gap-2">
              <button className="flex-1 rounded-lg border py-2.5 text-xs font-semibold text-muted-foreground">
                Save Draft
              </button>
              <button
                onClick={() => hints.push(`Community ${subtype} "${title || "Untitled"}" published. Appearing in area feed.`)}
                className="flex-1 rounded-lg bg-[var(--il-accent)] py-2.5 text-xs font-bold text-white"
              >
                Publish
              </button>
            </div>
          </div>
        )}
      </div>
      <ScreenHint title="Community Create" description="Create a community meetup or activity. AI-suggested topics. Destination required." />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
