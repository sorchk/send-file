import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: '../backend/dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  base: '/',
  server: {
    port: 5173,
    proxy: {
      '/apis': {
        target: 'http://localhost:12345',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/apis/, ''),
      },
    },
  },
})
