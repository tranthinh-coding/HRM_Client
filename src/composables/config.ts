import { useToggle } from '@vueuse/core'
import { ref } from 'vue'

export const isSidebarCollapsed = ref(false)

export const toggleSidebar = useToggle(isSidebarCollapsed)
