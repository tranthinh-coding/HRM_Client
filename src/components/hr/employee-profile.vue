<template>
  <div class="w-full flex items-center justify-between">
    <h1 class="text-lg">Thông tin cá nhân</h1>
    <vs-tooltip>
      <template #content>Chỉnh sửa</template>
      <vs-button @click="toggleEditable" type="transparent" color="danger" icon>
        <el-icon size="18">
          <edit />
        </el-icon>
      </vs-button>
    </vs-tooltip>
  </div>
  <div class="boxes">
    <div class="group-form">
      <div class="info-group">
        <h3 class="info-label">Email</h3>
        <vs-input
          :disabled="!editable"
          class="info-control"
          v-model="updateForm.email"
        />
      </div>
      <div class="info-group">
        <h3 class="info-label">Số điện thoại</h3>
        <vs-input
          :disabled="!editable"
          class="info-control"
          v-model="updateForm.phone_number"
        />
      </div>
      <div class="info-group">
        <h3 class="info-label">Địa chỉ</h3>
        <vs-input
          :disabled="!editable"
          class="info-control"
          v-model="updateForm.address"
        />
      </div>
      <div class="info-group">
        <h3 class="info-label">Quốc gia</h3>
        <vs-input
          :disabled="!editable"
          class="info-control"
          v-model="updateForm.country"
        />
      </div>
      <div class="info-group">
        <h3 class="info-label">CMND/CCCD</h3>
        <vs-input
          :disabled="!editable"
          class="info-control"
          v-model="updateForm.citizen_id_card"
        />
      </div>
      <div class="info-group">
        <h3 class="info-label">Quốc tịch</h3>
        <vs-input
          :disabled="!editable"
          class="info-control"
          v-model="updateForm.nationality"
        />
      </div>
      <div class="info-group">
        <h3 class="info-label">Ngày sinh</h3>
        <vs-input
          type="date"
          :disabled="!editable"
          class="info-control"
          v-model="updateForm.date_of_birth"
        />
      </div>
      <div class="info-group">
        <h3 class="info-label">Giới tính</h3>
        <vs-select
          class="info-control"
          :disabled="!editable"
          v-model="updateForm.gender"
        >
          <vs-option value="Nam" />
          <vs-option value="Nữ" />
        </vs-select>
      </div>
    </div>

    <div class="group-form">
      <div class="info-group">
        <h3 class="info-label">Trạng thái</h3>

        <vs-input
          v-if="isEmployee(currentUser?.role)"
          class="info-content"
          disabled
          :model-value="profile.status"
        />
        <vs-select v-else :disabled="!editable" v-model="updateForm.status">
          <vs-option
            v-for="(status, index) in result?.userStatusTypes"
            :key="index"
            :value="status.name"
          />
        </vs-select>
      </div>
      <div class="info-group">
        <h3 class="info-label">Phòng ban</h3>
        <vs-input
          v-if="isEmployee(currentUser?.role)"
          class="info-content"
          disabled
          :model-value="profile.department.name"
        />
        <vs-select
          v-else
          v-model="updateForm.department_id"
          :disabled="!editable"
        >
          <vs-option
            v-for="(department, index) in departments"
            :key="index"
            :value="department.id"
            :label="department.name"
          />
        </vs-select>
      </div>
      <div class="info-group">
        <h3 class="info-label">Chức vụ</h3>
        <vs-input
          v-if="isEmployee(currentUser?.role)"
          class="info-content"
          :model-value="profile.position.name"
          disabled
        />
        <vs-select
          v-else
          v-model="updateForm.position_id"
          :disabled="!editable"
        >
          <vs-option
            v-for="(position, index) in positions"
            :key="index"
            :value="position.id"
            :label="position.name"
          />
        </vs-select>
      </div>
    </div>
  </div>

  <template v-if="editable">
    <div class="mt-4 w-full flex items-center justify-end gap-2">
      <vs-button @click="cancelChanges" block type="transparent" color="danger">
        Huỷ
      </vs-button>
      <vs-button
        @click="saveChanges"
        type="flat"
        block
        :disabled="!isProfileChange"
      >
        Lưu thay đổi
      </vs-button>
    </div>
  </template>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, inject, onBeforeMount, reactive, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { isNil } from 'lodash-unified'
import EmployeeServices from '~/services/employee-services'

import { isEmployee } from '~/config'
import { useDepartmentStore, usePositionStore, useUserStore } from '~/store'
import { Employee, ProfileInformation, User, UserStatus } from '~/types'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'

type ProfileState = Pick<Employee, 'department_id' | 'position_id'> &
  Pick<User, 'status' | 'email'> &
  ProfileInformation

type ProfileQuery = {
  userStatusTypes: [UserStatus]
  employee: Pick<Employee, 'department' | 'position'>
  user: Pick<User, 'status' | 'email' | 'role'>
  profile?: ProfileInformation
}

const props = defineProps<{
  id: string
}>()

const departmentStore = useDepartmentStore()
const { departments } = storeToRefs(departmentStore)
const positionStore = usePositionStore()
const { positions } = storeToRefs(positionStore)

const { user: currentUser } = storeToRefs(useUserStore())

const editable = ref(false)

const { result, refetch } = useQuery<ProfileQuery>(
  gql`
    query EmployeeProfile($user_id: String!) {
      employee(employee_id: $user_id) {
        position {
          id
          name
        }
        department {
          id
          name
        }
      }
      user(user_id: $user_id) {
        id
        status
        email
        role
      }
      profile(user_id: $user_id) {
        address
        gender
        country
        date_of_birth
        phone_number
        nationality
        citizen_id_card
      }
      userStatusTypes {
        name
      }
    }
  `,
  () => ({
    user_id: props?.id,
  })
)

// check updateForm is the same profile
const isProfileChange = ref<boolean>(false)

const updateForm = reactive({
  address: '',
  citizen_id_card: '',
  country: '',
  date_of_birth: '',
  nationality: '',
  phone_number: '',
  email: '',
  gender: '',
  status: '',
  position_id: NaN,
  department_id: NaN,
})

const profile = computed(() =>
  Object.assign(
    {},
    result.value?.employee,
    result.value?.user,
    result.value?.profile
  )
)

const saveChanges = async () => {
  try {
    const response = await EmployeeServices.saveProfile({
      ...updateForm,
      user_id: props?.id,
    })
    ElMessage({
      message: response.message || 'Save employee information success',
      duration: 3000,
      type: 'success',
    })
    await refetch(() => ({
      user_id: props?.id,
    }))
    resetProfile()
  } catch (e) {
    ElMessage({
      message: 'Error saving changes',
      duration: 3000,
      type: 'error',
    })
  }
}

const toggleEditable = () => {
  if (editable.value) {
    return cancelChanges()
  }
  editable.value = true
}

const cancelChanges = () => {
  editable.value = false
  resetProfile()
}

const resetProfile = () => {
  updateForm.address = result.value?.profile?.address || ''
  updateForm.citizen_id_card = result.value?.profile?.citizen_id_card || ''
  updateForm.country = result.value?.profile?.country || ''
  updateForm.date_of_birth = result.value?.profile?.date_of_birth || ''
  updateForm.nationality = result.value?.profile?.nationality || ''
  updateForm.phone_number = result.value?.profile?.phone_number || ''
  updateForm.gender = result.value?.profile?.gender || ''
  updateForm.email = result.value?.user?.email
  updateForm.status = result.value?.user?.status
  updateForm.position_id = result.value?.employee?.position.id
  updateForm.department_id = result.value?.employee?.department.id

  Object.keys(updateForm).forEach((key: unknown) => {
    let _key = key as keyof ProfileState
    if (isNil(profile.value[_key])) {
      profile.value[_key] = updateForm[_key] as never
    }
  })
}

watch(result, () => {
  resetProfile()
})

watch(updateForm, (val) => {
  isProfileChange.value = Object.keys(updateForm).some((key: unknown) => {
    if (key === '__typename') return false
    if (
      (isNil(profile.value[key]) && val[key] == '') ||
      (isNil(val[key]) && profile.value[key] == '')
    )
      return false
    return profile.value[key] !== val[key]
  })
})
</script>

<style scoped lang="scss">
.boxes {
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
}
.info-group {
  flex: auto;
  gap: 8px;
  margin-bottom: 10px;

  .info-label {
    flex: 1;
    flex-shrink: 0;
    font-size: 14px;
    margin-left: 16px;
  }

  .info-content {
    width: 100%;
    font-size: 18px;

    // border: none;
    // outline: none;
    // max-width: 200px;
    color: getColor(info);
    padding-left: 10px;
    // padding: 8px 14px;
    // border-radius: 12px;
  }
  .info-control {
    width: 100%;
    font-size: 18px;

    border: none;
    outline: none;
    // max-width: 200px;
    background-color: getColor(gray-2);
    padding: 8px 14px;
    border-radius: 12px;
  }
}
</style>

<style lang="scss">
.group-form {
  width: 100%;
  .vs-select {
    --vs-select-width: auto;
  }
  .vs-select__input {
    background-color: getColor(gray-2) !important;
  }
}
</style>
