<template>
  <v-sidebar ref="sidebarInstance">
    <sidebar-item
      @active="sidebarInstance?.activeItem"
      id="1"
      :to="{ name: 'employee/dashboard' }"
    >
      <el-icon size="26"> <command-square /> </el-icon>
      {{ t('page.sidebar.dashboard') }}
    </sidebar-item>
    <sidebar-item
      @active="sidebarInstance?.activeItem"
      id="2"
      :to="{ name: 'employee/salary' }"
    >
      <el-icon size="26"> <empty-wallet /> </el-icon>
      {{ t('page.sidebar.salary') }}
    </sidebar-item>
    <sidebar-item
      @active="sidebarInstance?.activeItem"
      id="3"
      :to="{ name: 'employee/timeoff' }"
    >
      <el-icon size="26"> <timer-pause /> </el-icon>
      {{ t('page.sidebar.timekeeping') }}
    </sidebar-item>
    <sidebar-item
      @active="sidebarInstance?.activeItem"
      id="4"
      :to="{ name: 'employee/reward-discipline' }"
    >
      <el-icon size="26"> <medal-star /> </el-icon>
      {{ t('page.sidebar.reward') }} - {{ t('page.sidebar.discipline') }}
    </sidebar-item>
  </v-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import VSidebar from '../v-sidebar.vue'
import SidebarItem from '../sidebar-item.vue'

const { t } = useI18n()

const sidebarInstance = ref<InstanceType<typeof VSidebar>>()
</script>
