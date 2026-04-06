import { useState } from "react";
import { ArrowLeft, Car, Clock, DollarSign, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";

export function RideShareCreateScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("Mt. Takao");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("3");

  function handleSubmit() {
    hints.push(
      `Ride created: ${origin || "Unknown origin"} -> ${destination || "Unknown destination"} at ${time || "TBD"}.`,
    );
    navigate("/screens/member/rideshare");
  }

  return (
    <IsshoLifeLayout showToggle={false}>
      <div className="border-b bg-card px-4 py-2.5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2.5">
          <ArrowLeft className="size-4 text-muted-foreground" />
          <span className="text-xs font-semibold text-foreground">{t("ride.createRide")}</span>
        </button>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Car className="size-4" />
            {t("ride.createRide")}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Post your route so others can request to join.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <MapPin className="mr-0.5 inline size-3" /> Origin
          </label>
          <input
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            placeholder="e.g. Shinjuku Station"
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <MapPin className="mr-0.5 inline size-3" /> Destination
          </label>
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <Clock className="mr-0.5 inline size-3" /> Time
            </label>
            <input
              value={time}
              onChange={(event) => setTime(event.target.value)}
              placeholder="e.g. 4:30 AM"
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
            />
          </div>

          <div className="flex-1">
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <Users className="mr-0.5 inline size-3" /> Seats
            </label>
            <input
              value={seats}
              onChange={(event) => setSeats(event.target.value)}
              type="number"
              min={1}
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-xs outline-none"
            />
          </div>
        </div>

        <div className="rounded-lg bg-muted p-3 text-[11px] text-muted-foreground">
          <div className="mb-1 flex items-center gap-1 font-semibold text-foreground">
            <DollarSign className="size-3.5" />
            Cost split note
          </div>
          Fuel and tolls are split fairly among riders. This is not a taxi or commercial service.
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-[var(--il-accent)] py-3 text-sm font-bold text-white"
        >
          Post Ride
        </button>
      </div>

      <ScreenHint
        title="Ride Share Create"
        description="Member screen for creating a new ride post with route, time, and seat details."
      />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
