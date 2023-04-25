<template>
  <div class="box rounded-2xl p-6">
    <el-tabs>
      <el-tab-pane :label="t('page.sidebar.reward')">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl">Danh sách khen thưởng tháng này</h3>
          </div>
          <div>
            <vs-button type="shadow">Thêm</vs-button>
          </div>
        </div>
        <el-table :data="[]"></el-table>
      </el-tab-pane>

      <el-tab-pane :label="t('page.sidebar.discipline')">
        Danh sach ky luat
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.box {
  background-color: getColor(bg-color);
}
</style>
