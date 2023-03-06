import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Vuesax from 'vuesax-alpha'
import 'vuesax-alpha/theme-chalk/index.css'

import i18n from '~/plugins/i18n'
/**
 * Service Worker https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
 */
import './registerServiceWorker.ts'

/** Boxicons */
import '~/assets/boxicons-2.1.2/css/boxicons.min.css'

import '~/styles/index.scss'

// nprogress style
import 'nprogress/nprogress.css'

const app = createApp(App)

/**
 * Register Element Plus Icon
 */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())

app.use(router)
app.use(i18n)
app.use(Vuesax)

app.mount('#app')
