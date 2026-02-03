import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'interior-design': resolve(__dirname, 'src/pages/interior-design.html'),
        'home-staging': resolve(__dirname, 'src/pages/home-staging.html'),
        'showroom': resolve(__dirname, 'src/pages/showroom.html'),
  // 'journal' entry removed — journal page removed from navigation and redirected
      }
    }
  }
});
