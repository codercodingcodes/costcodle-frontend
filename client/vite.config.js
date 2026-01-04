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
        // target: 'costcodle.vercel.app',
        target: 'https://costcodle-321020937506.europe-west1.run.app',
        changeOrigin: true,
        secure: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers:{"Access-Control-Allow-Origin":"*",
          // "Access-Control-Allow-Credentials": true,
          // "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
          // "Access-Control-Allow-Headers":"*"},
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
    hmr: {
      clientPort: 443,
    },
    allowedHosts: true,
  }
});
