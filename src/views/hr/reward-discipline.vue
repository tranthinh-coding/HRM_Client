<template>
  <div>
    <div class="box rounded-2xl p-6">
      <el-tabs model-value="reward">
        <el-tab-pane :label="t('page.sidebar.reward')" name="reward">
          <div class="flex items-center justify-between">
            <h3>Danh sách khen thưởng tháng này</h3>
            <div>
              <vs-button type="shadow" @click="openCreateRewardForm">
                Thêm
              </vs-button>
            </div>
          </div>
          <el-table :data="rewards">
            <el-table-column label="#" prop="id" />
            <el-table-column label="Ten khen thuong" prop="name" />
            <el-table-column label="Loi nhan" prop="description" />
            <el-table-column label="Muc khen thuong" prop="salary" />
            <el-table-column label="Ngay tao" prop="created_at" />
            <el-table-column label="Nhan vien" prop="user.name" />
          </el-table>
        </el-tab-pane>

        <el-tab-pane :label="t('page.sidebar.discipline')" name="discipline">
          Danh sach ky luat
          <el-table :data="[]"></el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <vs-dialog v-model="isOpenCreateReward">
      <template #header>
        <h3 class="text-lg mt-4px">Tao khoan khen thuong cho nhan vien</h3>
      </template>

      <div class="form-group">
        <div class="form-original">
          <vs-select v-model="selectedUser" label="Full Name" label-float>
            <vs-option
              v-for="(user, index) in employees"
              :key="index"
              :value="user"
              :label="user.name"
            />
          </vs-select>
        </div>

        <div class="form-original">
          <vs-input
            :model-value="selectedUser?.email"
            label="Email"
            label-float
            disabled
          />
        </div>
      </div>

      <div class="form-group">
        <div class="form-original">
          <vs-input
            :model-value="selectedUser?.email"
            label="Name"
            label-float
            disabled
          />
        </div>
        <div class="form-original">
          <vs-input
            v-model="rewardCreateForm.name"
            label="Loai khen thuong"
            label-float
          />
        </div>
      </div>

      <div class="form-group">
        <div class="form-original">
          <vs-input
            v-model="rewardCreateForm.description"
            label="Loi nhan"
            label-float
          />
        </div>
        <div class="form-original">
          <vs-input
            v-model="rewardCreateForm.salary"
            label="Muc thuong"
            label-float
          />
        </div>
      </div>

      <div class="mt3">
        <h4 class="relative -top-1 left-12px text-xs">Ngay ap dung</h4>
        <el-date-picker
          type="date"
          v-model="rewardCreateForm.start_date"
          :default-value="new Date()"
        />
      </div>

      <template #footer>
        <div class="flex items-center w-full justify-end gap-2 mt-1">
          <vs-button type="flat" @click="createReward"> Lưu </vs-button>
          <vs-button type="flat" color="danger" @click="closeCreateReward">
            Hủy
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

import { useRewardStore, useEmployeesStore } from '~/store'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const rewardStore = useRewardStore()
const { rewards } = storeToRefs(rewardStore)

const employeeStore = useEmployeesStore()
const { employees } = storeToRefs(employeeStore)

const selectedUser = ref<{
  user_id: string
  email: string
  user_name: string
}>()

const isOpenCreateReward = ref(false)

const rewardCreateForm = reactive({
  name: '',
  description: '',
  salary: '',
  start_date: dayjs().format('YYYY-MM-DD'),
  user_id: '',
})

const openCreateRewardForm = () => {
  isOpenCreateReward.value = true
}

const createReward = () => {}

const closeCreateReward = () => {
  isOpenCreateReward.value = false
}
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
