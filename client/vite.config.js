import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite'
/// <reference types="vite/types/importMeta.d.ts" />
console.log("testing")
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  envDir: '../',
});
