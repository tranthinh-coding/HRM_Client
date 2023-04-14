<template>
  <div class="app-sidebar" :class="{ 'sidebar-hide': isSidebarCollapsed }">
    <el-scrollbar>
      <applicant-sidebar v-if="isGuest(user?.role)" />

      <hr-sidebar v-else-if="isHR(user?.role)" />

      <employee-sidebar v-else-if="isEmployee(user?.role)" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBreakpoints } from '@vueuse/core'
import { useUserStore } from '~/store'
import { isEmployee, isGuest, isHR } from '~/config'
import { isSidebarCollapsed, toggleSidebar } from '~/composables'

import ApplicantSidebar from '~/components/applicant/applicant-sidebar.vue'
import HrSidebar from '~/components/hr/hr-sidebar.vue'
import EmployeeSidebar from '~/components/employee/employee-sidebar.vue'

const { user } = storeToRefs(useUserStore())

const { isSmaller } = useBreakpoints({
  lg: '1100px',
})

watch(
  () => isSmaller('lg'),
  () => {
    toggleSidebar(false)
  }
)
</script>

<style scoped lang="scss">
.app-sidebar {
  width: 300px;
  border-radius: 0 30px 30px 0;
  // display: inline-block;
  transition: all 0.25s ease;
  flex-shrink: 0;
}

@media screen and (max-width: 1100px) {
  .sidebar-hide {
    background-color: getColor(bg-color);
    // width: 0;
    // margin-left: -300px;
    width: 0;
  }
  .sidebar-container {
    flex-direction: column-reverse;
  }
}
</style>
