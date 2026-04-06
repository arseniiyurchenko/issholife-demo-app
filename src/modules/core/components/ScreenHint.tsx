import { type ReactNode, useState } from "react";
import { BookOpen, CircleHelp } from "lucide-react";
import { useLocation } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/modules/shadcn/components/ui/dialog";
import { getScreenRequirements } from "@/modules/core/requirements-feature-links";

interface Props {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function ScreenHint(props: Props) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [brdOpen, setBrdOpen] = useState(false);
  const requirement = getScreenRequirements(props.title);
  const { pathname } = useLocation();
  const hasMobileBottomTabs = pathname.startsWith("/screens/public") || pathname.startsWith("/screens/member");
  const infoButtonBottomClass = hasMobileBottomTabs
    ? "bottom-[calc(5.5rem+env(safe-area-inset-bottom))] md:bottom-5"
    : "bottom-5";
  const requirementsButtonBottomClass = hasMobileBottomTabs
    ? "bottom-[calc(9rem+env(safe-area-inset-bottom))] md:bottom-20"
    : "bottom-20";

  return (
    <>
      {requirement && (
        <button
          type="button"
          aria-label="Open business requirements"
          title={requirement.featureName}
          onClick={() => setBrdOpen(true)}
          className={`fixed right-5 z-40 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 ${requirementsButtonBottomClass}`}
        >
          <BookOpen className="size-5" />
        </button>
      )}

      <button
        type="button"
        aria-label="Screen info"
        onClick={() => setInfoOpen(true)}
        className={`fixed right-5 z-40 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 ${infoButtonBottomClass}`}
      >
        <CircleHelp className="size-5" />
      </button>

      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            {props.description && (
              <DialogDescription>{props.description}</DialogDescription>
            )}
          </DialogHeader>

          {props.children && (
            <div className="text-sm text-foreground">{props.children}</div>
          )}

          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>

      {requirement && (
        <Dialog open={brdOpen} onOpenChange={setBrdOpen}>
          <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{requirement.featureName}</DialogTitle>
              <DialogDescription>
                {requirement.source === "brd"
                  ? "From Business Requirements Document"
                  : "From Prototype (not in BRD)"}
              </DialogDescription>
            </DialogHeader>

            <div className="whitespace-pre-line text-sm leading-relaxed text-foreground">
              {requirement.content}
            </div>

            <DialogFooter showCloseButton />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
