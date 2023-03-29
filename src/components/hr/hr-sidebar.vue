<template>
  <menu class="menu">
    <sidebar-item
      class="menu-item"
      id="1"
      :to="{ name: 'hr/dashboard' }"
      @active="activeItem"
    >
      <el-icon size="26"> <command-square /> </el-icon>
      {{ t('page.sidebar.dashboard') }}
    </sidebar-item>
    <sidebar-item
      class="menu-item"
      id="2"
      :to="{ name: 'hr/recruitment' }"
      @active="activeItem"
    >
      <el-icon size="26"> <profile-add /> </el-icon>
      {{ t('page.sidebar.recruitment') }}
    </sidebar-item>
    <sidebar-item
      class="menu-item"
      id="3"
      :to="{ name: 'hr/department' }"
      @active="activeItem"
    >
      <el-icon size="26"> <home-five /> </el-icon>
      {{ t('page.sidebar.department') }}
    </sidebar-item>
    <sidebar-item
      class="menu-item"
      id="4"
      :to="{ name: 'hr/employee' }"
      @active="activeItem"
    >
      <el-icon size="26"> <user-profile /> </el-icon>
      {{ t('page.sidebar.employee') }}
    </sidebar-item>
    <sidebar-item
      class="menu-item"
      id="5"
      :to="{ name: 'hr/report' }"
      @active="activeItem"
    >
      <el-icon size="26"> <status-up /> </el-icon>
      {{ t('page.sidebar.report') }}
    </sidebar-item>
    <sidebar-item
      class="menu-item"
      id="6"
      :to="{ name: 'hr/project' }"
      @active="activeItem"
    >
      <el-icon size="26"> <diamond /> </el-icon>
      {{ t('page.sidebar.project') }}
    </sidebar-item>
    <sidebar-item
      class="menu-item"
      id="7"
      :to="{ name: 'hr/employee-salary' }"
      @active="activeItem"
    >
      <el-icon size="26"> <empty-wallet /> </el-icon>
      {{ t('page.sidebar.payroll') }}
    </sidebar-item>
    <sidebar-item
      class="menu-item"
      id="8"
      :to="{ name: 'hr/timekeeping' }"
      @active="activeItem"
    >
      <el-icon size="26"> <calender /> </el-icon>
      {{ t('page.sidebar.timekeeping') }}
    </sidebar-item>
  </menu>
</template>

<script setup lang="ts">
import { provide, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import SidebarItem from './hr-sidebar-item.vue'
import { SidebarContext, sidebarContextKey } from '../token'

const { t } = useI18n()

const sidebarActive = ref<number | string>('')

const activeItem = (id: string | number) => (sidebarActive.value = id)

provide<SidebarContext>(
  sidebarContextKey,
  reactive({
    currentActive: sidebarActive,
  })
)
</script>

<style scoped lang="scss">
@use 'element-plus/theme-chalk/src/mixins/function.scss';

.menu {
  padding: 20px;
  padding-bottom: 40px;
  height: 100%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

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
