import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";
import Unfonts from 'unplugin-fonts/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteBasicSslPlugin(),
    Unfonts({
      google: {
        families: [
          {
            name: 'IBM Plex Mono',
            styles: 'wght@700',
            defer: true,
          },
          {
            name: 'Press Start 2P',
            styles: 'wght@400',
            defer: true,
          },
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
