<template>
  <div class="dashboard-container">
    <app-sidebar />

    <div class="dashboard-wrapper" :class="{ 'is-tablet': isSidebarCollapsed }">
      <app-header />

      <el-scrollbar class="main">
        <div class="main-container">
          <!-- Applicant Dashboard -->
          <template v-if="isGuest(user?.role)">
            <component :is="ApplicantDashboard" />
          </template>

          <!-- Employee Dashboard -->
          <template v-else-if="isEmployee(user?.role)">
            <component :is="EmployeeDashboard" />
          </template>

          <!-- HR Dashboard -->
          <template v-else-if="isHR(user?.role)">
            <component :is="HrDashboard" />
          </template>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { isEmployee, isGuest, isHR } from '~/config'
import { isSidebarCollapsed } from '~/composables'
import { useUserStore } from '~/store'

import AppSidebar from '~/layouts/components/app-sidebar.vue'
import AppHeader from '~/layouts/components/app-config.vue'
import ApplicantDashboard from '~/views/applicant-dashboard.vue'
import EmployeeDashboard from '~/views/employee-dashboard.vue'
import HrDashboard from '~/views/hr-dashboard.vue'

const { user } = storeToRefs(useUserStore())
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: 100vh;
  width: 100%;
  display: flex;
  background: getColor(theme-layout);
}
.dashboard-wrapper {
  height: 100%;
  width: calc(100% - 300px);
  transition: all 0.25s ease;
}

@media screen and (max-width: 1100px) {
  .dashboard-wrapper.is-tablet {
    transition: all 0.25s ease;
    width: 100%;
  }
}

.header {
  height: 68px;
  flex-shrink: 0;
}

.main {
  height: 100%;
  border-top-left-radius: 30px;
  background-color: getColor(theme-bg);
}

.main-container {
  padding: 30px;
  padding-bottom: 100px;
}
</style>
