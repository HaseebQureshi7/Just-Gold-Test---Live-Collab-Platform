import { api } from "../api";

export const getRoomById = async (rid: string) => {
  try {
    const res = await api.get(`/room/${rid}`);
    return res.data;
  } catch (err: any) {
    console.error(
      "Room not found! API Error:",
      err.response?.data || err.message
    );
    throw err; // Let the caller handle the error
  }
};
