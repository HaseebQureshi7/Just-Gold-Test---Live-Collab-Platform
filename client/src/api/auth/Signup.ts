import { api } from "../api";

interface ISignup {
  name: string;
  email: string;
  password: string;
}

export const signup = async (signupDetails: ISignup) => {
  try {
    const res = await api.post("/auth/signup", signupDetails);
    return res.data;
  } catch (err: any) {
    console.error("Signup API Error:", err.response?.data || err.message);
    throw err; // Let the caller handle the error
  }
};
