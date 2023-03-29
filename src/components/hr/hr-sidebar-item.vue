<template>
  <div @click="clickItem" :class="{ active: isActive }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { sidebarContextKey } from '../token'

import { useRoute, useRouter } from 'vue-router'

type RouteNameRaw = {
  name: string
}

const route = useRoute()
const router = useRouter()

const sidebar = inject(sidebarContextKey)

const props = defineProps<{
  id: string | number
  to: RouteNameRaw
}>()

const emit = defineEmits({
  active: (id: string | number) => id,
})

const clickItem = async () => {
  const navigate = await router.push(props.to)
  console.log(navigate?.message)
  if (!navigate) emit('active', props.id)
}

const isActive = computed(() => {
  return sidebar?.currentActive === props.id || route.name === props.to.name
})
</script>
