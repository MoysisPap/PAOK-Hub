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
            proxyReq.setHeader(
              "X-Auth-Token",
              "7083bcc646ee421da3b53a90c205b78d"
            ); // Direct API key here
          });
        },
      },
    },
  },
});
