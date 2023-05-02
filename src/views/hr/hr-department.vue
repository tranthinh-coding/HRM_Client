<template>
  <div class="department-dashboard">
    <div class="department-heading">
      <vs-button type="shadow" @click="toggleCreateForm">
        {{ t('page.add-department') }}
      </vs-button>
    </div>
    <div class="department-table box">
      <el-table
        max-height="calc(100vh - 68px - 250px)"
        :data="filterTableDepartments"
      >
        <el-table-column
          fixed
          width="250"
          prop="department"
          :label="t('page.department')"
        >
          <template #default="scope">
            <el-tag>
              {{ scope.row.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          min-width="300"
          prop="created_at"
          :label="t('datetime.created_at')"
        >
          <template #default="scope">
            {{ formatTime(new Date(scope.row.created_at).getTime()) }}
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          :label="t('page.action')"
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
            <div class="flex items-center gap-10px justify-center">
              <vs-button
                @click="toggleUpdateForm(scope.row)"
                type="transparent"
                size="small"
                icon
              >
                <el-icon size="20"> <edit /> </el-icon>
              </vs-button>
              <vs-button
                @click="removeDepartment(scope.row)"
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
    </div>

    <department-create
      v-model="showCreateDepartmentForm"
      v-model:department="departmentForm.name"
      :error="departmentFormError.name"
      @create="addNewDepartment"
    />

    <department-update
      v-model="showUpdateDepartmentForm"
      v-model:department="departmentUpdateForm.name"
      :error="departmentFormError.name"
      @update="updateDepartment"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { notification } from 'vuesax-old'

import { formatTime } from '~/utils'
import { useDepartmentStore } from '~/store'
import departmentServices from '~/services/department-services'
import DepartmentCreate from '~/components/hr/department-create.vue'
import DepartmentUpdate from '~/components/hr/department-update.vue'

import type { Department } from '~/types/department'

type DepartmentForm = Pick<Department, 'name'>

const { t } = useI18n()

const departmentStore = useDepartmentStore()
const { departments } = storeToRefs(departmentStore)

const search = ref<string>('')

const showCreateDepartmentForm = ref(false)
const showUpdateDepartmentForm = ref(false)
const isFetching = ref(false)

const departmentForm = reactive<DepartmentForm>({
  name: '',
})
const departmentUpdateForm = reactive<Pick<Department, 'id' | 'name'>>({
  id: -1,
  name: '',
})

const departmentFormError = reactive<DepartmentForm>({
  name: '',
})

const filterTableDepartments = computed(
  () =>
    departments.value?.filter(
      (department) =>
        !search.value ||
        department.name.toLowerCase().includes(search.value.toLowerCase())
    ) || []
)

const toggleCreateForm = () => {
  showCreateDepartmentForm.value = true
  departmentFormError.name = ''
}
const toggleUpdateForm = (department: Department) => {
  showUpdateDepartmentForm.value = true
  departmentFormError.name = ''
  Object.assign(departmentUpdateForm, department)
}

const addNewDepartment = async () => {
  isFetching.value = true
  try {
    if (departmentForm.name === '') {
      throw new Error(t('validate.required'))
    }
    const response = await departmentServices.create(departmentForm)

    notification({
      text: response.message,
      border: 'success',
      duration: 5000,
      position: 'top-center',
      progress: true,
    })

    departmentForm.name = ''
    departmentFormError.name = ''

    departmentStore.refetch()
  } catch (e) {
    const message: string = (e as any).message
    departmentFormError.name = message

    notification({
      text: message,
      border: 'danger',
      duration: 5000,
      position: 'top-center',
      progress: true,
    })
  }
  isFetching.value = false
}

const updateDepartment = async () => {
  isFetching.value = true
  try {
    if (departmentUpdateForm.name === '') {
      throw new Error(t('validate.required'))
    }
    const response = await departmentServices.update(departmentUpdateForm)

    notification({
      text: response.message,
      border: 'success',
      duration: 5000,
      position: 'top-center',
      progress: true,
    })
    departmentFormError.name = ''

    departmentStore.refetch()
  } catch (e) {
    const message: string = (e as any).message
    departmentFormError.name = message
    notification({
      text: message,
      border: 'danger',
      duration: 5000,
      position: 'top-center',
      progress: true,
    })
  }
  isFetching.value = false
}

const removeDepartment = async (department: Department) => {
  isFetching.value = true
  try {
    const response = await departmentServices.remove(department)
    notification({
      text: response.message,
      border: 'success',
      duration: 5000,
      position: 'top-center',
      progress: true,
    })
    departmentStore.refetch()
  } catch (e: unknown) {
    notification({
      text: 'Delete department failure',
      border: 'danger',
      duration: 5000,
      position: 'top-center',
      progress: true,
    })
  }
  isFetching.value = false
}
</script>

<style scoped lang="scss">
.department-dashboard {
  padding: 20px 10px;
  height: 100%;
}
.department-heading {
  margin-bottom: 10px;
}
</style>
