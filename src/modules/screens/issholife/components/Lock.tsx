import type { ReactNode } from "react";
import { LockKeyhole } from "lucide-react";
import { useI18n } from "@/modules/core/i18n";

interface Props {
  isLocked: boolean;
  label: string;
  onUnlock: () => void;
  children: ReactNode;
}

export function Lock({ isLocked, label, onUnlock, children }: Props) {
  const { t } = useI18n();

  if (!isLocked) return <>{children}</>;

  return (
    <div className="relative overflow-hidden rounded-xl" style={{ minHeight: 124 }}>
      <div className="pointer-events-none select-none blur-sm opacity-35">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-background/90">
        <LockKeyhole className="mb-1.5 size-4 text-muted-foreground" />
        <div className="mb-2 text-xs font-semibold text-muted-foreground">
          {label}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUnlock();
          }}
          className="rounded-lg bg-[var(--il-accent)] px-5 py-1.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          {t("common.unlockFree")}
        </button>
        <div className="mt-1.5 text-[10px] text-muted-foreground">
          {t("common.signInViaMagicLink")}
        </div>
      </div>
    </div>
  );
}
