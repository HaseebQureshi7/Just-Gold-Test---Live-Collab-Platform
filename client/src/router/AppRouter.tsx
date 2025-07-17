import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/DashboardPage/Dashboard";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoutes";
import SessionPage from "../pages/SessionPage/SessionPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
// const LoginPage = lazy(() => import("../pages/LoginPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <SignupPage />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <DashboardLayout />,
            children: [{ index: true, element: <DashboardPage /> }],
          },
        ],
      },
      {
        path:"/session/:id",
        element: <SessionPage/>
      },
      {
        path:"*",
        element: <NotFoundPage/>
      }
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
