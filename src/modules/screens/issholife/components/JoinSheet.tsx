import { Car, ShieldAlert } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/modules/shadcn/components/ui/sheet";
import { useI18n } from "@/modules/core/i18n";
import { type Listing } from "@/modules/core/issholife-data";

interface Props {
  listing: Listing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function JoinSheet({ listing, open, onOpenChange, onConfirm }: Props) {
  const { t, lang } = useI18n();

  const title = lang === "ja" ? listing.titleJa : listing.title;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="inset-x-auto left-1/2 w-full max-w-[520px] -translate-x-1/2 rounded-t-2xl"
      >
        <SheetHeader className="px-5 pt-4 pb-2">
          <SheetTitle>{t("join.joinEvent")}</SheetTitle>
        </SheetHeader>

        <div className="px-5 pb-5">
          <div className="text-sm font-semibold text-foreground">{title}</div>
          <div className="mb-5 text-xs text-muted-foreground">
            {listing.date} &middot; {listing.time} &middot; {listing.area}
          </div>

          <div className="rounded-xl border bg-muted/40 p-3">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-foreground">
              <Car className="size-3.5 text-[var(--il-accent)]" />
              Ride-share is independent
            </div>
            <div className="text-[11px] text-muted-foreground">
              Coordinate rides in the dedicated ride-share tab. Listings do not include
              transport arrangements.
            </div>
          </div>

          <button
            type="button"
            onClick={onConfirm}
            className="mt-3 w-full rounded-lg bg-[var(--il-accent)] py-2.5 text-xs font-bold text-white transition-colors"
          >
            Confirm join
          </button>

          <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-[11px] text-muted-foreground">
            <ShieldAlert className="size-3.5" />
            {t("join.identityReveal")}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
