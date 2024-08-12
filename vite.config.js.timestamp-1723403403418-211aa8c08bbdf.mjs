// vite.config.js
import { defineConfig } from "file:///C:/Users/Julian/Documents/Julian/Front/D-ID_Test/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Julian/Documents/Julian/Front/D-ID_Test/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Julian\\Documents\\Julian\\Front\\D-ID_Test";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets/index.ts"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components/index.ts"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks/index.ts"),
      "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages/index.ts"),
      "@routes": path.resolve(__vite_injected_original_dirname, "./src/routes/index.ts"),
      "@api": path.resolve(__vite_injected_original_dirname, "./src/api/index.ts"),
      "@stores": path.resolve(__vite_injected_original_dirname, "./src/stores/index.ts"),
      "@theme": path.resolve(__vite_injected_original_dirname, "./src/theme/index.ts"),
      "@utils": path.resolve(__vite_injected_original_dirname, "./src/utils/index.ts"),
      "@helper": path.resolve(__vite_injected_original_dirname, "./src/utils/index.ts")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxKdWxpYW5cXFxcRG9jdW1lbnRzXFxcXEp1bGlhblxcXFxGcm9udFxcXFxELUlEX1Rlc3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEp1bGlhblxcXFxEb2N1bWVudHNcXFxcSnVsaWFuXFxcXEZyb250XFxcXEQtSURfVGVzdFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvSnVsaWFuL0RvY3VtZW50cy9KdWxpYW4vRnJvbnQvRC1JRF9UZXN0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgXCJAYXNzZXRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvYXNzZXRzL2luZGV4LnRzXCIpLFxuICAgICAgICAgICAgXCJAY29tcG9uZW50c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2NvbXBvbmVudHMvaW5kZXgudHNcIiksXG4gICAgICAgICAgICBcIkBob29rc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2hvb2tzL2luZGV4LnRzXCIpLFxuICAgICAgICAgICAgXCJAcGFnZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9wYWdlcy9pbmRleC50c1wiKSxcbiAgICAgICAgICAgIFwiQHJvdXRlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3JvdXRlcy9pbmRleC50c1wiKSxcbiAgICAgICAgICAgIFwiQGFwaVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2FwaS9pbmRleC50c1wiKSxcbiAgICAgICAgICAgIFwiQHN0b3Jlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3N0b3Jlcy9pbmRleC50c1wiKSxcbiAgICAgICAgICAgIFwiQHRoZW1lXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvdGhlbWUvaW5kZXgudHNcIiksXG4gICAgICAgICAgICBcIkB1dGlsc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3V0aWxzL2luZGV4LnRzXCIpLFxuICAgICAgICAgICAgXCJAaGVscGVyXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvdXRpbHMvaW5kZXgudHNcIiksXG4gICAgICAgIH0sXG4gICAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVixTQUFTLG9CQUFvQjtBQUM3VyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxXQUFXLEtBQUssUUFBUSxrQ0FBVyx1QkFBdUI7QUFBQSxNQUMxRCxlQUFlLEtBQUssUUFBUSxrQ0FBVywyQkFBMkI7QUFBQSxNQUNsRSxVQUFVLEtBQUssUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxNQUN4RCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxNQUN4RCxXQUFXLEtBQUssUUFBUSxrQ0FBVyx1QkFBdUI7QUFBQSxNQUMxRCxRQUFRLEtBQUssUUFBUSxrQ0FBVyxvQkFBb0I7QUFBQSxNQUNwRCxXQUFXLEtBQUssUUFBUSxrQ0FBVyx1QkFBdUI7QUFBQSxNQUMxRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxNQUN4RCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxNQUN4RCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxJQUM3RDtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
