import { useState } from "react";
import { Bus, Car, PersonStanding, ShieldAlert } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/modules/shadcn/components/ui/sheet";
import { useI18n } from "@/modules/core/i18n";
import type { Listing } from "@/modules/core/issholife-data";

interface Props {
  listing: Listing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function JoinSheet({ listing, open, onOpenChange, onConfirm }: Props) {
  const { t, lang } = useI18n();
  const [transport, setTransport] = useState<string | null>(null);

  const title = lang === "ja" ? listing.titleJa : listing.title;

  const options: { key: string; label: string; sub: string; icon: React.ElementType }[] = [];
  if (listing.transport === "organizer") {
    options.push({
      key: "org",
      label: t("join.organizerTransport"),
      sub: listing.transportNote ?? "",
      icon: Bus,
    });
  }
  options.push({
    key: "ride",
    label: t("join.rideShare"),
    sub: `3 ${t("ride.rides")}`,
    icon: Car,
  });
  options.push({
    key: "self",
    label: t("join.onMyOwn"),
    sub: lang === "en" ? "Car, train, bike" : "車・電車・自転車",
    icon: PersonStanding,
  });

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

          <div className="mb-2.5 text-xs font-bold text-foreground">
            {t("join.howGettingThere")}
          </div>

          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.key}
                onClick={() => setTransport(opt.key)}
                className={`mb-2 flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left transition-colors ${
                  transport === opt.key
                    ? "border-[var(--il-accent)] bg-[var(--il-accent-bg)]"
                    : "border-border bg-background"
                }`}
              >
                <Icon className="size-5 text-muted-foreground" />
                <div>
                  <div className="text-xs font-semibold text-foreground">
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {opt.sub}
                  </div>
                </div>
              </button>
            );
          })}

          <button
            onClick={() => {
              if (transport) onConfirm();
            }}
            disabled={!transport}
            className={`mt-4 w-full rounded-lg py-3 text-sm font-bold transition-colors ${
              transport
                ? "bg-[var(--il-accent)] text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {t("join.confirm")}
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
