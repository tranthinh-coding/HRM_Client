<template>
  <div v-if="open" class="el-overlay" @click.self="onClose"></div>
  <transition name="fade-up" appear>
    <div v-if="open" class="detail-wrapper" @click.self="onClose">
      <div class="detail-container">
        <div class="detail-divider"><div class="detail-line"></div></div>

        <div class="detail-wrapper-content">
          <vs-scrollbar>
            <slot />
          </vs-scrollbar>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { isBoolean } from '@vueuse/core'

defineProps<{
  open: boolean
}>()

const emit = defineEmits({
  'update:open': (value: boolean) => isBoolean(value),
})

const onClose = () => emit('update:open', false)
</script>

<style scoped lang="scss">
@import 'element-plus/theme-chalk/src/mixins/function.scss';

.detail-wrapper {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 20px;
  // background-color: getCssVar(overlay-color, lighter);

  .detail-container {
    background-color: getCssVar(bg-color);
    height: 90%;
    min-height: 320px;
    margin-top: 10%;
    width: 100%;
    border-radius: 30px 30px 0 0;
    animation: fade-up 0.15s ease forwards;
    box-shadow: getCssVar(shadow);
  }

  .detail-divider {
    height: 26px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .detail-line {
      height: 6px;
      width: 100px;
      max-width: 80%;
      border-radius: 30px;
      background-color: getCssVar(border-color, light);
    }
  }
}

.detail-wrapper-content {
  width: 100%;
  height: 100%;
  padding: 30px;
  padding-bottom: 50px;
  position: relative;
}

@keyframes fade-up {
  0% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
