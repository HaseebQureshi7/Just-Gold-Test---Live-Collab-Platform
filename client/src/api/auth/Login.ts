import { api } from "../api";

interface ILogin {
  email: string;
  password: string;
}

export const login = async (loginDetails: ILogin) => {
  try {
    const res = await api.post("/auth/login", loginDetails);
    return res.data;
  } catch (err: any) {
    console.error("Login API Error:", err.response?.data || err.message);
    throw err; // Let the caller handle the error
  }
};
