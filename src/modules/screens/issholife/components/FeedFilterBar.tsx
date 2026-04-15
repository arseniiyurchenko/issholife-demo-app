import { Calendar, Clock3, Tag } from "lucide-react";
import { SearchSelect } from "./SearchSelect";
import { useI18n } from "@/modules/core/i18n";
import { CATEGORY_DEFINITIONS } from "@/modules/core/issholife-data";
import type { Listing } from "@/modules/core/issholife-data";

export type WhenFilter = "today" | "tomorrow" | "this-week" | "this-weekend" | "custom";
export type TimeOfDayFilter = "morning" | "afternoon" | "evening" | "custom";
export type CommunityPartnerFilter = "all" | "community" | "partner";

export interface FeedFilters {
  when: WhenFilter | null;
  customStartDate: string;
  customEndDate: string;
  timeOfDay: TimeOfDayFilter | null;
  customStartTime: string;
  customEndTime: string;
  categoryId: string | null;
  subTagIds: string[];
  communityPartner: CommunityPartnerFilter;
}

interface Props {
  filters: FeedFilters;
  onChange: (nextFilters: FeedFilters) => void;
}

function FilterChip(props: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors ${
        props.isActive
          ? "border-[var(--il-accent)] bg-[var(--il-accent-bg)] text-[var(--il-accent)]"
          : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {props.label}
    </button>
  );
}

function SegmentedToggle(props: {
  value: CommunityPartnerFilter;
  onChange: (value: CommunityPartnerFilter) => void;
}) {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-3 rounded-lg border bg-card p-1">
      <button
        type="button"
        onClick={() => props.onChange("all")}
        className={`rounded-md px-2 py-1.5 text-[11px] font-semibold ${
          props.value === "all" ? "bg-[var(--il-accent-bg)] text-[var(--il-accent)]" : "text-muted-foreground"
        }`}
      >
        {t("common.all")}
      </button>
      <button
        type="button"
        onClick={() => props.onChange("community")}
        className={`rounded-md px-2 py-1.5 text-[11px] font-semibold ${
          props.value === "community" ? "bg-[var(--il-accent-bg)] text-[var(--il-accent)]" : "text-muted-foreground"
        }`}
      >
        {t("common.community")}
      </button>
      <button
        type="button"
        onClick={() => props.onChange("partner")}
        className={`rounded-md px-2 py-1.5 text-[11px] font-semibold ${
          props.value === "partner" ? "bg-[var(--il-accent-bg)] text-[var(--il-accent)]" : "text-muted-foreground"
        }`}
      >
        {t("feed.partner")}
      </button>
    </div>
  );
}

export function createDefaultFeedFilters(): FeedFilters {
  return {
    when: null,
    customStartDate: "",
    customEndDate: "",
    timeOfDay: null,
    customStartTime: "",
    customEndTime: "",
    categoryId: null,
    subTagIds: [],
    communityPartner: "all",
  };
}

function parseListingDateToDate(dateValue: string): Date | null {
  const parsedDate = new Date(`${dateValue}, ${new Date().getFullYear()}`);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function parseListingTimeToMinutes(timeValue: string): number | null {
  const [time, period] = timeValue.split(" ");
  if (!time || !period) {
    return null;
  }

  const [hourRaw, minuteRaw] = time.split(":");
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  const normalizedHour = period === "PM" && hour < 12 ? hour + 12 : period === "AM" && hour === 12 ? 0 : hour;
  return normalizedHour * 60 + minute;
}

function parseClockToMinutes(clockValue: string): number | null {
  const [hourRaw, minuteRaw] = clockValue.split(":");
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  return hour * 60 + minute;
}

export function listingMatchesFeedFilters(listing: Listing, filters: FeedFilters): boolean {
  if (filters.communityPartner === "community" && listing.type !== "community") {
    return false;
  }

  if (filters.communityPartner === "partner" && listing.type === "community") {
    return false;
  }

  if (filters.categoryId && listing.categoryId !== filters.categoryId) {
    return false;
  }

  if (filters.subTagIds.length > 0 && !filters.subTagIds.every((subTagId) => listing.subTagIds.includes(subTagId))) {
    return false;
  }

  const listingDate = parseListingDateToDate(listing.date);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayOfWeek = now.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfToday.getDate() - daysToMonday);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(startOfToday.getDate() + 1);
  endOfToday.setMilliseconds(-1);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfToday.getDate() + 1);
  const endOfTomorrow = new Date(startOfTomorrow);
  endOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
  endOfTomorrow.setMilliseconds(-1);
  const startOfWeekend = new Date(startOfWeek);
  startOfWeekend.setDate(startOfWeek.getDate() + 5);
  const endOfWeekend = new Date(startOfWeekend);
  endOfWeekend.setDate(startOfWeekend.getDate() + 2);
  endOfWeekend.setMilliseconds(-1);

  if (filters.when && listingDate) {
    if (filters.when === "today" && (listingDate < startOfToday || listingDate > endOfToday)) {
      return false;
    }

    if (filters.when === "tomorrow" && (listingDate < startOfTomorrow || listingDate > endOfTomorrow)) {
      return false;
    }

    if (filters.when === "this-week" && (listingDate < startOfWeek || listingDate > endOfWeek)) {
      return false;
    }

    if (filters.when === "this-weekend" && (listingDate < startOfWeekend || listingDate > endOfWeekend)) {
      return false;
    }

    if (filters.when === "custom" && (filters.customStartDate || filters.customEndDate)) {
      const customStartDate = filters.customStartDate ? new Date(filters.customStartDate) : null;
      const customEndDate = filters.customEndDate ? new Date(filters.customEndDate) : null;
      if (customStartDate && listingDate < customStartDate) {
        return false;
      }
      if (customEndDate) {
        customEndDate.setHours(23, 59, 59, 999);
        if (listingDate > customEndDate) {
          return false;
        }
      }
    }
  }

  const listingMinutes = parseListingTimeToMinutes(listing.time);
  if (filters.timeOfDay && listingMinutes !== null) {
    if (filters.timeOfDay === "morning" && (listingMinutes < 300 || listingMinutes >= 720)) {
      return false;
    }

    if (filters.timeOfDay === "afternoon" && (listingMinutes < 720 || listingMinutes >= 1020)) {
      return false;
    }

    if (filters.timeOfDay === "evening" && (listingMinutes < 1020 || listingMinutes >= 1439)) {
      return false;
    }

    if (filters.timeOfDay === "custom" && (filters.customStartTime || filters.customEndTime)) {
      const customStartTime = filters.customStartTime ? parseClockToMinutes(filters.customStartTime) : null;
      const customEndTime = filters.customEndTime ? parseClockToMinutes(filters.customEndTime) : null;

      if (customStartTime !== null && listingMinutes < customStartTime) {
        return false;
      }

      if (customEndTime !== null && listingMinutes > customEndTime) {
        return false;
      }
    }
  }

  return true;
}

export function FeedFilterBar(props: Props) {
  const { lang, t } = useI18n();
  const categoryItems = CATEGORY_DEFINITIONS.map((category) => (lang === "ja" ? category.labelJa : category.label));
  const selectedCategory = CATEGORY_DEFINITIONS.find((category) => category.id === props.filters.categoryId) ?? null;

  function updateFilters(nextFilters: Partial<FeedFilters>) {
    props.onChange({ ...props.filters, ...nextFilters });
  }

  function setCategoryByLabel(label: string | null) {
    if (label === null) {
      updateFilters({ categoryId: null, subTagIds: [] });
      return;
    }

    const category =
      CATEGORY_DEFINITIONS.find((item) => item.label === label) ??
      CATEGORY_DEFINITIONS.find((item) => item.labelJa === label) ??
      null;

    if (!category) {
      return;
    }

    updateFilters({ categoryId: category.id, subTagIds: [] });
  }

  const selectedCategoryLabel = selectedCategory
    ? lang === "ja"
      ? selectedCategory.labelJa
      : selectedCategory.label
    : null;

  return (
    <div className="mb-4 space-y-2 rounded-xl border bg-card p-3">
      <div className="grid gap-2 md:grid-cols-2">
        <SearchSelect
          items={[t("filters.when.today"), t("filters.when.tomorrow"), t("filters.when.thisWeek"), t("filters.when.thisWeekend"), t("filters.when.custom")]}
          value={
            props.filters.when
              ? {
                  today: t("filters.when.today"),
                  tomorrow: t("filters.when.tomorrow"),
                  "this-week": t("filters.when.thisWeek"),
                  "this-weekend": t("filters.when.thisWeekend"),
                  custom: t("filters.when.custom"),
                }[props.filters.when]
              : null
          }
          onChange={(value) => {
            const whenByLabel: Record<string, WhenFilter> = {
              [t("filters.when.today")]: "today",
              [t("filters.when.tomorrow")]: "tomorrow",
              [t("filters.when.thisWeek")]: "this-week",
              [t("filters.when.thisWeekend")]: "this-weekend",
              [t("filters.when.custom")]: "custom",
            };

            updateFilters({
              when: value ? whenByLabel[value] : null,
              ...(value !== t("filters.when.custom")
                ? { customStartDate: "", customEndDate: "" }
                : {}),
            });
          }}
          placeholder={t("filters.when.label")}
          icon={<Calendar className="size-3.5" />}
        />
        <SearchSelect
          items={[t("filters.time.morning"), t("filters.time.afternoon"), t("filters.time.evening"), t("filters.time.custom")]}
          value={
            props.filters.timeOfDay
              ? {
                  morning: t("filters.time.morning"),
                  afternoon: t("filters.time.afternoon"),
                  evening: t("filters.time.evening"),
                  custom: t("filters.time.custom"),
                }[props.filters.timeOfDay]
              : null
          }
          onChange={(value) => {
            const timeByLabel: Record<string, TimeOfDayFilter> = {
              [t("filters.time.morning")]: "morning",
              [t("filters.time.afternoon")]: "afternoon",
              [t("filters.time.evening")]: "evening",
              [t("filters.time.custom")]: "custom",
            };

            updateFilters({
              timeOfDay: value ? timeByLabel[value] : null,
              ...(value !== t("filters.time.custom")
                ? { customStartTime: "", customEndTime: "" }
                : {}),
            });
          }}
          placeholder={t("filters.time.label")}
          icon={<Clock3 className="size-3.5" />}
        />
      </div>

      {props.filters.when === "custom" && (
        <div className="grid gap-2 md:grid-cols-2">
          <input
            type="date"
            value={props.filters.customStartDate}
            onChange={(event) => updateFilters({ customStartDate: event.target.value })}
            className="rounded-lg border bg-card px-3 py-2 text-xs"
            aria-label={t("filters.when.customStart")}
          />
          <input
            type="date"
            value={props.filters.customEndDate}
            onChange={(event) => updateFilters({ customEndDate: event.target.value })}
            className="rounded-lg border bg-card px-3 py-2 text-xs"
            aria-label={t("filters.when.customEnd")}
          />
        </div>
      )}

      {props.filters.timeOfDay === "custom" && (
        <div className="grid gap-2 md:grid-cols-2">
          <input
            type="time"
            value={props.filters.customStartTime}
            onChange={(event) => updateFilters({ customStartTime: event.target.value })}
            className="rounded-lg border bg-card px-3 py-2 text-xs"
            aria-label={t("filters.time.customStart")}
          />
          <input
            type="time"
            value={props.filters.customEndTime}
            onChange={(event) => updateFilters({ customEndTime: event.target.value })}
            className="rounded-lg border bg-card px-3 py-2 text-xs"
            aria-label={t("filters.time.customEnd")}
          />
        </div>
      )}

      <div className="grid gap-2 md:grid-cols-2">
        <SearchSelect
          items={categoryItems}
          value={selectedCategoryLabel}
          onChange={setCategoryByLabel}
          placeholder={t("filters.category.label")}
          icon={<Tag className="size-3.5" />}
        />
        <SegmentedToggle
          value={props.filters.communityPartner}
          onChange={(value) => updateFilters({ communityPartner: value })}
        />
      </div>

      {selectedCategory && (
        <div className="flex flex-wrap gap-1.5">
          {selectedCategory.subTags.map((subTag) => {
            const subTagLabel = lang === "ja" ? subTag.labelJa : subTag.label;
            const isActive = props.filters.subTagIds.includes(subTag.id);

            return (
              <FilterChip
                key={subTag.id}
                label={subTagLabel}
                isActive={isActive}
                onClick={() =>
                  updateFilters({
                    subTagIds: isActive
                      ? props.filters.subTagIds.filter((id) => id !== subTag.id)
                      : [...props.filters.subTagIds, subTag.id],
                  })
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
