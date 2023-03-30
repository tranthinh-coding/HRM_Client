<script setup lang="ts">
import { watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useOnline } from '@vueuse/core'
import { ElNotification, NotificationHandle } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()

const { t } = useI18n()
const online = useOnline()

const onl = ref<NotificationHandle>()
const off = ref<NotificationHandle>()

watch(online, () => {
  if (online.value) {
    off.value?.close()
    onl.value = ElNotification({
      message: t('network.reconnected'),
      type: 'success',
      duration: 5 * 100,
      showClose: true,
      position: 'bottom-left',
    })
  } else {
    onl.value?.close()
    off.value = ElNotification({
      message: t('network.offline'),
      type: 'warning',
      duration: 0,
      showClose: true,
      position: 'bottom-left',
    })
  }
})
</script>

<template>
  <el-config-provider :z-index="7000">
    <transition name="slide-left" appear>
      <keep-alive>
        <component class="layout-loader" :is="route.meta.layout" />
      </keep-alive> </transition
  ></el-config-provider>
</template>

<style>
.component-loader {
  position: absolute;
}
.layout-loader {
  position: fixed;
}
.component-loader,
.layout-loader {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.component-loader-wrapper {
  position: relative;
  /* overflow: hidden; */
  height: 100%;
}
</style>
