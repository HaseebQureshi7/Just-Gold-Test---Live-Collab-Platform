import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth/Login";
import { useAlert } from "./useAlert";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { showAlert, edgeGlow } = useAlert(); // Get alert function from context
  const { setUser } = useUser();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const fName = data.data.user.name.split(" ")[0];
      showAlert(`Welcome back! ${fName}`, "success");
      setUser(data.data.user);
      navigate("/dashboard", { replace: true });

      // Save token, redirect user, etc.
    },
    onError: (error: any) => {
      // console.error("Login Failed:", error);
      edgeGlow("error");
      showAlert(
        error ? error?.response?.data?.error?.message : "Login failed",
        "error"
      ); // ✅ Show error alert
    },
  });
};

export default useLogin;
