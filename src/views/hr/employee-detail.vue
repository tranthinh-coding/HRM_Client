<template>
  <div class="wrapper">
    <div class="back-button" @click="back">
      <el-icon size="17"> <arrow-left /> </el-icon>
    </div>
    <div class="heading">
      <h1 class="page-title">Employee Profile</h1>
    </div>

    <div class="mt-8 flex gap-8 flex-wrap md:flex-nowrap">
      <div class="profile flex-1 md:flex-auto">
        <div class="general-profile">
          <vs-avatar size="100">
            <template #text>
              {{ employee?.name }}
            </template>
          </vs-avatar>
          <div class="general-info">
            <span style="font-size: 20px">
              {{ employee?.name }}
            </span>
            <el-tag size="small"> {{ employee?.position?.name }} </el-tag>
          </div>
          <el-divider />
          <employee-profile />
        </div>
      </div>
      <div class="payment-setting flex-1 md:flex-auto">
        <employee-payment />
        <employee-payroll v-if="isHR(user?.role)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { isHR } from '~/config'
import { useUserStore } from '~/store'

import EmployeePayment from '~/components/hr/employee-payment.vue'
import EmployeePayroll from '~/components/hr/employee-payroll.vue'
import EmployeeProfile from '~/components/hr/employee-profile.vue'

import type { JobPosition, Department } from '~/types'

const router = useRouter()

const { user } = storeToRefs(useUserStore())

const props = defineProps<{
  id: string
}>()

const { result } = useQuery<{
  user: {
    id: Number
    name: String
    email: String
    join_date: String
    user_id: String
    status: String
    avatar: String
  }
  employee: {
    position: JobPosition
    department: Department
  }
}>(
  gql`
    query EmployeeDetail($user_id: String!) {
      user(user_id: $user_id) {
        id
        name
        email
        join_date
        user_id
        status
        avatar
      }
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
    }
  `,
  () => ({ user_id: props.id })
)

const employee = computed(() => {
  const profile = Object.assign({}, result.value?.user, result.value?.employee)
  return profile
})

const back = () => {
  router.push({ name: 'hr/employee' })
}

provide<{ employee_id: string }>('employee-detail', { employee_id: props.id })
</script>

<style scoped lang="scss">
.wrapper {
  border-radius: 20px;
  position: relative;
}

.box {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 30px;
}

.page-title {
  font-size: 24px;
  padding-top: 6px;
  margin-left: 60px;
}
.payment-setting {
  padding: 20px;
  flex: 1;
  // min-width: 400px;
  height: max-content;
  border-radius: 20px;
  background-color: getColor(bg-color);
}
.payroll-setting {
  padding: 20px;
  // width: 100%;
  flex: 1;
  height: max-content;
  border-radius: 20px;
  background-color: getColor(bg-color);
}
.profile {
  flex: 1;
  // min-width: 300px;
  height: max-content;
  width: 100%;
  background: getColor(bg-color);
  padding: 20px;
  border-radius: 20px;
}

.general-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  border: none;
}

.general-info {
  display: flex;
  gap: 4px;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
}
.general-col {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .general-field {
    min-height: 50px;
    .field-title {
      font-size: 16px;
      color: getColor(info);
    }
    .field-description {
      font-size: 14px;
    }
  }
}
</style>

<style lang="scss">
.back-button {
  position: absolute;
  top: 6px;
  left: 0;
  height: 36px;
  width: 40px;
  border-radius: 40px 18px 18px 18px;
  background-color: getColor(bg-color);
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 32px 1px rgba(0, 0, 0, getCssVar(shadow-opacity));
  }
}
</style>
