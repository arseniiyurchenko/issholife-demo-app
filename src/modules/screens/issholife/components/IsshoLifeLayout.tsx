import type { PropsWithChildren } from "react";
import { Globe } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { PublicMemberToggle } from "./PublicMemberToggle";
import { useIsshoLife } from "../issholife-context";

interface Props extends PropsWithChildren {
  showToggle?: boolean;
}

export function IsshoLifeLayout({ children, showToggle = true }: Props) {
  const { isPublic, setIsPublic } = useIsshoLife();

  return (
    <div className="mx-auto min-h-svh max-w-[520px] border-x bg-background">
      <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-card px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Globe className="size-5 text-[var(--il-accent)]" />
          <span className="text-base font-black text-foreground">
            IsshoLife
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <LanguageToggle />
          {showToggle && (
            <PublicMemberToggle isPublic={isPublic} onChange={setIsPublic} />
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
