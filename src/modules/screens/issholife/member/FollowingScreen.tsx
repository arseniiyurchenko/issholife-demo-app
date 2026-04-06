import { useState } from "react";
import { MapPin, Tag, Building2, Check } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { AREAS, CATEGORIES } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";

type Tab = "areas" | "interests" | "partners";

const PARTNERS = ["TrailBlaze JP", "Zen Garden Studio", "Hakuba Guides", "Tokyo Riders"];

export function FollowingScreen() {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("areas");
  const [followedAreas, setFollowedAreas] = useState<string[]>(["Tokyo", "Hakuba"]);
  const [followedCats, setFollowedCats] = useState<string[]>(["Hiking", "Cycling"]);
  const [followedPartners, setFollowedPartners] = useState<string[]>(["TrailBlaze JP"]);

  const toggle = (list: string[], item: string, setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "areas", label: t("following.areas"), icon: MapPin },
    { key: "interests", label: t("following.interests"), icon: Tag },
    { key: "partners", label: t("following.partners"), icon: Building2 },
  ];

  const renderList = (items: string[], followed: string[], setter: (v: string[]) => void) => (
    <div className="space-y-1.5">
      {items.map((item) => {
        const isFollowed = followed.includes(item);
        return (
          <button
            key={item}
            onClick={() => toggle(followed, item, setter)}
            className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors ${
              isFollowed ? "border-[var(--il-accent)] bg-[var(--il-accent-bg)]" : "bg-card"
            }`}
          >
            <span className="text-xs font-semibold text-foreground">{item}</span>
            {isFollowed && <Check className="size-4 text-[var(--il-accent)]" />}
          </button>
        );
      })}
    </div>
  );

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-3">
        <h2 className="text-sm font-bold text-foreground">{t("following.title")}</h2>
      </div>
      <div className="flex border-b bg-card">
        {tabs.map((tb) => {
          const Icon = tb.icon;
          const active = tab === tb.key;
          return (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs ${
                active ? "border-b-2 border-[var(--il-accent)] font-bold text-foreground" : "border-b-2 border-transparent text-muted-foreground"
              }`}
            >
              <Icon className="size-3.5" />
              {tb.label}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        {tab === "areas" && renderList(AREAS, followedAreas, setFollowedAreas)}
        {tab === "interests" && renderList(CATEGORIES, followedCats, setFollowedCats)}
        {tab === "partners" && renderList(PARTNERS, followedPartners, setFollowedPartners)}
      </div>
      <ScreenHint title="Following" description="Manage followed areas, interests, and partners. Controls feed personalization." />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
