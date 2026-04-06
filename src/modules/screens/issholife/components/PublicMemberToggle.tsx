import { useI18n } from "@/modules/core/i18n";

interface Props {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
}

export function PublicMemberToggle({ isPublic, onChange }: Props) {
  const { t } = useI18n();

  return (
    <div className="flex rounded-lg border bg-muted p-0.5">
      <button
        onClick={() => onChange(true)}
        className={`rounded-md px-3 py-1 text-[11.5px] transition-all ${
          isPublic
            ? "bg-card font-bold text-foreground shadow-sm"
            : "text-muted-foreground"
        }`}
      >
        {t("common.public")}
      </button>
      <button
        onClick={() => onChange(false)}
        className={`rounded-md px-3 py-1 text-[11.5px] transition-all ${
          !isPublic
            ? "bg-card font-bold text-foreground shadow-sm"
            : "text-muted-foreground"
        }`}
      >
        {t("common.member")}
      </button>
    </div>
  );
}
