import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, BuildOptions } from "vite"
// import { createServer } from 'vite';


export default defineConfig({
  build: {
    envDir: process.cwd(),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/Sindalah-features",
})
