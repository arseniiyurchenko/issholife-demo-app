import { useState } from "react";
import { Car, CheckCircle2, MessageCircle, ShieldAlert } from "lucide-react";
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
  const [isConfirmed, setIsConfirmed] = useState(false);

  const title = lang === "ja" ? listing.titleJa : listing.title;
  const messagingLabel = listing.messagingPlatform === "whatsapp" ? "WhatsApp" : "LINE";
  const platformButtonClassName =
    listing.messagingPlatform === "whatsapp"
      ? "bg-[#25D366] text-white"
      : "bg-[#06C755] text-white";

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setIsConfirmed(false);
        }
        onOpenChange(nextOpen);
      }}
    >
      <SheetContent
        side="bottom"
        className="inset-x-auto left-1/2 w-full max-w-[520px] -translate-x-1/2 rounded-t-2xl"
      >
        <SheetHeader className="px-5 pt-4 pb-2">
          <SheetTitle>{t("join.joinEvent")}</SheetTitle>
        </SheetHeader>

        <div className="px-5 pb-5">
          {!isConfirmed ? (
            <>
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
                onClick={() => {
                  onConfirm();
                  setIsConfirmed(true);
                }}
                className="mt-3 w-full rounded-lg bg-[var(--il-accent)] py-2.5 text-xs font-bold text-white transition-colors"
              >
                Confirm join
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-[11px] text-muted-foreground">
                <ShieldAlert className="size-3.5" />
                {t("join.identityReveal")}
              </div>
            </>
          ) : (
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--il-going)]">
                <CheckCircle2 className="size-4" />
                You&apos;re in!
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Join the group chat on {messagingLabel} to coordinate details with the group.
              </p>
              <a
                href={listing.messagingLink}
                target="_blank"
                rel="noreferrer"
                className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold ${platformButtonClassName}`}
              >
                <MessageCircle className="size-3.5" />
                Join Group Chat ({messagingLabel})
              </a>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="mt-2 w-full rounded-lg border bg-card py-2 text-xs font-semibold text-foreground"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
