<template>
  <div class="boxes">
    <div class="group-form">
      <div class="info-group">
        <h3 class="info-label">Email</h3>
        <input class="info-control" v-model="updateForm.email" />
      </div>
      <div class="info-group">
        <h3 class="info-label">Số điện thoại</h3>
        <input class="info-control" v-model="updateForm.phone_number" />
      </div>
      <div class="info-group">
        <h3 class="info-label">Địa chỉ</h3>
        <input class="info-control" v-model="updateForm.address" />
      </div>
      <div class="info-group">
        <h3 class="info-label">Quốc gia</h3>
        <input class="info-control" v-model="updateForm.country" />
      </div>
      <div class="info-group">
        <h3 class="info-label">CMND/CCCD</h3>
        <input class="info-control" v-model="updateForm.citizen_id_card" />
      </div>
      <div class="info-group">
        <h3 class="info-label">Quốc tịch</h3>
        <input class="info-control" v-model="updateForm.nationality" />
      </div>
      <div class="info-group">
        <h3 class="info-label">Ngày sinh</h3>
        <input
          type="date"
          class="info-control"
          v-model="updateForm.date_of_birth"
        />
      </div>
      <div class="info-group">
        <h3 class="info-label">Giới tính</h3>
        <vs-select class="info-control" v-model="updateForm.gender">
          <vs-option value="Nam" />
          <vs-option value="Nữ" />
        </vs-select>
      </div>
    </div>

    <div class="group-form">
      <div class="info-group">
        <h3 class="info-label">Trạng thái</h3>

        <span v-if="isEmployee(currentUser.role)" class="info-content" disabled>
          {{ profile.status }}
        </span>
        <vs-select v-else v-model="updateForm.status">
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
          :value="profile.department"
          disabled
        />
        <vs-select v-else v-model="updateForm.department">
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
          :value="profile.position"
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

  <vs-button
    @click="updateProfile"
    type="flat"
    color="dribbble"
    block
    class="mt-4"
    :disabled="!isProfileChange"
  >
    Lưu thay đổi
  </vs-button>
</template>

<script setup lang="ts">
import { computed, inject, reactive, ref, watch } from 'vue'
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

const employee = inject<{ employee_id: string }>('employee-detail')

const { result } = useQuery<ProfileQuery>(
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

watch(result, (val) => {
  if (!val) return
  updateForm.address = val.profile?.address
  updateForm.citizen_id_card = val.profile?.citizen_id_card
  updateForm.country = val.profile?.country
  updateForm.date_of_birth = val.profile?.date_of_birth
  updateForm.nationality = val.profile?.nationality
  updateForm.phone_number = val.profile?.phone_number
  updateForm.gender = val.profile?.gender
  updateForm.email = val.user.email
  updateForm.status = val.user.status
  updateForm.position = val.employee.position
  updateForm.department = val.employee.department

  Object.keys(updateForm).forEach((key: unknown) => {
    let _key = key as keyof ProfileState
    if (isNil(profile.value[_key])) {
      profile.value[_key] = updateForm[_key] as any
    }
  })
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
  .vs-input {
    width: 200px !important;
    // width: auto;
  }
}
</style>
