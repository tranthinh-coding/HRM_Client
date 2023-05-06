<template>
  <div class="config flex">
    <div v-if="isSmaller('lg')">
      <vs-button type="shadow" icon @click="toggleSidebar(!isSidebarCollapsed)">
        <el-icon sise="24">
          <icon-menu />
        </el-icon>
      </vs-button>
    </div>
    <div class="btn-group-right">
      <el-tooltip effect="light" :enterable="false" :auto-close="2000">
        <el-switch
          v-model="isDark"
          class="ml-2"
          inline-prompt
          style="--el-switch-on-color: #242526"
          :active-icon="Moon"
          :inactive-icon="Sunny"
        />
        <template #content>
          <span style="user-select: none">Theme</span>
        </template>
      </el-tooltip>
      <el-tooltip effect="light" :enterable="false" :auto-close="2000">
        <a :href="REPO_LINK" target="_blank" style="display: flex">
          <el-icon size="26">
            <icon-code />
          </el-icon>
        </a>

        <template #content>
          <span style="user-select: none">Repository</span>
        </template>
      </el-tooltip>
      <el-tooltip effect="light">
        <el-icon size="26"> <icon-language /> </el-icon>
        <template #content>
          <div
            v-for="(language, index) in SUPPORT_LANGUAGES"
            :key="index"
            class="tooltip-option"
            @click="loadLanguageAsync(language.id)"
          >
            {{ language.label }}
          </div>
        </template>
      </el-tooltip>

      <el-tooltip effect="light">
        <div class="user-info">
          <img class="user-avatar" src="/avatar.png" />
          <span class="user-name">{{ user?.name }}</span>
        </div>

        <template #content>
          <!-- <div
            class="tooltip-option"
            @click="$router.push({ name: 'profile' })"
          >
            {{ t('user.see-info') }}
          </div> -->
          <div class="tooltip-option" @click="logout">
            {{ t('auth.logout') }}
          </div>
        </template>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBreakpoints } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useApolloClient } from '@vue/apollo-composable'
import {
  useUsersStore,
  useApplicantsStore,
  useDepartmentStore,
  useEmployeeTimeoffStore,
  useEmployeeTimekeepingStore,
  useRewardStore,
  usePositionStore,
  useJobsStore,
  useHourlyWageCoefficientsStore,
  useEmployeesStore,
} from '~/store'

import { isDark, toggleSidebar, isSidebarCollapsed } from '~/composables'
import { REPO_LINK } from '~/config'
import { loadLanguageAsync, SUPPORT_LANGUAGES } from '~/plugins/i18n'
import { useUserStore } from '~/store'
import IconCode from '~/components/icons/code.vue'
import IconLanguage from '~/components/icons/language.vue'

const { client } = useApolloClient()

const applicantStore = useApplicantsStore()
const departmentsStore = useDepartmentStore()
const employeeStore = useEmployeesStore()
const hourlyWageCoefficientStore = useHourlyWageCoefficientsStore()
const jobStore = useJobsStore()
const positionStore = usePositionStore()
const rewardStore = useRewardStore()
const timekeepingStore = useEmployeeTimekeepingStore()
const timeoffStore = useEmployeeTimeoffStore()
const usersStore = useUsersStore()

const router = useRouter()
const { t } = useI18n()

const { user } = storeToRefs(useUserStore())

const { isSmaller } = useBreakpoints({
  lg: '1100px',
})

// need to clear graphql store before logout
const logout = () => {
  client.clearStore()
  applicantStore.stop()
  departmentsStore.stop()
  employeeStore.stop()
  hourlyWageCoefficientStore.stop()
  jobStore.stop()
  positionStore.stop()
  rewardStore.stop()
  timekeepingStore.stop()
  timeoffStore.stop()
  usersStore.stop()

  return router.push({ name: 'logout' })
}
</script>

<style scoped lang="scss">
.config {
  padding: 10px;
  /* background-color: #ccc; */
}

.btn-group-right {
  height: 100%;
  display: flex;
  gap: 15px;
  margin-left: auto;
  width: max-content;
  align-items: center;
  padding-right: 20px;
}

.tooltip-option {
  padding: 6px 16px;
  user-select: none;
  cursor: pointer;
  border-radius: 9px;
  transition: all 0.25s ease;
}

.tooltip-option + .tooltip-option {
  margin-top: 4px;
}

.tooltip-option:hover {
  background-color: getColor(bg-color, page);
}

.user-info {
  display: flex;
  align-items: center;
  margin-left: 10px;
  gap: 10px;

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    border: none;
  }
}
</style>
