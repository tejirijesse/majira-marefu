import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path for GitHub Pages at tejirijesse.github.io/majira-marefu/
export default defineConfig({
  plugins: [react()],
  base: '/majira-marefu/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
    open: true,
  },
});
