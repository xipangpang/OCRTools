import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import {createStyleImportPlugin} from "vite-plugin-style-import"

// https://vitejs.dev/config/
export default defineConfig({
  base: '/OCRTools/',
  plugins: [
    vue(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style/index`,
        },
      ],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
