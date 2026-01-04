import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  envDir: '../',
  server: {
    proxy: {
      '/api': {
        target: 'https://costcodle-321020937506.europe-west1.run.app',
        changeOrigin: false,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: {
      clientPort: 443,
    },
    allowedHosts: true,
  }
});
