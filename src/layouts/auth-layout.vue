<template>
  <div class="auth-layout">
    <div class="component-loader-wrapper">
      <router-view v-slot="{ Component, route }">
        <transition name="slide-left" appear>
          <keep-alive>
            <component
              class="component-loader"
              :key="route.name"
              :is="Component || 'div'"
            ></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'element-plus/theme-chalk/src/mixins/function.scss';

.auth-layout {
  background-color: getCssVar(bg-color);
}
</style>
