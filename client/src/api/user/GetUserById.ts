import { api } from "../api";

export const getUserById = async (uid: string) => {
  try {
    const res = await api.get(`/auth/${uid}`);
    return res.data;
  } catch (err: any) {
    console.error("Get User By Id API Error:", err.response?.data || err.message);
    throw err; // Let the caller handle the error
  }
};
