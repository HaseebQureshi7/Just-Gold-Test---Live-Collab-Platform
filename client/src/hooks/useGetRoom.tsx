import { useQuery } from "@tanstack/react-query";
import { getRoomById } from "../api/room/GetRoomById";
import { IRoom } from "../types/IRoom";

function useGetRoom(roomId: string) {
  return useQuery({
    queryKey: ["room", roomId], // ✅ Unique key per room
    queryFn: () => getRoomById(roomId), // ✅ Pass argument
    // enabled: !!roomId, // ✅ Prevent fetching when roomId is undefined
    enabled: false,
    retry: false,
    select: (data) => {
      return data.data.room as IRoom;
    },
  });
}

export default useGetRoom;
