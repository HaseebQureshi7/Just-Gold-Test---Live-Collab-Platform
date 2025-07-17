import axios from "axios";
import { baseURL } from "../config/baseURL";

export const api = axios.create({
  baseURL: baseURL + "/api/v1",
  withCredentials: true, // Ensures cookies (access & refresh tokens) are sent with every request
});

let isRefreshing = false;
let refreshQueue: (() => void)[] = [];

// Function to refresh the token
const refreshAccessToken = async () => {
  if (isRefreshing) {
    return new Promise<void>((resolve) => refreshQueue.push(resolve));
  }

  isRefreshing = true;
  try {
    await axios.get(`${baseURL}/api/v1/auth/refresh`, {
      withCredentials: true,
    });

    refreshQueue.forEach((resolve) => resolve());
    refreshQueue = [];
  } catch (error) {
    // window.location.href = "/"; // Redirect if refresh fails
    console.log(error)
  } finally {
    isRefreshing = false;
  }
};

// Response Interceptor: Handles 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      await refreshAccessToken();
      return api(error.config); // Retry failed request
    }
    return Promise.reject(error);
  }
);
