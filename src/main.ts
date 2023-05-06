import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// old version full style
// import 'vuesax-old/dist/vuesax.css'
import Vuesax from 'vuesax-alpha'
import 'vuesax-alpha/theme-chalk/index.css'
import 'vuesax-alpha/theme-chalk/dark/css-vars.css'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import i18n from '~/plugins/i18n'
/**
 * Service Worker https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
 */
// import './registerServiceWorker.ts'

/** Boxicons */
// import '~/assets/boxicons-2.1.2/css/boxicons.min.css'

import '~/styles/index.scss'

// nprogress style
import 'nprogress/nprogress.css'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_APP_API_GRAPHQL,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

/**
 * Register Element Plus Icon
 */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  zIndex: 9000,
})

app.use(createPinia())

app.use(router)
app.use(i18n)
app.use(Vuesax)

app.mount('#app')
