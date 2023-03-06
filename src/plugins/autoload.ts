import type { App, Component } from 'vue'
// @ts-ignore
import * as component from '~/components'

export default {
  install: (app: App) => {
    console.log(component)
    Object.keys(component).forEach((key: string) => {
      // @ts-ignore
      const comp: Component = component[key]
      app.component(comp.name || key, comp)
    })

    console.log({ AUTOLOAD: Object.keys(component) })
  },
}
