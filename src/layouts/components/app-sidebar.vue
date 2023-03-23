<template>
  <div class="app-sidebar sidebar-hide">
    <el-scrollbar>
      <applicant-sidebar v-if="isGuest(user.role)" />

      <hr-sidebar v-else-if="isHR(user.role)" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import ApplicantSidebar from '~/components/applicant/applicant-sidebar.vue'
import HrSidebar from '~/components/hr/hr-sidebar.vue'
import { useUser } from '~/store'
import { isGuest, isHR } from '~/config'

const user = useUser()
</script>

<style scoped lang="scss">
.app-sidebar {
  position: relative;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  border-radius: 0 30px 30px 0;
  display: inline-block;
  transition: all 0.25s ease;
}

@media screen and (max-width: 1100px) {
  .sidebar-hide {
    // position: fixed;
    // top: 0;
    // left: 0;
    // z-index: 999;
    background-color: getColor(bg-color);
    // transform: translateX(-100%);
    // margin-left: -100%;
    width: 0;
  }
}
</style>
