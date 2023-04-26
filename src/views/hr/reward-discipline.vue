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

      <div class="flex flex-col gap-6px">
        <vs-input
          v-model="rewardCreateForm.name"
          label="Loai khen thuong"
          label-float
        />
        <vs-input
          v-model="rewardCreateForm.description"
          label="Loi nhan"
          label-float
        />
        <vs-input
          v-model="rewardCreateForm.salary"
          label="Muc thuong"
          label-float
        />

        <div class="mt3">
          <h4 class="relative -top-1 left-12px text-xs">Ngay ap dung</h4>
          <el-date-picker
            type="date"
            v-model="rewardCreateForm.start_date"
            :default-value="new Date()"
          />
        </div>
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
import { reactive, ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

import { useUserStore } from '~/store'

const { t } = useI18n()

const userStore = useUserStore()

const { result } = useQuery<{
  rewards: {
    id: number
    name: string
    description: string
    salary: number
    start_date: string
    user_id: string
    created_at: string
  }[]
}>(
  gql`
    query REWARDS($user_id: String!) {
      rewards(user_id: $user_id) {
        id
        name
        description
        salary
        start_date
        user_id
        created_at

        user {
          user_id
          name
        }
      }
    }
  `,
  () => ({ user_id: userStore.user?.user_id })
)

const rewards = computed(() => result.value?.rewards || [])

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
