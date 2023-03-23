/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />
/// <reference types="unplugin-vue-macros/macros-global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_SERVER: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_API: string
  readonly VITE_APP_API_V1: string
  readonly VITE_APP_API_V2: string
  readonly VITE_APP_API_GRAPHQL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
