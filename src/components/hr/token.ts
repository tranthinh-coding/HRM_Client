import { InjectionKey } from 'vue'

export interface SidebarContext {
  currentActive: string | number
}

export const sidebarContextKey: InjectionKey<SidebarContext> = Symbol('sidebar')
