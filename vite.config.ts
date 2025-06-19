import { defineConfig } from 'vite';

export default defineConfig({
  base: '/qrcode-generator/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
