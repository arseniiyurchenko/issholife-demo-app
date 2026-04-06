import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type ParticipationStatus = "going" | "cancelled";
export type JoinTransportKey = "org" | "ride" | "self";
export type RideRequestStatus = "none" | "requested" | "confirmed";

export interface ListingParticipation {
  status: ParticipationStatus;
  transport: JoinTransportKey | null;
}

interface IsshoLifeContextValue {
  isPublic: boolean;
  setIsPublic: (v: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  postAuthRedirectPath: string | null;
  setPostAuthRedirectPath: (path: string | null) => void;
  requestUnlock: (targetMemberPath: string) => void;
  completeAuth: () => void;
  signOut: () => void;
  participationByListingId: Record<number, ListingParticipation>;
  joinedIds: number[];
  joinListing: (id: number, transport: JoinTransportKey) => void;
  cancelParticipation: (id: number) => void;
  getParticipation: (id: number) => ListingParticipation | null;
  getParticipationStatus: (id: number) => ParticipationStatus | null;
  requestRide: (rideId: number) => void;
  getRideRequestStatus: (rideId: number) => RideRequestStatus;
  getMyRides: () => number[];
}

const IsshoLifeContext = createContext<IsshoLifeContextValue | null>(null);

export function IsshoLifeProvider(props: PropsWithChildren) {
  const [isPublic, setIsPublic] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [postAuthRedirectPath, setPostAuthRedirectPath] = useState<string | null>(
    null,
  );
  const [participationByListingId, setParticipationByListingId] = useState<
    Record<number, ListingParticipation>
  >({});
  const [rideRequestStatusByRideId, setRideRequestStatusByRideId] = useState<
    Record<number, Exclude<RideRequestStatus, "none">>
  >({});

  const joinListing = useCallback((id: number, transport: JoinTransportKey) => {
    setParticipationByListingId((prev) => ({
      ...prev,
      [id]: {
        status: "going",
        transport,
      },
    }));
  }, []);

  const cancelParticipation = useCallback((id: number) => {
    setParticipationByListingId((prev) => {
      const existing = prev[id];
      if (!existing) {
        return prev;
      }

      return {
        ...prev,
        [id]: {
          ...existing,
          status: "cancelled",
        },
      };
    });
  }, []);

  const getParticipation = useCallback(
    (id: number): ListingParticipation | null => participationByListingId[id] ?? null,
    [participationByListingId],
  );

  const getParticipationStatus = useCallback(
    (id: number): ParticipationStatus | null =>
      participationByListingId[id]?.status ?? null,
    [participationByListingId],
  );

  const requestRide = useCallback((rideId: number) => {
    setRideRequestStatusByRideId((prev) => {
      if (prev[rideId]) {
        return prev;
      }

      return {
        ...prev,
        [rideId]: "requested",
      };
    });
  }, []);

  const getRideRequestStatus = useCallback(
    (rideId: number): RideRequestStatus => rideRequestStatusByRideId[rideId] ?? "none",
    [rideRequestStatusByRideId],
  );

  const getMyRides = useCallback(
    (): number[] =>
      Object.keys(rideRequestStatusByRideId).map((rideId) => Number(rideId)),
    [rideRequestStatusByRideId],
  );

  const joinedIds = useMemo(
    () =>
      Object.entries(participationByListingId)
        .filter(([, participation]) => participation.status === "going")
        .map(([id]) => Number(id)),
    [participationByListingId],
  );

  const requestUnlock = useCallback((targetMemberPath: string) => {
    setPostAuthRedirectPath(targetMemberPath);
  }, []);

  const completeAuth = useCallback(() => {
    setIsAuthenticated(true);
    setIsPublic(false);
  }, []);

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
    setIsPublic(true);
    setPostAuthRedirectPath(null);
  }, []);

  const value = useMemo(
    () => ({
      isPublic,
      setIsPublic,
      isAuthenticated,
      setIsAuthenticated,
      postAuthRedirectPath,
      setPostAuthRedirectPath,
      requestUnlock,
      completeAuth,
      signOut,
      participationByListingId,
      joinedIds,
      joinListing,
      cancelParticipation,
      getParticipation,
      getParticipationStatus,
      requestRide,
      getRideRequestStatus,
      getMyRides,
    }),
    [
      isPublic,
      isAuthenticated,
      postAuthRedirectPath,
      requestUnlock,
      completeAuth,
      signOut,
      participationByListingId,
      joinedIds,
      joinListing,
      cancelParticipation,
      getParticipation,
      getParticipationStatus,
      requestRide,
      getRideRequestStatus,
      getMyRides,
    ],
  );

  return (
    <IsshoLifeContext.Provider value={value}>
      {props.children}
    </IsshoLifeContext.Provider>
  );
}

export function useIsshoLife() {
  const ctx = useContext(IsshoLifeContext);
  if (!ctx) {
    throw new Error("useIsshoLife must be used within IsshoLifeProvider");
  }
  return ctx;
}
