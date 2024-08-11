import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets/index.ts"),
      "@components": path.resolve(__dirname, "./src/components/index.ts"),
      "@hooks": path.resolve(__dirname, "./src/hooks/index.ts"),
      "@pages": path.resolve(__dirname, "./src/pages/index.ts"),
      "@routes": path.resolve(__dirname, "./src/routes/index.ts"),
      "@api": path.resolve(__dirname, "./src/api/index.ts"),
      "@stores": path.resolve(__dirname, "./src/stores/index.ts"),
      "@theme": path.resolve(__dirname, "./src/theme/index.ts"),
      "@utils": path.resolve(__dirname, "./src/utils/index.ts"),
      "@helper": path.resolve(__dirname, "./src/utils/index.ts"),
    },
  },
});
