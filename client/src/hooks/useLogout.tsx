import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/auth/Logout";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";

function useLogout() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      navigate("/");
      showAlert("Logged out successfully", "info");
    },
    onError: (err) => {
        console.log(err.message)
        showAlert("Logged failed!", "error");
    },
  });
}

export default useLogout;
