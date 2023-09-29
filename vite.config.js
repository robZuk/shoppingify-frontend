import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://shoppingify-backend-61bb.onrender.com",
        changeOrigin: true,
        //
      },
    },
  },
});
