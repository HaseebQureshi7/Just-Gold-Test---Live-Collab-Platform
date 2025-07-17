import { api } from "../api";

export const fetchLatestCanvas = async (cid:string) => {
  try {
    const res = await api.get(`/canvas/${cid}`);
    return res.data;
  } catch (err: any) {
    console.error(
      "API Error: Canvas not found!",
      err.response?.data || err.message
    );
    throw err;
  }
};
