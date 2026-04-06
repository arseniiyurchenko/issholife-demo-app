import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

export interface BackendMessage {
  id: string;
  text: ReactNode;
  timestamp: number;
}

interface BackendHintsContextValue {
  messages: BackendMessage[];
  hasUnread: boolean;
  push: (text: ReactNode) => void;
  markRead: () => void;
  clear: () => void;
}

const BackendHintsContext = createContext<BackendHintsContextValue | null>(null);

export function BackendHintsProvider(props: PropsWithChildren) {
  const [messages, setMessages] = useState<BackendMessage[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const idCounter = useRef(0);

  const push = useCallback((text: ReactNode) => {
    const id = String(++idCounter.current);
    setMessages((prev) => [...prev, { id, text, timestamp: Date.now() }]);
    setHasUnread(true);
  }, []);

  const markRead = useCallback(() => {
    setHasUnread(false);
  }, []);

  const clear = useCallback(() => {
    setMessages([]);
    setHasUnread(false);
  }, []);

  const value = useMemo(
    () => ({ messages, hasUnread, push, markRead, clear }),
    [messages, hasUnread, push, markRead, clear],
  );

  return (
    <BackendHintsContext.Provider value={value}>
      {props.children}
    </BackendHintsContext.Provider>
  );
}

export function useBackendHints() {
  const ctx = useContext(BackendHintsContext);
  if (!ctx) {
    throw new Error("useBackendHints must be used within BackendHintsProvider");
  }
  return ctx;
}
