<template>
  <menu class="menu">
    <slot />
  </menu>
</template>

<script setup lang="ts">
import { provide, reactive, ref } from 'vue'

import { SidebarContext, sidebarContextKey } from './token'

const sidebarActive = ref<number | string>('')

const activeItem = (id: string | number) => (sidebarActive.value = id)

provide<SidebarContext>(
  sidebarContextKey,
  reactive({
    currentActive: sidebarActive,
  })
)

defineExpose({
  activeItem,
})
</script>

<style scoped lang="scss">
.menu {
  padding: 20px;
  padding-bottom: 40px;
  height: 100%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
