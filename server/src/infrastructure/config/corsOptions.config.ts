import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  // origin: ["http://localhost:5173"],
  origin: true,
  credentials: true,
  exposedHeaders: "Set-Cookie",
};
