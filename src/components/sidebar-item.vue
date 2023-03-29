<template>
  <div @click="clickItem" :class="['menu-item', { active: isActive }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isString, isNumber } from 'lodash-unified'
import { sidebarContextKey } from './token'

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
  active: (id: string | number) => isNumber(id) || isString(id),
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

<style scoped lang="scss">
.menu-item {
  padding: 14px 20px;
  border-radius: 17px;
  user-select: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.25s ease;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    border-radius: 17px;
    height: 100%;
    top: 0;
    left: 0;
    transform: scale(0.95);
    opacity: 0.045;
    transition: all 0.25s ease;
  }
  &.active,
  &:hover {
    &::after {
      animation: sidebar-item-animate 0.25s ease forwards;
      // transform: scale(1);
      background-color: var(--el-color-primary);
    }
    color: var(--el-color-primary);
  }
}

@keyframes sidebar-item-animate {
  0% {
    transform: scale(0.85);
  }
  90% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.989);
  }
}
</style>
