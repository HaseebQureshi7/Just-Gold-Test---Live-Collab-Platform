import { useMutation } from "@tanstack/react-query";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../api/room/CreateRoom";

const useCreateRoom = () => {
  const { showAlert, edgeGlow } = useAlert(); // Get alert function from context
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createRoom,
    onSuccess: (data) => {
      const room = data.data.room;
      showAlert(`${room.name} Room joined! `, "success");
      navigate(`/session/${room.id}`);
    },
    onError: (error: any) => {
      edgeGlow("error");
      showAlert(
        error ? error?.response?.data?.error?.message : "Room creation failed",
        "error"
      ); // ✅ Show error alert
    },
  });
};

export default useCreateRoom;
