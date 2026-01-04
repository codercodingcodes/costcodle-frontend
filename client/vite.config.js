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
        target: 'costcodle.vercel.app',
        changeOrigin: true,
        secure: true,
        ws: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers:[
          {"Access-Control-Allow-Origin":"*"},
          {"Access-Control-Allow-Credentials": true},
          {"Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT"},
          {"Access-Control-Allow-Headers":"*"},
        ]
      },
    },
    hmr: {
      clientPort: 443,
    },
    allowedHosts: true,
  }
});
