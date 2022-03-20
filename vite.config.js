import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

let base = '/prettier-php-playground/'

let pwaOptions = {
  base,
  registerType: 'autoUpdate',
  injectRegister: 'script',
  includeAssets: ['favicon.ico', 'robots.txt', 'icon.png'],
  manifest: {
    name: 'Prettier PHP Playground',
    short_name: 'Prettier PHP',
    description: 'A playground for the Prettier PHP plugin',
    lang: 'en',
    display: 'fullscreen',
    background_color: '#1a2b34',
    theme_color: '#1a2b34',
    icons: [
      {
        src: 'https://prettier.io/icon.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: 'https://prettier.io/icon.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: 'https://prettier.io/icon.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: 'https://prettier.io/icon.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: 'https://prettier.io/icon.png',
        sizes: '168x168',
        type: 'image/png'
      },
      {
        src: 'https://prettier.io/icon.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA(pwaOptions)],
  base
})
