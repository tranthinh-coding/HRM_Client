<template>
  <div class="flex items-center justify-start my-3">
    <div>
      <vs-button type="border" @click="openCreateDisciplineForm">
        Thêm
      </vs-button>
    </div>
  </div>
  <el-table :data="filterTableDisciplines">
    <el-table-column fixed="left" min-width="30" label="#" prop="id" />
    <el-table-column min-width="120" label="Nhan vien">
      <template #default="{ row }: { row: EmployeeDiscipline }">
        <vs-tooltip>
          <vs-avatar>
            {{ row.user.name }}
          </vs-avatar>

          <template #content>
            <div class="flex flex-col items-start gap-1">
              <div class="flex gap-2 items-center">
                <el-icon size="18"><building-outline /></el-icon>
                {{ row.user.employee_information.department.name }}
              </div>
              <div class="flex gap-2 items-center">
                <el-icon size="18">
                  <email />
                </el-icon>
                {{ row.user.email }}
              </div>
              <div class="flex gap-2 items-center">
                <el-icon size="18">
                  <people />
                </el-icon>
                {{ row.user_id }}
              </div>
              <div class="flex gap-2 items-center">
                <el-icon size="18"><user-octagon-outline /></el-icon>
                {{ row.user.employee_information.position.name }}
              </div>
            </div>
          </template>
        </vs-tooltip>
      </template>
    </el-table-column>
    <el-table-column min-width="150" label="Loai ky luat" prop="name" />
    <el-table-column min-width="150" label="Ly do" prop="description" />
    <el-table-column min-width="150" label="Muc khau tru luong" prop="salary" />
    <el-table-column min-width="120" label="Ngay tao" prop="created_at">
      <template #default="{ row }: { row: EmployeeDiscipline }">
        {{ dayjs(row.created_at).format('YYYY-MM-DD') }}
      </template>
    </el-table-column>
    <el-table-column min-width="120" label="Ngay ap dung" prop="start_date" />

    <el-table-column
      width="200"
      :label="t('page.action')"
      align="center"
      header-align="center"
      class-name="table-operations"
    >
      <template #header>
        <vs-input v-model="search" :placeholder="t('page.search')">
          <template #icon>
            <el-icon><search-normal /></el-icon>
          </template>
        </vs-input>
      </template>

      <template #default="scope">
        <div class="w-full flex items-center justify-center">
          <vs-button
            @click="removeDiscipline(scope.row)"
            type="transparent"
            size="small"
            icon
            color="danger"
          >
            <el-icon size="20"> <trash /> </el-icon>
          </vs-button>
        </div>
      </template>
    </el-table-column>
  </el-table>

  <vs-dialog v-model="isOpenCreateDiscipline">
    <template #header>
      <h3 class="text-lg mt-4px">Ky luat nhan vien</h3>
    </template>

    <div class="form-group">
      <div class="form-original">
        <vs-select v-model="selectedUser" label="Nhan vien" label-float>
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
          :model-value="selectedUser?.employee_id"
          label="Employee ID"
          label-float
          disabled
        />
      </div>
      <div class="form-original">
        <vs-input
          v-model="rewardCreateForm.name"
          label="Loai ky luat"
          label-float
        />
      </div>
    </div>

    <div class="form-group">
      <div class="form-original">
        <vs-input
          v-model="rewardCreateForm.description"
          label="Ly do chi tiet"
          label-float
        />
      </div>
      <div class="form-original">
        <vs-input
          v-model="rewardCreateForm.salary"
          label="Muc khau tru luong"
          label-float
        />
      </div>
    </div>

    <div class="mt3">
      <h4 class="relative -top-1 left-12px text-xs">Ngay ap dung</h4>
      <el-date-picker
        type="date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        v-model="rewardCreateForm.start_date"
      />
    </div>

    <template #footer>
      <div class="flex items-center w-full justify-end gap-2 mt-1">
        <vs-button type="flat" @click="createDiscipline" class="px2">
          Lưu
        </vs-button>
        <vs-button
          type="flat"
          color="danger"
          @click="closeCreateDiscipline"
          class="px2"
        >
          Hủy
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

import { useDisciplineStore, useEmployeesStore } from '~/store'
import { storeToRefs } from 'pinia'
import { EmployeeDiscipline } from '~/types'
import employeeServices from '~/services/employee-services'
import { getResponseError } from '~/composables'
import { notification } from 'vuesax-old'

const { t } = useI18n()

const disciplineStore = useDisciplineStore()
const { disciplines } = storeToRefs(disciplineStore)

const search = ref('')

const employeeStore = useEmployeesStore()
const { employees } = storeToRefs(employeeStore)

const selectedUser = ref<{
  employee_id: string
  email: string
  name: string
}>()

const isOpenCreateDiscipline = ref(false)

const rewardCreateForm = reactive<
  Omit<EmployeeDiscipline, 'user' | 'created_at' | 'id'>
>({
  name: '',
  description: '',
  salary: 1,
  start_date: dayjs().format('YYYY-MM-DD'),
  user_id: '',
})

const resetDisciplineForm = () => {
  Object.assign(rewardCreateForm, {
    name: '',
    description: '',
    salary: 1,
    start_date: dayjs().format('YYYY-MM-DD'),
    user_id: '',
  })
}

const openCreateDisciplineForm = () => {
  isOpenCreateDiscipline.value = true
}

const filterTableDisciplines = computed(
  () =>
    disciplines.value?.filter(
      (reward) =>
        !search.value ||
        reward.name.toLowerCase().includes(search.value.toLowerCase())
    ) || []
)

const removeDiscipline = async (row: EmployeeDiscipline) => {
  try {
    const response = await employeeServices.removeEmployeeDiscipline(row.id)

    notification({
      text: response.message || 'Deleted reward successfully',
      border: 'success',
      duration: 4000,
      position: 'top-center',
    })
    disciplineStore.refetch()
    resetDisciplineForm()
  } catch (e) {
    const __error = getResponseError(e)
    notification({
      text: __error.message,
      title: 'Create Discipline',
      position: 'top-center',
      duration: 4000,
      border: 'danger',
    })
  }
}
const createDiscipline = async () => {
  try {
    if (!selectedUser.value) {
      throw new Error('Please select an employee')
    }

    const requestForm = {
      ...rewardCreateForm,
      user_id: selectedUser.value.employee_id!,
    }

    await employeeServices.createDiscipline(requestForm)

    notification({
      text: 'Created Successfully',
      title: 'Create Discipline',
      position: 'top-center',
      duration: 4000,
      border: 'success',
    })

    disciplineStore.refetch()

    selectedUser.value = undefined
    resetDisciplineForm()
  } catch (error) {
    const __error = getResponseError(error)
    notification({
      text: __error.message,
      title: 'Create Discipline',
      position: 'top-center',
      duration: 4000,
      border: 'danger',
    })
  }
}

const closeCreateDiscipline = () => {
  isOpenCreateDiscipline.value = false
}
</script>
