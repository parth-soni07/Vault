import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    watch: {
      usePolling: true, // Enables file change detection in some cases
    },
    hmr: true, // Ensures hot module replacement is active
  },
});
