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
        // Optional: Add the API key here, but you'll need to use headers when calling this proxy
        // headers: {
        //   "X-Auth-Token": process.env.VITE_API_KEY,
        // },
      },
    },
  },
});
