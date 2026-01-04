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
      // '/api': {
      //   // target: 'costcodle.vercel.app',
      //   target: 'https://costcodle-321020937506.europe-west1.run.app',
      //   changeOrigin: true,
      //   secure: true,
      //   ws: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },
      '/api': 'https://costcodle-321020937506.europe-west1.run.app'
    },
    // hmr: {
    //   clientPort: 443,
    // },
    // allowedHosts: true,
  }
});
