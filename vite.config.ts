import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import type { VitePWAOptions } from 'vite-plugin-pwa'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico'],
  manifest: {
    name: 'HR Manager',
    short_name: 'HR',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'img/icons/android-chrome-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/img/icons/android-chrome-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'img/icons/android-chrome-512x512.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    clientsClaim: true,
    skipWaiting: true,
  },
  devOptions: {
    enabled: true, // process.env.SW_DEV === 'true'
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './dist/hrm',
  },
  plugins: [
    VueMacros({
      setupBlock: true,
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.setup\.[cm]?[jt]sx?$/],
        }),
        vueJsx: VueJsx(),
      },
    }),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,

      // you need to set i18n resource including paths !
      include: path.resolve(__dirname, './src/lang/**'),
    }),
    VitePWA(pwaOptions),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'vuesax-alpha/theme-chalk/src/mixins/function.scss' as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
})
