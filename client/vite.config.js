import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5100', // Target backend
        changeOrigin: true, // Allows for cross-origin requests
      },
    },
  },
});
