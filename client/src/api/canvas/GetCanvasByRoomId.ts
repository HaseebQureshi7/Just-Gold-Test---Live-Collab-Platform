import { api } from "../api";

export const getCanvasByRoomId = async (roomId:string) => {
  try {
    const res = await api.get(`/canvas/room/${roomId}`,);
    return res.data.data;
  } catch (err: any) {
    console.error(
      "API Error: Canvas not found!",
      err.response?.data || err.message
    );
    throw err;
  }
};
