<template>
  <div>
    <div class="box rounded-2xl p-6">
      <el-tabs>
        <el-tab-pane :label="t('page.sidebar.reward')">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl">Danh sách khen thưởng tháng này</h3>
            </div>
            <div>
              <vs-button type="shadow" @click="openCreateRewardForm">Thêm</vs-button>
            </div>
          </div>
          <el-table :data="[]"></el-table>
        </el-tab-pane>
        <el-tab-pane :label="t('page.sidebar.discipline')">
          Danh sach ky luat
        </el-tab-pane>
      </el-tabs>
    </div>
    <vs-dialog v-model="isOpenCreateReward">
      <template #header>
        <h3 class="text-lg">Tao khoan khen thuong cho nhan vien</h3>
      </template>

      <vs-input v-model="rewardCreateForm.name" label="Loai khen thuong" label-float />
      <vs-input v-model="rewardCreateForm.description" label="Mo ta" label-float />
      <vs-input v-model="rewardCreateForm.salary" label="Muc luong" label-float />
      <el-date-picker v-model="rewardCreateForm.name" label="Ngay bat dau" />
    </vs-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isOpenCreateReward = ref(false)

const rewardCreateForm = reactive({
  name: '',
  description: '',
  salary: '',
  start_date: '',
  user_id: ''
})

const openCreateRewardForm = () => {
  isOpenCreateReward.value = true
}
</script>

<style scoped lang="scss">
.box {
  background-color: getColor(bg-color);
}
</style>
