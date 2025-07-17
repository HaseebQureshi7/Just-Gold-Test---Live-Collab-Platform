// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "images/icon-192x192.png",
        "images/icon-512x512.png",
        "images/huddle-logo-top.png",
        "images/huddle-logo.png",
      ],
      manifest: {
        name: "Huddle",
        short_name: "Huddle",
        description: "Collaboration space for creatives",
        start_url: "/",
        display: "standalone",
        background_color: "#36c1c1",
        theme_color: "#36c1c1",
        icons: [
          {
            src: "/images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
