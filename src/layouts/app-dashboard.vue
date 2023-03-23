<template>
  <div class="dashboard-container">
    <app-sidebar />

    <div class="dashboard-wrapper">
      <app-header />

      <el-scrollbar class="main">
        <div class="main-container">
          <!-- Applicant Dashboard -->
          <template v-if="isGuest(user.role)">
            <component :is="ApplicantDashboard" />
          </template>

          <!-- Employee Dashboard -->
          <template v-else-if="isEmployee(user.role)">
            <component :is="EmployeeDashboard" />
          </template>

          <!-- HR Dashboard -->
          <template v-else-if="isHR(user.role)">
            <component :is="HrDashboard" />
          </template>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '~/store'
import AppSidebar from '~/layouts/components/app-sidebar.vue'
import AppHeader from '~/layouts/components/app-header.vue'
import ApplicantDashboard from '~/views/applicant-dashboard.vue'
import EmployeeDashboard from '~/views/employee-dashboard.vue'
import HrDashboard from '~/views/hr-dashboard.vue'
import { isEmployee, isGuest, isHR } from '~/config'

const user = useUser()
</script>

<style lang="scss" scoped>
@import 'element-plus/theme-chalk/src/mixins/function.scss';

.dashboard-container {
  height: 100vh;
  width: 100%;
}
.dashboard-wrapper {
  height: 100%;
}

.header {
  height: 68px;
  flex-shrink: 0;
}

.main {
  height: 100%;
  border-top-left-radius: 30px;
  background-color: getCssVar(bg-color, page);
}

.main-container {
  padding: 30px;
}
</style>
