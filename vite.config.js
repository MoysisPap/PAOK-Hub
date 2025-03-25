import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/football-api": {
        target: "https://api.football-data.org",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/football-api/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("X-Auth-Token", process.env.VITE_API_KEY);
          });
        },
      },
    },
  },
});
