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
.auth-layout {
  background-color: getColor(bg-color);
}
</style>
