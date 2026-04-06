import { useI18n } from "@/modules/core/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "ja" : "en")}
      className="rounded-md border bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-accent"
    >
      {lang === "en" ? "JP" : "EN"}
    </button>
  );
}
