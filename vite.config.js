import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://shoppingify-backend-61bb.onrender.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // "/api": {
      //   target: "https://shoppingify-backend-61bb.onrender.com",
      //   // target: "http://localhost:5000",
      //   changeOrigin: true,
      //
      // },
    },
  },
});
