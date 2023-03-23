<template>
  <vs-dialog scroll auto-width v-model="isOpen">
    <template #header>
      <h4 v-html="t('employee.create')"></h4>
    </template>

    <div class="form-group">
      <div class="form-original">
        <vs-select v-model="selectedUser" label="Full Name" label-float>
          <vs-option
            v-for="(user, index) in users"
            :key="index"
            :value="user"
            :label="user.name"
          />
        </vs-select>
      </div>
      <div class="form-original">
        <vs-input
          v-model="selectedUser.user_id"
          label="Employee ID"
          label-float
          disabled
        />
      </div>
    </div>
    <div class="form-group">
      <div class="form-original">
        <vs-select
          v-model="employeeForm.department"
          label="Department"
          label-float
        >
          <vs-option
            v-for="(department, index) in departments"
            :key="index"
            :value="department.department"
          />
        </vs-select>
      </div>
      <div class="form-original">
        <vs-input
          v-model="selectedUser.email"
          label="Email"
          label-float
          disabled
        />
      </div>
    </div>

    <div class="form-group">
      <div class="form-original">
        <vs-select
          v-model="employeeForm.position"
          label-float
          :label="t('employee.position')"
        >
          <vs-option
            v-for="(position, index) in positions"
            :key="index"
            :value="position.position"
          />
        </vs-select>
      </div>
      <div class="form-original">
        <vs-select
          v-model="employeeForm.gender"
          label-float
          :label="t('employee.gender')"
        >
          <vs-option value="Nam" />
          <vs-option value="Nữ" />
        </vs-select>
      </div>
    </div>

    <template #footer>
      <vs-button block @click="addNewEmployee">
        {{ t('actions.create') }}
      </vs-button>
    </template>
  </vs-dialog>
</template>

<script setup lang="ts">
import { onBeforeMount, PropType, reactive, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useDepartment } from '~/store'
import { JobPosition, User } from '~/types'
import EmployeeServices from '~/services/employee-services'
import { getResponseError } from '~/composables'
import { refetch as refetchEmployees } from '~/store/employees'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  positions: {
    type: Array as PropType<JobPosition[]>,
    required: true,
  },
})

const emit = defineEmits({
  'update:open': () => true,
})
const isOpen = useVModel(props, 'open', emit)
const { t } = useI18n()

const users = ref<User[]>([])
// @ts-ignore
const selectedUser = ref<User>({})

const { departments, refetch: refetchDepartments } = useDepartment()

const employeeForm = reactive<{
  department: string
  position: string
  gender: string
}>({ department: '', position: '', gender: '' })

const addNewEmployee = async () => {
  try {
    const response = await EmployeeServices.create({
      user_id: selectedUser.value.user_id,
      department: employeeForm.department,
      position: employeeForm.position,
      gender: employeeForm.gender,
    })

    ElMessage({
      message: response.message || 'Thêm nhân viên thành công',
      duration: 3000,
      type: 'success',
      zIndex: 9999,
    })

    Object.assign(employeeForm, { department: '', position: '', gender: '' })
    // @ts-ignore
    selectedUser.value = {}
    refetchEmployees()
  } catch (error) {
    const _e = getResponseError(error)

    ElMessage({
      message: _e.message || 'Thêm nhân viên không thành công',
      type: 'error',
      duration: 4000,
      zIndex: 99999,
    })
  }
}

const fetchUsers = async () => {
  try {
    users.value = await EmployeeServices.infoCreate()
  } catch (error) {
    users.value = []
  }
}

onBeforeMount(() => {
  Promise.all([refetchDepartments(), fetchUsers()])
})
</script>

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
