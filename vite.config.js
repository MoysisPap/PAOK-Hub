import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
            const apiKey = process.env.VITE_API_KEY;

            if (apiKey) {
              proxyReq.setHeader("X-Auth-Token", apiKey);
            } else {
              console.error("API key is not set in environment variables.");
            }
          });
        },
      },
    },
  },
});
