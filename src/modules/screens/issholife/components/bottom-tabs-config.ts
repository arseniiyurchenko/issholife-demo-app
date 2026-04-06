import type { LucideIcon } from "lucide-react";
import { Car, CheckCircle, Compass, Home } from "lucide-react";

export type IsshoLifeBottomTabKey = "discover" | "going" | "stay" | "rides";

export interface IsshoLifeBottomTabItem {
  key: IsshoLifeBottomTabKey;
  label: string;
  to: string;
  icon: LucideIcon;
  isActive: boolean;
}

export function getIsshoLifeActiveBottomTab(
  pathname: string,
  isPublic: boolean,
): IsshoLifeBottomTabKey {
  if (isPublic) {
    if (pathname.startsWith("/screens/public/rideshare")) {
      return "rides";
    }

    if (pathname.startsWith("/screens/public/stay")) {
      return "stay";
    }

    if (pathname.startsWith("/screens/public/going")) {
      return "going";
    }

    return "discover";
  }

  if (pathname.startsWith("/screens/member/rideshare")) {
    return "rides";
  }

  if (pathname.startsWith("/screens/member/going")) {
    return "going";
  }

  if (pathname.startsWith("/screens/member/stay")) {
    return "stay";
  }

  return "discover";
}

interface GetIsshoLifeBottomTabsInput {
  pathname: string;
  isPublic: boolean;
  t: (key: string) => string;
}

export function getIsshoLifeBottomTabs(
  input: GetIsshoLifeBottomTabsInput,
): IsshoLifeBottomTabItem[] {
  const activeTab = getIsshoLifeActiveBottomTab(input.pathname, input.isPublic);
  const { isPublic, t } = input;

  return [
    {
      key: "discover",
      label: t("feed.discover"),
      to: isPublic ? "/screens/public/feed" : "/screens/member/feed",
      icon: Compass,
      isActive: activeTab === "discover",
    },
    {
      key: "going",
      label: t("feed.going"),
      to: isPublic ? "/screens/public/going" : "/screens/member/going",
      icon: CheckCircle,
      isActive: activeTab === "going",
    },
    {
      key: "stay",
      label: t("feed.stay"),
      to: isPublic ? "/screens/public/stay" : "/screens/member/stay",
      icon: Home,
      isActive: activeTab === "stay",
    },
    {
      key: "rides",
      label: t("feed.rides"),
      to: isPublic ? "/screens/public/rideshare" : "/screens/member/rideshare",
      icon: Car,
      isActive: activeTab === "rides",
    },
  ];
}
