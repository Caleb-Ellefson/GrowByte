import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // bind to all interfaces
    proxy: {
      '/api': {
        target: 'http://localhost:5100', // Target backend
        changeOrigin: true,
      },
    },
  },
});
