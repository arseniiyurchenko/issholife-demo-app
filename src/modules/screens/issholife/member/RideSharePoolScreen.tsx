import { Car, AlertTriangle, Plus, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { RIDES } from "@/modules/core/issholife-data";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";
import { RidePoolCard } from "../components/RidePoolCard";
import { useIsshoLife } from "../issholife-context";

export function RideSharePoolScreen() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { getMyRides, getRideRequestStatus } = useIsshoLife();
  const myRideIds = getMyRides();
  const myRides = RIDES.filter((ride) => myRideIds.includes(ride.id));

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="flex items-center justify-between border-b bg-card px-4 py-3">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Car className="size-4" />
            {t("ride.pool")}
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Mt. Takao &middot; {RIDES.length} {t("ride.ridesAvailable")}
          </p>
        </div>
        <button
          onClick={() => navigate("/screens/member/rideshare/create")}
          className="flex items-center gap-1 rounded-lg bg-[var(--il-accent)] px-3 py-1.5 text-xs font-bold text-white"
        >
          <Plus className="size-3.5" />
          {t("ride.createRide")}
        </button>
      </div>
      <div className="p-4">
        <div className="mb-4 rounded-xl border bg-card p-4">
          <h3 className="mb-2 text-xs font-bold text-foreground">My Rides</h3>
          {myRides.length === 0 ? (
            <p className="text-[11px] text-muted-foreground">
              No ride requests yet. Open a ride to request your seat.
            </p>
          ) : (
            <div className="space-y-2">
              {myRides.map((ride) => (
                <div key={ride.id} className="rounded-lg border bg-background p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      {ride.from}
                      <ArrowRight className="size-3 text-muted-foreground" />
                      {ride.to}
                    </div>
                    <span className="text-[10px] font-semibold text-[var(--il-accent)]">
                      {getRideRequestStatus(ride.id) === "confirmed" ? "Confirmed" : "Requested"}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {ride.time} &middot; {ride.cost}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => navigate(`/screens/member/rideshare/${ride.id}`)}
                      className="rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold text-foreground"
                    >
                      Open ride
                    </button>
                    <button
                      onClick={() => navigate(`/screens/member/chat/${ride.id}`)}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold text-foreground"
                    >
                      <MessageCircle className="size-3.5" />
                      Chat with driver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {RIDES.map((r) => (
          <RidePoolCard
            key={r.id}
            ride={r}
            onClick={() => navigate(`/screens/member/rideshare/${r.id}`)}
          />
        ))}
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted p-3 text-[11px] text-muted-foreground">
          <AlertTriangle className="size-3.5 shrink-0" />
          {t("ride.costSplitOnly")}
        </div>
      </div>
      <ScreenHint
        title="Ride Share Pool (Member)"
        description="Member view of destination-based ride share pool. Browse rides, create new ride posts, and join existing ones."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
