<template>
  <div class="department-dashboard">
    <div class="department-heading">
      <vs-button type="shadow" @click="toggleCreateForm">
        {{ t('page.add-department') }}
      </vs-button>
    </div>
    <div class="department-table">
      <el-table
        max-height="calc(100vh - 68px - 250px)"
        :data="filterTableDepartments"
        header-row-class-name="table-header"
        row-class-name="table-row"
        lazy
      >
        <el-table-column
          fixed
          width="250"
          prop="department"
          :label="t('page.department')"
        >
          <template #default="scope">
            <el-tag>
              {{ scope.row.department }}
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
          </template>
        </el-table-column>
      </el-table>
    </div>

    <department-create
      v-model="showCreateDepartmentForm"
      v-model:department="departmentForm.department"
      :error="departmentFormError.department"
      @create="addNewDepartment"
    />

    <department-update
      v-model="showUpdateDepartmentForm"
      v-model:department="departmentUpdateForm.department"
      :error="departmentFormError.department"
      @update="updateDepartment"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

import departmentServices from '~/services/department-services'
import { formatTime } from '~/utils'
import type { Department } from '~/types/department'
import DepartmentCreate from '../../components/hr/department-create.vue'
import DepartmentUpdate from '../../components/hr/department-update.vue'

type DepartmentForm = Pick<Department, 'department'>

const { t } = useI18n()

const search = ref<string>('')
const departments = ref<Department[]>([])

const showCreateDepartmentForm = ref(false)
const showUpdateDepartmentForm = ref(false)
const isFetching = ref(false)

const departmentForm = reactive<DepartmentForm>({
  department: '',
})
const departmentUpdateForm = reactive<Pick<Department, 'id' | 'department'>>({
  id: -1,
  department: '',
})

const departmentFormError = reactive<DepartmentForm>({
  department: '',
})

const filterTableDepartments = computed(
  () =>
    departments.value?.filter(
      (department) =>
        !search.value ||
        department.department.toLowerCase().includes(search.value.toLowerCase())
    ) || []
)

const toggleCreateForm = () => {
  showCreateDepartmentForm.value = true
  departmentFormError.department = ''
}
const toggleUpdateForm = (department: Department) => {
  showUpdateDepartmentForm.value = true
  departmentFormError.department = ''
  Object.assign(departmentUpdateForm, department)
}

const refreshDepartments = async () => {
  try {
    const response = await departmentServices.departments()

    departments.value = response
  } catch {
    departments.value = []
  }
}

const addNewDepartment = async () => {
  isFetching.value = true
  try {
    if (departmentForm.department === '') {
      throw new Error(t('validate.required'))
    }
    const response = await departmentServices.create(departmentForm)
    ElMessage({
      message: `${response.message}`,
      duration: 5000,
      showClose: true,
      type: 'success',
    })

    departmentForm.department = ''
    departmentFormError.department = ''

    await refreshDepartments()
  } catch (e) {
    const message: string = (e as any).message
    departmentFormError.department = message
    ElMessage({
      message: message,
      duration: 5000,
      showClose: true,
      type: 'error',
    })
  }
  isFetching.value = false
}

const updateDepartment = async () => {
  isFetching.value = true
  try {
    if (departmentUpdateForm.department === '') {
      throw new Error(t('validate.required'))
    }
    const response = await departmentServices.update(departmentUpdateForm)

    ElMessage({
      message: `${response.message}`,
      duration: 5000,
      showClose: true,
      type: 'success',
    })

    departmentFormError.department = ''

    await refreshDepartments()
  } catch (e) {
    const message: string = (e as any).message
    departmentFormError.department = message
    ElMessage({
      message: message,
      duration: 5000,
      showClose: true,
      type: 'error',
    })
  }
  isFetching.value = false
}

const removeDepartment = async (department: Department) => {
  isFetching.value = true
  try {
    const response = await departmentServices.remove(department)

    ElMessage({
      message: response.message,
      type: 'success',
      duration: 2000,
    })
    await refreshDepartments()
  } catch (e: unknown) {
    ElMessage({
      message: 'Delete department failure',
      type: 'error',
      duration: 2000,
    })
  }
  isFetching.value = false
}

onMounted(async () => {
  await refreshDepartments()
})
</script>

<style scoped lang="scss">
@import 'element-plus/theme-chalk/src/mixins/function.scss';

.department-dashboard {
  padding: 20px 10px;
  height: 100%;
}
.department-heading {
  margin-bottom: 10px;
}
.department-table {
  background-color: getCssVar(bg-color);
  border-radius: 20px;
  height: 100%;
  overflow: hidden;
}

// .table-header {
//   background-color: none;
// }
.el-table {
  --el-bg-color: transparent;
}

.table-row {
  border-radius: 8px;
  padding: 4px 2px;
  overflow: hidden;
}

.vs-button {
  --vs-margin: 0;
}
</style>

<style lang="scss">
.table-operations .cell {
  display: flex;
  justify-content: center;
}
</style>
