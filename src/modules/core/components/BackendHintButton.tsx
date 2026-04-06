import { useCallback, useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/modules/shadcn/components/ui/dialog";
import { useBackendHints } from "@/modules/core/backend-hints";
import { cn } from "@/modules/shadcn/lib/utils";

function formatTime(ts: number) {
  const d = new Date(ts);
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function BackendHintButton() {
  const { messages, hasUnread, markRead, clear } = useBackendHints();
  const [open, setOpen] = useState(false);
  const listEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages.length]);

  const handleOpen = useCallback(() => {
    setOpen(true);
    markRead();
  }, [markRead]);

  return (
    <>
      <button
        type="button"
        aria-label="Backend activity"
        onClick={handleOpen}
        className={cn(
          "fixed right-5 bottom-20 z-40 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95",
          hasUnread && "animate-pulse",
        )}
      >
        <Terminal className="size-5" />
        {hasUnread && (
          <span className="absolute -top-1 -right-1 flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-destructive" />
          </span>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm">
              <Terminal className="size-4" />
              Backend Log
            </DialogTitle>
            <p className="text-xs text-muted-foreground">
              Shows what happens on the server when you interact with the screen.
            </p>
          </DialogHeader>

          <div className="max-h-80 space-y-2 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Interact with the screen to see backend activity.
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-md border border-border bg-muted/40 px-3 py-2"
                >
                  <p className="mb-0.5 font-mono text-[10px] text-muted-foreground">
                    {formatTime(msg.timestamp)}
                  </p>
                  <p className="text-sm text-foreground">{msg.text}</p>
                </div>
              ))
            )}
            <div ref={listEndRef} className="flex items-center justify-between pt-1">
              <span className="inline-flex gap-1">
                <span className="animate-[bounce_1s_infinite_0ms] text-muted-foreground">.</span>
                <span className="animate-[bounce_1s_infinite_200ms] text-muted-foreground">.</span>
                <span className="animate-[bounce_1s_infinite_400ms] text-muted-foreground">.</span>
              </span>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clear}
                  className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
