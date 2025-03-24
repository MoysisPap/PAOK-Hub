import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/football-api": {
        target: "https://api.football-data.org",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/football-api/, ""),
        // Using environment variable for the API key
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            proxyReq.setHeader("X-Auth-Token", process.env.VITE_API_KEY);
          });
        },
      },
    },
  },
});
