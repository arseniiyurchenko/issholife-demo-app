import { type ComponentType, useState } from "react";
import { Bus, Car, Home, PersonStanding, ShieldAlert } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/modules/shadcn/components/ui/sheet";
import { useI18n } from "@/modules/core/i18n";
import { STAYS, type Listing, type Stay } from "@/modules/core/issholife-data";
import type { JoinTransportKey } from "../issholife-context";
import { TrustRedirect } from "./TrustRedirect";

interface Props {
  listing: Listing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (transport: JoinTransportKey) => void;
}

export function JoinSheet({ listing, open, onOpenChange, onConfirm }: Props) {
  const { t, lang } = useI18n();
  const [transport, setTransport] = useState<JoinTransportKey | null>(null);
  const [redirectStay, setRedirectStay] = useState<Stay | null>(null);
  const [bookedStayId, setBookedStayId] = useState<number | null>(null);

  const title = lang === "ja" ? listing.titleJa : listing.title;
  const stayRecommendations = STAYS.filter((stay) => stay.area === listing.area);
  const recommendedStays =
    stayRecommendations.length > 0 ? stayRecommendations : STAYS.slice(0, 2);

  if (redirectStay) {
    return (
      <div className="fixed inset-0 z-[120] bg-background">
        <TrustRedirect
          stay={redirectStay}
          onBack={() => {
            setBookedStayId(redirectStay.id);
            setRedirectStay(null);
          }}
        />
      </div>
    );
  }

  const options: {
    key: JoinTransportKey;
    label: string;
    sub: string;
    icon: ComponentType<{ className?: string }>;
  }[] = [];
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

          {transport && (
            <div className="mt-4 rounded-xl border bg-muted/40 p-3">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Home className="size-3.5 text-[var(--il-accent)]" />
                Stay near this event
              </div>
              <div className="space-y-2">
                {recommendedStays.slice(0, 2).map((stay) => (
                  <button
                    key={stay.id}
                    type="button"
                    onClick={() => setRedirectStay(stay)}
                    className="flex w-full items-center justify-between rounded-lg border bg-background px-2.5 py-2 text-left"
                  >
                    <div>
                      <div className="text-xs font-semibold text-foreground">
                        {stay.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {stay.area} · {stay.rating}★
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-[var(--il-accent)]">
                      {stay.price}
                    </div>
                  </button>
                ))}
              </div>
              {bookedStayId && (
                <div className="mt-2 rounded-lg bg-[var(--il-going-bg)] px-3 py-2 text-center text-[11px] font-semibold text-[var(--il-going)]">
                  Stay booking flow completed on Trust. Continue below to finish joining.
                </div>
              )}
              <button
                type="button"
                onClick={() => onConfirm(transport)}
                className="mt-3 w-full rounded-lg bg-[var(--il-accent)] py-2.5 text-xs font-bold text-white transition-colors"
              >
                Continue with join
              </button>
              <button
                type="button"
                onClick={() => onConfirm(transport)}
                className="mt-1.5 w-full rounded-lg border bg-background py-2.5 text-xs font-semibold text-foreground transition-colors"
              >
                Skip for now
              </button>
              <div className="mt-1.5 text-center text-[11px] text-muted-foreground">
                You can book a stay later in the Trust tab.
              </div>
            </div>
          )}

          {!transport && (
            <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-center text-xs text-muted-foreground">
              Choose transport to continue.
            </div>
          )}

          <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-[11px] text-muted-foreground">
            <ShieldAlert className="size-3.5" />
            {t("join.identityReveal")}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
