import { api } from "../api";

export const logout = async () => {
  try {
    await api.post("/auth/logout", {});
    return
  } catch (err: any) {
    console.error("Logout API Error:", err.response?.data || err.message);
    throw err; // Let the caller handle the error
  }
};
