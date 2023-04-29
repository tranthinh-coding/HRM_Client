<template>
  <div>
    <div class="box rounded-2xl p-6">
      <el-tabs model-value="reward">
        <el-tab-pane :label="t('page.sidebar.reward')" name="reward">
          <reward-table />
        </el-tab-pane>

        <el-tab-pane :label="t('page.sidebar.discipline')" name="discipline">
          <discipline-table />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import RewardTable from '~/components/hr/reward-discipline/reward-table.vue'
import DisciplineTable from '~/components/hr/reward-discipline/discipline-table.vue'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.box {
  background-color: getColor(bg-color);
}
</style>

<style lang="scss">
.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;

  &.is-ep {
    margin-top: 20px;
  }

  .form-original {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 10px;

    .form-label {
      font-size: 14px;
      margin-left: 12px;
    }
  }
}
</style>
