<template>
  <div class="dashboard-container">
    <el-statistic :value="3">
      <template #title>
        <div style="display: inline-flex; align-items: center">
          {{ t('hr.employees') }}

          <el-tooltip
            effect="light"
            content="Number of employees"
            placement="top"
          >
            <el-icon style="margin-left: 4px" :size="12">
              <Warning />
            </el-icon>
          </el-tooltip>
        </div>
      </template>
    </el-statistic>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
