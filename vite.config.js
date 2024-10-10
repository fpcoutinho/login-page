import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SELECTED_THEME = 'main'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@root',
        replacement: path.resolve(__dirname, './')
      },
      {
        find: '@source',
        replacement: path.resolve(__dirname, `./src`)
      }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // We use sass-embedded, but if you use normal sass, just replace this with 'modern'
        additionalData: `
          @use 'sass:map';
          @import "sanhaua/system/themes/${SELECTED_THEME}/design-tokens/design-tokens.scss";
          @import "sanhaua/system/themes/${SELECTED_THEME}/global/global.scss";
          @import "sanhaua/system/themes/${SELECTED_THEME}/web-requirements/web-requirements.scss";
        `
      }
    }
  }
})
