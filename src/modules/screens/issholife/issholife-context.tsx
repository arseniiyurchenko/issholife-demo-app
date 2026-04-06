import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface IsshoLifeContextValue {
  isPublic: boolean;
  setIsPublic: (v: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  joinedIds: number[];
  joinListing: (id: number) => void;
}

const IsshoLifeContext = createContext<IsshoLifeContextValue | null>(null);

export function IsshoLifeProvider(props: PropsWithChildren) {
  const [isPublic, setIsPublic] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [joinedIds, setJoinedIds] = useState<number[]>([]);

  const joinListing = useCallback((id: number) => {
    setJoinedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const value = useMemo(
    () => ({
      isPublic,
      setIsPublic,
      isAuthenticated,
      setIsAuthenticated,
      joinedIds,
      joinListing,
    }),
    [isPublic, isAuthenticated, joinedIds, joinListing],
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
