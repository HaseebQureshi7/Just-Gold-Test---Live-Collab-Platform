import { api } from "../api";

interface ICreateRoom {
  name: string;
}

export const createRoom = async (roomDetails: ICreateRoom) => {
  try {
    const res = await api.post("/room", roomDetails);
    return res.data;
  } catch (err: any) {
    console.error(
      "Room not created! API Error:",
      err.response?.data || err.message
    );
    throw err; // Let the caller handle the error
  }
};
