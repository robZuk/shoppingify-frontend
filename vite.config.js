import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // base: "https://shoppingify-backend-61bb.onrender.com",
  plugins: [react()],
  server: {
    // host: true,
    // proxy: {
    //   "/api": {
    //     target: "https://shoppingify-backend-61bb.onrender.com",
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});
