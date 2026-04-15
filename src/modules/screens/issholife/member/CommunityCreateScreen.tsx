import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Calendar, ChevronDown, ChevronUp, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { AREAS, CATEGORY_DEFINITIONS } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { SearchSelect } from "../components/SearchSelect";
import { CoachPrompt, type CoachSuggestion } from "../components/CoachPrompt";

type CoachField = "title" | "description" | "level" | "cost" | "safety";
type EventIntention = "exploration" | "skill-building" | "just-doing-it";
type SkillLevel = "beginner" | "intermediate" | "advanced" | "all-levels";
type CostMode = "free" | "split";
type MessagingPlatform = "whatsapp" | "line";

const SECTION_IDS = [
  "title",
  "category",
  "dateTime",
  "location",
  "participant",
  "whatWeDo",
  "cost",
  "safety",
  "messaging",
  "preview",
] as const;

const SUGGESTIONS: Record<CoachField, CoachSuggestion[]> = {
  title: [
    {
      id: "title-ontrail-sunrise",
      title: "Trail Sunrise Social Hike",
      description: "Friendly pace hike to catch first light with photo and tea break.",
    },
    {
      id: "title-ontrail-ridge",
      title: "Weekend Ridge Loop Adventure",
      description: "Intermediate On Trail meetup with clear route checkpoints and breaks.",
    },
  ],
  description: [
    {
      id: "description-trail-plan",
      title: "Balanced On Trail plan",
      description:
        "We start with a 10-minute warmup, follow a scenic loop, then cool down together at a cafe.",
    },
    {
      id: "description-community-tone",
      title: "Welcoming group description",
      description:
        "Open to newcomers. We keep a no-drop pace, share tips, and make sure everyone returns together.",
    },
  ],
  level: [
    {
      id: "level-exploration-beginner",
      title: "Exploration + beginner-friendly",
      description: "Recommend beginner level with exploration intention for broad participation.",
    },
  ],
  cost: [
    {
      id: "cost-hike-split",
      title: "Typical hike split",
      description: "Set total around ¥4,000 for parking/snacks with minimum 5 people.",
    },
  ],
  safety: [
    {
      id: "safety-ontrail-basics",
      title: "On Trail safety baseline",
      description:
        "Add: carry water, weather-ready layer, and emergency contact shared with organizer.",
    },
  ],
};

export function CommunityCreateScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();
  const navigate = useNavigate();

  const [openSectionIds, setOpenSectionIds] = useState<string[]>([...SECTION_IDS]);
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(CATEGORY_DEFINITIONS[0]?.id ?? null);
  const [subTagIds, setSubTagIds] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState<string>(AREAS[0] ?? "Tokyo");
  const [skillLevel, setSkillLevel] = useState<SkillLevel | "">("");
  const [intention, setIntention] = useState<EventIntention | "">("");
  const [description, setDescription] = useState("");
  const [costMode, setCostMode] = useState<CostMode>("free");
  const [costTotal, setCostTotal] = useState<number>(0);
  const [costMinPeople, setCostMinPeople] = useState<number>(4);
  const [safetyExpanded, setSafetyExpanded] = useState(false);
  const [safetyRequirements, setSafetyRequirements] = useState<string[]>([]);
  const [customSafetyInput, setCustomSafetyInput] = useState("");
  const [messagingPlatform, setMessagingPlatform] = useState<MessagingPlatform>("line");
  const [autosaveLabel, setAutosaveLabel] = useState("Not saved yet");
  const [coachIntroShown, setCoachIntroShown] = useState(false);
  const [openCoachField, setOpenCoachField] = useState<CoachField | null>(null);
  const [reviewLaterSuggestionIds, setReviewLaterSuggestionIds] = useState<string[]>([]);
  const [skippedSuggestionIds, setSkippedSuggestionIds] = useState<string[]>([]);
  const [coachCostTotal, setCoachCostTotal] = useState(4000);
  const [coachCostMinPeople, setCoachCostMinPeople] = useState(5);
  const [coachSafetyDraft, setCoachSafetyDraft] = useState("Carry 1L water");
  const [publishResult, setPublishResult] = useState<{
    title: string;
    platform: MessagingPlatform;
    publishedAt: string;
  } | null>(null);

  const selectedCategory = useMemo(
    () => CATEGORY_DEFINITIONS.find((category) => category.id === categoryId) ?? null,
    [categoryId],
  );

  const categoryLabels = CATEGORY_DEFINITIONS.map((category) => category.label);

  const coachSuggestionsByField = useMemo(() => {
    return Object.fromEntries(
      (Object.keys(SUGGESTIONS) as CoachField[]).map((field) => [
        field,
        SUGGESTIONS[field].filter((suggestion) => !skippedSuggestionIds.includes(suggestion.id)),
      ]),
    ) as Record<CoachField, CoachSuggestion[]>;
  }, [skippedSuggestionIds]);

  const costPerPerson = useMemo(() => {
    if (costMode !== "split" || costMinPeople <= 0) {
      return 0;
    }

    return Math.ceil(costTotal / costMinPeople);
  }, [costMode, costMinPeople, costTotal]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAutosaveLabel(`Auto-saved at ${new Date().toLocaleTimeString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [
    title,
    coverImage,
    categoryId,
    subTagIds,
    date,
    time,
    location,
    area,
    skillLevel,
    intention,
    description,
    costMode,
    costTotal,
    costMinPeople,
    safetyRequirements,
    messagingPlatform,
  ]);

  function toggleSection(sectionId: string) {
    setOpenSectionIds((previousValue) => {
      if (previousValue.includes(sectionId)) {
        return previousValue.filter((value) => value !== sectionId);
      }

      return [...previousValue, sectionId];
    });
  }

  function isSectionOpen(sectionId: string) {
    return openSectionIds.includes(sectionId);
  }

  function toggleSubTag(subTagId: string) {
    setSubTagIds((previousValue) => {
      if (previousValue.includes(subTagId)) {
        return previousValue.filter((value) => value !== subTagId);
      }

      return [...previousValue, subTagId];
    });
  }

  function toggleSafetyRequirement(value: string) {
    setSafetyRequirements((previousValue) => {
      if (previousValue.includes(value)) {
        return previousValue.filter((existingValue) => existingValue !== value);
      }

      return [...previousValue, value];
    });
  }

  function openCoach(field: CoachField) {
    setOpenCoachField((previousValue) => (previousValue === field ? null : field));
    setCoachIntroShown(true);
  }

  function handleAddSuggestion(field: CoachField, suggestion: CoachSuggestion) {
    if (field === "title") {
      setTitle(suggestion.title);
      return;
    }

    if (field === "description") {
      setDescription(suggestion.description);
      return;
    }

    if (field === "level") {
      setSkillLevel("beginner");
      setIntention("exploration");
      return;
    }

    if (field === "cost") {
      setCostMode("split");
      setCostTotal(4000);
      setCostMinPeople(5);
      return;
    }

    if (field === "safety") {
      const defaults = ["Carry 1L water", "Weather-ready layer", "Emergency contact shared"];
      setSafetyRequirements((previousValue) => Array.from(new Set([...previousValue, ...defaults])));
    }
  }

  function handleReviewLater(suggestionId: string) {
    setReviewLaterSuggestionIds((previousValue) =>
      previousValue.includes(suggestionId) ? previousValue : [...previousValue, suggestionId],
    );
  }

  function handleSkipSuggestion(suggestionId: string) {
    setSkippedSuggestionIds((previousValue) =>
      previousValue.includes(suggestionId) ? previousValue : [...previousValue, suggestionId],
    );
  }

  function applyCoachCostDraft() {
    setCostMode("split");
    setCostTotal(coachCostTotal);
    setCostMinPeople(coachCostMinPeople);
  }

  function applyCoachSafetyDraft() {
    if (!coachSafetyDraft.trim()) {
      return;
    }

    setSafetyRequirements((previousValue) =>
      previousValue.includes(coachSafetyDraft.trim())
        ? previousValue
        : [...previousValue, coachSafetyDraft.trim()],
    );
    setCoachSafetyDraft("");
  }

  function addCustomSafetyRequirement() {
    if (!customSafetyInput.trim()) {
      return;
    }

    setSafetyRequirements((previousValue) =>
      previousValue.includes(customSafetyInput.trim())
        ? previousValue
        : [...previousValue, customSafetyInput.trim()],
    );
    setCustomSafetyInput("");
  }

  function handlePublish() {
    const publishedTitle = title.trim() || "Untitled";
    hints.push(
      `Community listing "${publishedTitle}" in ${area} published with ${messagingPlatform} handoff.`,
    );

    setPublishResult({
      title: publishedTitle,
      platform: messagingPlatform,
      publishedAt: new Date().toLocaleTimeString(),
    });
  }

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
      <div className="space-y-4 p-4">
        <div className="rounded-xl border bg-card p-3">
          <h2 className="text-sm font-bold text-foreground">{t("create.eventTitle")}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Build your listing in one flow. Sections auto-save and preview updates live.
          </p>
          <div className="mt-2 rounded-md bg-muted px-2.5 py-1.5 text-[11px] text-muted-foreground">
            {autosaveLabel}
          </div>
        </div>

        <section className="rounded-xl border bg-card p-3">
          <button
            type="button"
            onClick={() => toggleSection("title")}
            className="flex w-full items-center justify-between"
          >
            <h3 className="text-xs font-bold text-foreground">1. Title + cover image</h3>
            {isSectionOpen("title") ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {isSectionOpen("title") && (
            <div className="mt-3">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Add a clear event title"
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none"
              />
              <input
                value={coverImage}
                onChange={(event) => setCoverImage(event.target.value)}
                placeholder="Cover image URL (or leave blank for placeholder)"
                className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
              />
              <div className="mt-2 rounded-lg border border-dashed bg-muted/40 p-4 text-center text-xs text-muted-foreground">
                Image upload placeholder
              </div>

              <CoachPrompt
                sectionTitle="Title"
                introVisible={!coachIntroShown}
                open={openCoachField === "title"}
                suggestions={coachSuggestionsByField.title}
                reviewedSuggestionIds={reviewLaterSuggestionIds}
                onToggle={() => openCoach("title")}
                onAddSuggestion={(suggestion) => handleAddSuggestion("title", suggestion)}
                onReviewLaterSuggestion={handleReviewLater}
                onSkipSuggestion={handleSkipSuggestion}
              />
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-3">
          <button
            type="button"
            onClick={() => toggleSection("category")}
            className="flex w-full items-center justify-between"
          >
            <h3 className="text-xs font-bold text-foreground">2. Primary category + sub-tags</h3>
            {isSectionOpen("category") ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {isSectionOpen("category") && (
            <div className="mt-3 space-y-2">
              <SearchSelect
                items={categoryLabels}
                value={categoryId}
                onChange={(value) => {
                  setCategoryId(value);
                  setSubTagIds([]);
                }}
                placeholder="Pick category"
                icon={<MapPin className="size-3.5 text-muted-foreground" />}
              />
              <div className="flex flex-wrap gap-2">
                {(selectedCategory?.subTags ?? []).map((subTag) => (
                  <button
                    key={subTag.id}
                    type="button"
                    onClick={() => toggleSubTag(subTag.id)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                      subTagIds.includes(subTag.id)
                        ? "border-[var(--il-accent)] bg-[var(--il-accent-bg)] text-foreground"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {subTag.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-3">
          <button
            type="button"
            onClick={() => toggleSection("dateTime")}
            className="flex w-full items-center justify-between"
          >
            <h3 className="text-xs font-bold text-foreground">3. Date and time</h3>
            {isSectionOpen("dateTime") ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {isSectionOpen("dateTime") && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
              />
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
              />
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-3">
          <button
            type="button"
            onClick={() => toggleSection("location")}
            className="flex w-full items-center justify-between"
          >
            <h3 className="text-xs font-bold text-foreground">4. Exact location</h3>
            {isSectionOpen("location") ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {isSectionOpen("location") && (
            <div className="mt-3">
              <SearchSelect
                items={AREAS}
                value={area}
                onChange={(value) => setArea(value ?? AREAS[0] ?? "Tokyo")}
                placeholder="Pick area"
                icon={<MapPin className="size-3.5 text-muted-foreground" />}
              />
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Exact meetup point"
                className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
              />
              <div className="mt-2 rounded-lg border border-dashed bg-muted/40 p-4 text-center text-xs text-muted-foreground">
                Map placeholder
              </div>
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-3">
          <button
            type="button"
            onClick={() => toggleSection("participant")}
            className="flex w-full items-center justify-between"
          >
            <h3 className="text-xs font-bold text-foreground">5. Participant level + intention</h3>
            {isSectionOpen("participant") ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {isSectionOpen("participant") && (
            <div className="mt-3 space-y-2">
              <select
                value={skillLevel}
                onChange={(event) => setSkillLevel(event.target.value as SkillLevel)}
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
              >
                <option value="">Skill level (optional)</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="all-levels">All levels</option>
              </select>
              <select
                value={intention}
                onChange={(event) => setIntention(event.target.value as EventIntention)}
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
              >
                <option value="">Intention (optional)</option>
                <option value="exploration">Exploration</option>
                <option value="skill-building">Skill building</option>
                <option value="just-doing-it">Just doing it</option>
              </select>

              <CoachPrompt
                sectionTitle="Participant fit"
                open={openCoachField === "level"}
                suggestions={coachSuggestionsByField.level}
                reviewedSuggestionIds={reviewLaterSuggestionIds}
                onToggle={() => openCoach("level")}
                onAddSuggestion={(suggestion) => handleAddSuggestion("level", suggestion)}
                onReviewLaterSuggestion={handleReviewLater}
                onSkipSuggestion={handleSkipSuggestion}
              />
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-3">
          <button
            type="button"
            onClick={() => toggleSection("whatWeDo")}
            className="flex w-full items-center justify-between"
          >
            <h3 className="text-xs font-bold text-foreground">6. What we&apos;ll do</h3>
            {isSectionOpen("whatWeDo") ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {isSectionOpen("whatWeDo") && (
            <div className="mt-3">
              <textarea
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the flow, pace, and what members should prepare."
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
              />
              <CoachPrompt
                sectionTitle="What we&apos;ll do"
                open={openCoachField === "description"}
                suggestions={coachSuggestionsByField.description}
                reviewedSuggestionIds={reviewLaterSuggestionIds}
                onToggle={() => openCoach("description")}
                onAddSuggestion={(suggestion) => handleAddSuggestion("description", suggestion)}
                onReviewLaterSuggestion={handleReviewLater}
                onSkipSuggestion={handleSkipSuggestion}
              />
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-3">
          <button
            type="button"
            onClick={() => toggleSection("cost")}
            className="flex w-full items-center justify-between"
          >
            <h3 className="text-xs font-bold text-foreground">7. Cost expectations</h3>
            {isSectionOpen("cost") ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {isSectionOpen("cost") && (
            <div className="mt-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {(["free", "split"] as CostMode[]).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCostMode(value)}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                      costMode === value
                        ? "border-[var(--il-accent)] bg-[var(--il-accent-bg)] text-foreground"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {value === "free" ? "Free" : "Split cost"}
                  </button>
                ))}
              </div>

              {costMode === "split" && (
                <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
                  <input
                    type="number"
                    value={costTotal}
                    onChange={(event) => setCostTotal(Number(event.target.value))}
                    placeholder="Total expected cost (JPY)"
                    className="w-full rounded-lg border bg-background px-3 py-2 text-xs outline-none"
                  />
                  <input
                    type="number"
                    value={costMinPeople}
                    onChange={(event) => setCostMinPeople(Number(event.target.value))}
                    placeholder="Minimum people"
                    className="w-full rounded-lg border bg-background px-3 py-2 text-xs outline-none"
                  />
                  <div className="rounded-md bg-card px-2.5 py-2 text-[11px] text-muted-foreground">
                    Estimated per person: <span className="font-semibold text-foreground">¥{costPerPerson}</span>
                  </div>
                </div>
              )}

              <CoachPrompt
                sectionTitle="Cost expectations"
                open={openCoachField === "cost"}
                suggestions={coachSuggestionsByField.cost}
                reviewedSuggestionIds={reviewLaterSuggestionIds}
                onToggle={() => openCoach("cost")}
                onAddSuggestion={(suggestion) => handleAddSuggestion("cost", suggestion)}
                onReviewLaterSuggestion={handleReviewLater}
                onSkipSuggestion={handleSkipSuggestion}
              >
                <div className="rounded-lg border bg-card p-3">
                  <div className="text-[11px] font-semibold text-foreground">Coach mini-form</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={coachCostTotal}
                      onChange={(event) => setCoachCostTotal(Number(event.target.value))}
                      className="rounded-md border bg-background px-2 py-1.5 text-[11px] outline-none"
                    />
                    <input
                      type="number"
                      value={coachCostMinPeople}
                      onChange={(event) => setCoachCostMinPeople(Number(event.target.value))}
                      className="rounded-md border bg-background px-2 py-1.5 text-[11px] outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={applyCoachCostDraft}
                    className="mt-2 rounded-md bg-[var(--il-accent)] px-2.5 py-1.5 text-[11px] font-bold text-white"
                  >
                    Apply
                  </button>
                </div>
              </CoachPrompt>
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-3">
          <button
            type="button"
            onClick={() => toggleSection("safety")}
            className="flex w-full items-center justify-between"
          >
            <h3 className="text-xs font-bold text-foreground">8. Safety requirements</h3>
            {isSectionOpen("safety") ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {isSectionOpen("safety") && (
            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={() => setSafetyExpanded((previousValue) => !previousValue)}
                className="text-[11px] font-semibold text-[var(--il-accent)]"
              >
                {safetyExpanded ? "Hide safety checklist" : "Show safety checklist"}
              </button>

              {safetyExpanded && (
                <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
                  {["Helmet required", "Carry 1L water", "Emergency contact shared"].map((item) => (
                    <label key={item} className="flex items-center gap-2 text-xs text-foreground">
                      <input
                        type="checkbox"
                        checked={safetyRequirements.includes(item)}
                        onChange={() => toggleSafetyRequirement(item)}
                      />
                      {item}
                    </label>
                  ))}
                  <div className="flex gap-2">
                    <input
                      value={customSafetyInput}
                      onChange={(event) => setCustomSafetyInput(event.target.value)}
                      placeholder="Add custom requirement"
                      className="flex-1 rounded-md border bg-background px-2 py-1.5 text-[11px] outline-none"
                    />
                    <button
                      type="button"
                      onClick={addCustomSafetyRequirement}
                      className="rounded-md border bg-card px-2.5 py-1.5 text-[11px] font-semibold text-foreground"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              <CoachPrompt
                sectionTitle="Safety requirements"
                open={openCoachField === "safety"}
                suggestions={coachSuggestionsByField.safety}
                reviewedSuggestionIds={reviewLaterSuggestionIds}
                onToggle={() => openCoach("safety")}
                onAddSuggestion={(suggestion) => handleAddSuggestion("safety", suggestion)}
                onReviewLaterSuggestion={handleReviewLater}
                onSkipSuggestion={handleSkipSuggestion}
              >
                <div className="rounded-lg border bg-card p-3">
                  <div className="text-[11px] font-semibold text-foreground">Coach mini-form</div>
                  <input
                    value={coachSafetyDraft}
                    onChange={(event) => setCoachSafetyDraft(event.target.value)}
                    placeholder="Suggested safety requirement"
                    className="mt-2 w-full rounded-md border bg-background px-2 py-1.5 text-[11px] outline-none"
                  />
                  <button
                    type="button"
                    onClick={applyCoachSafetyDraft}
                    className="mt-2 rounded-md bg-[var(--il-accent)] px-2.5 py-1.5 text-[11px] font-bold text-white"
                  >
                    Apply
                  </button>
                </div>
              </CoachPrompt>
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-3">
          <button
            type="button"
            onClick={() => toggleSection("messaging")}
            className="flex w-full items-center justify-between"
          >
            <h3 className="text-xs font-bold text-foreground">9. Messaging platform</h3>
            {isSectionOpen("messaging") ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {isSectionOpen("messaging") && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(["whatsapp", "line"] as MessagingPlatform[]).map((platform) => (
                <label
                  key={platform}
                  className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold ${
                    messagingPlatform === platform
                      ? "border-[var(--il-accent)] bg-[var(--il-accent-bg)] text-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="messaging-platform"
                    value={platform}
                    checked={messagingPlatform === platform}
                    onChange={() => setMessagingPlatform(platform)}
                    className="mr-2"
                  />
                  {platform === "whatsapp" ? "WhatsApp" : "LINE"}
                </label>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-3">
          <button
            type="button"
            onClick={() => toggleSection("preview")}
            className="flex w-full items-center justify-between"
          >
            <h3 className="text-xs font-bold text-foreground">10. Live preview panel</h3>
            {isSectionOpen("preview") ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {isSectionOpen("preview") && (
            <div className="mt-3 rounded-lg border bg-muted/30 p-3">
              <div className="text-sm font-bold text-foreground">{title || "Untitled event"}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                <Calendar className="mr-1 inline size-3" />
                {date || "Date"} {time ? `· ${time}` : ""}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                <MapPin className="mr-1 inline size-3" />
                {area} {location ? `· ${location}` : ""}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                <Users className="mr-1 inline size-3" />
                {skillLevel || "all-levels"} · {intention || "open intention"}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                Category: {selectedCategory?.label ?? "None"}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                Cost: {costMode === "free" ? "Free" : `Split cost (¥${costPerPerson}/person est.)`}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                Messaging: {messagingPlatform === "whatsapp" ? "WhatsApp" : "LINE"}
              </div>
            </div>
          )}
        </section>

        <div className="flex gap-2">
          <button className="flex-1 rounded-lg border py-2.5 text-xs font-semibold text-muted-foreground">
            {t("create.saveDraft")}
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="flex-1 rounded-lg bg-[var(--il-accent)] py-2.5 text-xs font-bold text-white"
          >
            {t("create.publish")}
          </button>
        </div>
        {publishResult && (
          <div className="rounded-lg border border-[var(--il-going)]/30 bg-[var(--il-going-bg)] px-3 py-2.5">
            <div className="text-xs font-bold text-[var(--il-going)]">Mock publish complete</div>
            <div className="mt-1 text-[11px] text-foreground">
              <span className="font-semibold">{publishResult.title}</span> is now visible in Discover.
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">
              Group handoff: {publishResult.platform === "whatsapp" ? "WhatsApp" : "LINE"} ·
              Published at {publishResult.publishedAt}
            </div>
          </div>
        )}
      </div>
      <ScreenHint
        title="Community Create"
        description="Single-page event creation flow with coach suggestions, safety guidance, and messaging platform setup."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
