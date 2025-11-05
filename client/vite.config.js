import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // or whatever your Vite port is
  },
  // 👇 This fixes 404s for React Router routes like /create
  build: {
    rollupOptions: {},
  },
  resolve: {
    alias: {},
  },
  // 👇 Key fix for React Router
  appType: "spa",
});
