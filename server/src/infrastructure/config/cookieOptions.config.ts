import { CookieOptions } from "express";

const isProduction = process.env.NODE_ENV === "production";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  // secure: isProduction, // Secure in production
  secure: true, // Secure in production
  // sameSite: isProduction ? "none" : "none", // Cross-site support only in production
  sameSite: "none", // Cross-site support only in production
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};
