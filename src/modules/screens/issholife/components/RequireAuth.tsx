import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useIsshoLife } from "@/modules/screens/issholife/issholife-context";

export function RequireAuth() {
  const { isAuthenticated, completeAuth, requestUnlock } = useIsshoLife();
  const location = useLocation();
  const shouldAutoAuthFromDemo = new URLSearchParams(location.search).get(
    "demo-auth",
  ) === "1";

  useEffect(() => {
    if (shouldAutoAuthFromDemo) {
      completeAuth();
      return;
    }

    if (!isAuthenticated) {
      requestUnlock(`${location.pathname}${location.search}${location.hash}`);
    }
  }, [
    completeAuth,
    isAuthenticated,
    location.hash,
    location.pathname,
    location.search,
    requestUnlock,
    shouldAutoAuthFromDemo,
  ]);

  if (shouldAutoAuthFromDemo) {
    return <Navigate to={location.pathname} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/screens/auth/sign-in" replace />;
  }

  return <Outlet />;
}
