import { useMutation } from "@tanstack/react-query";
import { useAlert } from "./useAlert";
import { signup } from "../api/auth/Signup";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const { showAlert, edgeGlow } = useAlert(); // Get alert function from context
  const { setUser } = useUser();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      const fName = data.data.user.name.split(" ")[0];
      showAlert(`Welcome! ${fName}`, "success");
      console.log(data);
      setUser(data.data.user);
      navigate("/dashboard", { replace: true });
      // Save token, redirect user, etc.
    },
    onError: (error: any) => {
      // console.error("Registeration Failed:", error);
      edgeGlow("error")
      showAlert(error?.response?.data?.error?.message, "error");
    },
  });
};

export default useSignup;
