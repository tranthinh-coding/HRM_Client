<template>
  <div class="w-full flex items-center justify-between">
    <h1 class="text-lg">Thông tin cá nhân</h1>
    <vs-tooltip>
      <template #content>Chỉnh sửa</template>
      <vs-button
        @click="editable = !editable"
        type="transparent"
        color="danger"
        icon
      >
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
          v-if="isEmployee(currentUser.role)"
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
          v-if="isEmployee(currentUser.role)"
          class="info-content"
          disabled
          :model-value="profile.department"
        />
        <vs-select v-else v-model="updateForm.department" :disabled="!editable">
          <vs-option
            v-for="(department, index) in result?.departments"
            :key="index"
            :value="department.name"
          />
        </vs-select>
      </div>
      <div class="info-group">
        <h3 class="info-label">Chức vụ</h3>
        <vs-input
          v-if="isEmployee(currentUser.role)"
          class="info-content"
          :model-value="profile.position"
          disabled
        />
        <vs-select v-else v-model="updateForm.position">
          <vs-option
            v-for="(position, index) in result?.positions"
            :key="index"
            :value="position.name"
          />
        </vs-select>
      </div>
    </div>
  </div>

  <template v-if="editable">
    <div class="mt-4 w-full flex items-center justify-end gap-2">
      <vs-button @click="cancelUpdate" block type="transparent" color="danger">
        Huỷ
      </vs-button>
      <vs-button
        @click="updateProfile"
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
import { computed, inject, onMounted, reactive, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { isNil } from 'lodash-unified'

import { isEmployee } from '~/config'
import { useUser } from '~/store'
import {
  Department,
  Employee,
  JobPosition,
  ProfileInformation,
  User,
  UserStatus,
} from '~/types'

type ProfileState = Pick<Employee, 'department' | 'position'> &
  Pick<User, 'status' | 'email'> &
  ProfileInformation

type ProfileQuery = {
  userStatusTypes: [UserStatus]
  employee: Pick<Employee, 'department' | 'position'>
  user: Pick<User, 'status' | 'email' | 'role'>
  profile?: ProfileInformation
  departments: Department[]
  positions: JobPosition[]
}

const currentUser = useUser()

const editable = ref(false)
const employee = inject<{ employee_id: string }>('employee-detail')

const { result, refetch } = useQuery<ProfileQuery>(
  gql`
    query EmployeeProfile($user_id: String!) {
      employee(employee_id: $user_id) {
        position
        department
      }
      user(user_id: $user_id) {
        id
        status
        email
        role
      }
      departments {
        name
      }
      positions {
        name
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
    user_id: employee?.employee_id,
  })
)

// check updateForm is the same profile
const isProfileChange = ref<boolean>(false)

const updateForm = reactive<ProfileState>({
  address: '',
  citizen_id_card: '',
  country: '',
  date_of_birth: '',
  nationality: '',
  phone_number: '',
  email: '',
  gender: '',
  status: '',
  position: '',
  department: '',
})

const profile = computed<ProfileState>(() =>
  Object.assign(
    {},
    result.value?.employee,
    result.value?.user,
    result.value?.profile
  )
)

const updateProfile = () => {
  console.log(updateForm)
}

const cancelUpdate = () => {
  editable.value = false
  resetProfile()
}

const resetProfile = () => {
  if (!result.value) return
  updateForm.address = result.value.profile?.address
  updateForm.citizen_id_card = result.value.profile?.citizen_id_card
  updateForm.country = result.value.profile?.country
  updateForm.date_of_birth = result.value.profile?.date_of_birth
  updateForm.nationality = result.value.profile?.nationality
  updateForm.phone_number = result.value.profile?.phone_number
  updateForm.gender = result.value.profile?.gender
  updateForm.email = result.value.user.email
  updateForm.status = result.value.user.status
  updateForm.position = result.value.employee.position
  updateForm.department = result.value.employee.department

  Object.keys(updateForm).forEach((key: unknown) => {
    let _key = key as keyof ProfileState
    if (isNil(profile.value[_key])) {
      profile.value[_key] = updateForm[_key] as any
    }
  })
}

watch(result, () => {
  resetProfile()
})

watch(updateForm, (val) => {
  isProfileChange.value = Object.keys(updateForm).some((key: unknown) => {
    if (key === '__typename') return false
    let _key = key as unknown as keyof ProfileState
    if (
      (isNil(profile.value[_key]) && val[_key] == '') ||
      (isNil(val[_key]) && profile.value[_key] == '')
    )
      return false
    return profile.value[_key] !== val[_key]
  })
})

onMounted(() => {
  refetch(() => ({
    user_id: employee?.employee_id,
  }))
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
