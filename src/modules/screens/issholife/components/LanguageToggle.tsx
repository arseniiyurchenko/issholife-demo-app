import { useI18n } from "@/modules/core/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/shadcn/components/ui/select";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <Select value={lang} onValueChange={setLang}>
      <SelectTrigger
        size="sm"
        className="h-7 min-w-[110px] rounded-md border bg-muted px-2.5 text-[11px] font-semibold text-muted-foreground hover:bg-accent"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        align="end"
        className="[&_[data-slot=select-scroll-up-button]]:hidden [&_[data-slot=select-scroll-down-button]]:hidden"
      >
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ja">Japanese</SelectItem>
        <SelectItem value="th">Thai</SelectItem>
      </SelectContent>
    </Select>
  );
}
