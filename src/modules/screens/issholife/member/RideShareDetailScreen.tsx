import { ArrowLeft, ArrowRight, Car, Users, Clock, AlertTriangle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { RIDES } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { useIsshoLife } from "../issholife-context";

export function RideShareDetailScreen() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { requestRide, getRideRequestStatus } = useIsshoLife();
  const rideId = Number(params.id);
  const ride = RIDES.find((item) => item.id === rideId);
  const rideRequestStatus = getRideRequestStatus(rideId);
  const hasRequestedRide = rideRequestStatus !== "none";

  function handleRequestRide() {
    requestRide(rideId);
  }

  function handleChatWithDriver() {
    navigate(`/screens/member/chat/${rideId}`);
  }

  if (!ride) {
    return (
      <IsshoLifeLayout showToggle={false}>
        <div className="border-b bg-card px-4 py-2.5">
          <button
            onClick={() => navigate("/screens/member/rideshare")}
            className="flex items-center gap-2.5"
          >
            <ArrowLeft className="size-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">{t("ride.pool")}</span>
          </button>
        </div>
        <div className="p-4">
          <div className="rounded-xl border bg-card p-5 text-center">
            <h2 className="text-sm font-bold text-foreground">Ride not found</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              This ride may have been removed or the link is invalid.
            </p>
            <button
              onClick={() => navigate("/screens/member/rideshare")}
              className="mt-4 rounded-lg bg-[var(--il-accent)] px-4 py-2 text-xs font-bold text-white"
            >
              Back to ride pool
            </button>
          </div>
        </div>
        <ScreenHint
          title="Ride Share Detail"
          description="Fallback state when a route id does not match an existing ride."
        />
        <BackendHintButton />
      </IsshoLifeLayout>
    );
  }

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-2.5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2.5"
        >
          <ArrowLeft className="size-4 text-muted-foreground" />
          <span className="text-xs font-semibold text-foreground">{t("ride.pool")}</span>
        </button>
      </div>
      <div className="p-4">
        <div className="mb-4 rounded-xl border bg-card p-5">
          <div className="mb-3 flex items-center justify-center gap-3 text-lg font-bold text-foreground">
            {ride.from}
            <ArrowRight className="size-5 text-[var(--il-accent)]" />
            {ride.to}
          </div>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="size-3" />{ride.time}</span>
            <span className="inline-flex items-center gap-1"><Users className="size-3" />{ride.taken}/{ride.seats} {t("ride.seats")}</span>
            <span className="inline-flex items-center gap-1"><Car className="size-3" />Car share</span>
          </div>
        </div>

        <div className="mb-4 rounded-xl border bg-card p-4">
          <h3 className="mb-3 text-xs font-bold text-foreground">Cost Breakdown</h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Fuel estimate</span><span>&yen;800</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tolls</span><span>&yen;250</span>
            </div>
            <div className="flex justify-between border-t pt-1.5 font-bold text-foreground">
              <span>Per person ({ride.seats} seats, incl. driver)</span>
              <span className="text-[var(--il-accent)]">{ride.cost}</span>
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-xl border bg-card p-4">
          <h3 className="mb-2 text-xs font-bold text-foreground">Participants</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-full bg-[var(--il-community-bg)] text-xs font-bold text-[var(--il-community)]">T</div>
              <div>
                <div className="text-xs font-semibold text-foreground">Taro K.</div>
                <div className="text-[10px] text-muted-foreground">Driver</div>
              </div>
            </div>
            {ride.taken > 0 && (
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">S</div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Sara M.</div>
                  <div className="text-[10px] text-muted-foreground">Rider</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleRequestRide}
          disabled={hasRequestedRide}
          className="w-full rounded-xl bg-[var(--il-accent)] py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {hasRequestedRide ? "Request Sent" : "Request to Join"}
        </button>
        <button
          onClick={handleChatWithDriver}
          className="mt-2 w-full rounded-xl border border-border bg-card py-3 text-sm font-semibold text-foreground"
        >
          Chat with driver
        </button>

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted p-3 text-[11px] text-muted-foreground">
          <AlertTriangle className="size-3.5 shrink-0" />
          {t("ride.costSplitOnly")}
        </div>
      </div>
      <ScreenHint title="Ride Share Detail" description="Full ride post details with route, cost breakdown, participants, and join CTA." />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
