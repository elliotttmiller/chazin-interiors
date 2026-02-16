import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: '/pearson-designs/',
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'interior-design': resolve(__dirname, 'interior-design.html'),
        'home-staging': resolve(__dirname, 'home-staging.html'),
        'showroom': resolve(__dirname, 'showroom.html'),
        'vendors': resolve(__dirname, 'vendors.html'),
        'contact': resolve(__dirname, 'contact.html'),
  // 'journal' entry removed — journal page removed from navigation and redirected
      }
    }
  }
});
