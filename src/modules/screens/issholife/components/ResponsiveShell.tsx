import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/modules/shadcn/lib/utils";

interface Props extends PropsWithChildren {
  desktopSidebar?: ReactNode;
  mobileContainerClassName?: string;
  desktopContainerClassName?: string;
  desktopMainClassName?: string;
}

export function ResponsiveShell({
  children,
  desktopSidebar,
  mobileContainerClassName,
  desktopContainerClassName,
  desktopMainClassName,
}: Props) {
  return (
    <div className="min-h-svh bg-background">
      <div className={cn("mx-auto min-h-svh max-w-[520px] border-x bg-background md:hidden", mobileContainerClassName)}>
        {children}
      </div>

      <div className={cn("mx-auto hidden min-h-svh w-full max-w-none border-x bg-background md:flex", desktopContainerClassName)}>
        {desktopSidebar}
        <main className={cn("min-w-0 flex-1", desktopMainClassName)}>{children}</main>
      </div>
    </div>
  );
}
