const pkg = require('./package')
const webpack = require('webpack')

const REPO_NAME = 'prettier-php-playground'
const GH_PAGES = process.env.DEPLOY_ENV === 'GH_PAGES'
const routerBase = GH_PAGES
  ? {
      router: {
        base: `/${REPO_NAME}/`
      }
    }
  : {}

const ROOT = GH_PAGES ? `/${REPO_NAME}` : ''
const NON_EMPTY_ROOT = GH_PAGES ? `/${REPO_NAME}` : '/'

module.exports = {
  mode: 'universal',

  ...routerBase,

  /*
   ** Headers of the page
   */
  head: {
    title: 'Prettier PHP Playground',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'description',
        hid: 'description',
        content: pkg.description
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'application-name',
        content: 'Prettier PHP'
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Prettier PHP'
      },
      {
        name: 'theme-color',
        content: '#1a2b34'
      },
      {
        name: 'msapplication-navbutton-color',
        content: '#1a2b34'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      },
      {
        name: 'msapplication-starturl',
        content: NON_EMPTY_ROOT
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      }
    ],
    link: [
      {
        rel: 'icon',
        href: ROOT + '/icon.png'
      },
      {
        rel: 'apple-touch-icon',
        href: ROOT + '/icon.png'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    // lib css
    'codemirror/lib/codemirror.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~plugins/codemirror.js',
      ssr: false
    },
    {
      src: '~plugins/clipboard.js',
      ssr: false
    },
    {
      src: '~plugins/touch-events.js',
      ssr: false
    },
    '~plugins/async-computed.js',
    '~plugins/event-bus.js',
    '~plugins/root.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa'],

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
  },

  build: {
    extend(config) {
      config.output.globalObject = 'self'

      config.plugins.push(
        new webpack.DefinePlugin({
          ROOT: JSON.stringify(ROOT)
        })
      )
    }
  }
}
