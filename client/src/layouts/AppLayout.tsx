import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutFlex } from "../styles/utils/flexUtils";
import { api } from "../api/api";
import { useEffect, useState, useCallback } from "react";
import { useUser } from "../hooks/useUser";
import LoadingPage from "../pages/LoadingPage/LoadingPage";

function AppLayout() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Define public routes that don't require authentication.
  const publicRoutes = new Set(["/", "/login", "/register"]);

  // This function handles auto-login by verifying the token or session
  const autoLogin = useCallback(async () => {
    try {
      const res = await api.post("/auth/me", {});
      const loggedInUser = res.data?.data?.user;
      if (loggedInUser) {
        setUser(loggedInUser);
        // If the current route is public, send the user to their dashboard.
        if (publicRoutes.has(location.pathname)) {
          navigate("/dashboard");
        }
      } else {
        // No user data returned: redirect to login if not on a public route.
        if (!publicRoutes.has(location.pathname)) {
          navigate("/login");
        }
      }
    } catch (err) {
      console.error("Auto-login error:", err);
      // Optionally, clear any stale tokens here.
      if (!publicRoutes.has(location.pathname)) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [setUser, navigate, location.pathname]);

  // Run autoLogin if there is no user.
  useEffect(() => {
    if (!user) {
      autoLogin();
    } else {
      setIsLoading(false);
    }
  }, [user, autoLogin]);

  if (isLoading) return <LoadingPage width="100%" height="100dvh" />;

  return <div style={{ ...LayoutFlex }}><Outlet /></div>;
}

export default AppLayout;
