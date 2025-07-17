import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

function ProtectedRoute() {
  // check for user's existance
  const { user } = useUser();
  // const user = false;
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
