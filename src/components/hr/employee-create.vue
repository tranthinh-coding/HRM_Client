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
          :model-value="selectedUser?.user_id"
          label="Employee ID"
          label-float
          disabled
        />
      </div>
    </div>
    <div class="form-group">
      <div class="form-original">
        <vs-select
          v-model="employeeForm.department_id"
          label="Department"
          label-float
        >
          <vs-option
            v-for="(department, index) in departments"
            :key="index"
            :value="department.id"
            :label="department.name"
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
        <vs-select
          v-model="employeeForm.position_id"
          label-float
          :label="t('employee.position')"
        >
          <vs-option
            v-for="(position, index) in positions"
            :key="index"
            :value="position.id"
            :label="position.name"
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
      <vs-button block @click="addNewEmployee" class="my-4">
        {{ t('actions.create') }}
      </vs-button>
    </template>
  </vs-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import EmployeeServices from '~/services/employee-services'
import { getResponseError } from '~/composables'
import { notification } from 'vuesax-old'
import {
  usePositionStore,
  useDepartmentStore,
  useUsersStore,
  useEmployeesStore,
} from '~/store'

const { t } = useI18n()

const emit = defineEmits({
  'update:open': () => true,
})

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const isOpen = useVModel(props, 'open', emit)

const positionStore = usePositionStore()
const { positions } = storeToRefs(positionStore)

const departmentStore = useDepartmentStore()
const { departments } = storeToRefs(departmentStore)

const employeeStore = useEmployeesStore()

const usersStore = useUsersStore()

const users = computed(() => usersStore.localFilter({ role: 'Guest' }))

const selectedUser = ref<{
  user_id: string
  email: string
  user_name: string
}>()

const employeeForm = reactive<{
  department_id?: number
  position_id?: number
  gender: string
}>({ department_id: undefined, position_id: undefined, gender: '' })

const addNewEmployee = async () => {
  try {
    if (!selectedUser.value) throw new Error('Please complete the fields')

    const response = await EmployeeServices.create({
      user_id: selectedUser.value.user_id,
      department_id: employeeForm.department_id,
      position_id: employeeForm.position_id,
      gender: employeeForm.gender,
    })

    notification({
      title: 'Employee Create Form',
      text: response.message || 'Thêm nhân viên thành công',
      duration: 5000,
      border: 'success',
      position: 'top-center',
      progress: true,
    })

    Object.assign(employeeForm, { department: '', position: '', gender: '' })

    selectedUser.value = undefined

    employeeStore.refetch()
  } catch (error) {
    const _e = getResponseError(error)

    notification({
      title: 'Employee Create Form',
      text: _e.message || 'Thêm nhân viên không thành công',
      border: 'danger',
      duration: 9000,
      position: 'top-center',
      progress: true,
    })
  }
}
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
