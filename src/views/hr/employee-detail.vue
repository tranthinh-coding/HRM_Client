<template>
  <div class="wrapper">
    <div class="back-button" @click="back">
      <el-icon size="17"> <arrow-left /> </el-icon>
    </div>
    <div class="heading">
      <h1 class="page-title">Employee Profile</h1>
    </div>

    <div class="profile">
      <div class="">
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="8">
            <div style="display: flex">
              <vs-avatar size="100">
                <img src="https://source.unsplash.com/random" alt="" />
              </vs-avatar>
              <div class="general-info">
                <span class="field"> {{ employee?.name }} </span>
                <span class="field"> Join date {{ employee?.join_date }} </span>
                <el-tag>{{ employee?.position }}</el-tag>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <div class="general-col">
              <div class="general-field">
                <h3 class="field-title">{{ t('employee.email') }}</h3>
                <span class="field-description">{{ employee?.email }}</span>
              </div>
              <div class="general-field">
                <h3 class="field-title">{{ t('employee.address') }}</h3>
                <span class="field-description">{{ employee?.address }}</span>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <div class="general-col">
              <div class="general-field">
                <h3 class="field-title">{{ t('employee.birthdate') }}</h3>
                <span class="field-description">{{ employee?.birthday }}</span>
              </div>
              <div class="general-field">
                <h3 class="field-title">{{ t('employee.gender') }}</h3>
                <span class="field-description">{{ employee?.gender }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-tabs>
        <el-tab-pane label="Persional information"> 1 </el-tab-pane>
        <el-tab-pane lazy label="Payment setting">2</el-tab-pane>
        <el-tab-pane lazy v-if="isHR(user.role)" label="Payroll (Admin only)">
          3
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { isHR } from '~/config'
import employeeServices from '~/services/employee-services'
import { useUser } from '~/store'

const router = useRouter()

const user = useUser()

const props = defineProps<{
  id: string
}>()

// const { result } = useQuery<{
//   employeeProfile: {
//     employment_of_spouse: string
//     marital_status: string
//   }
// }>(
//   gql`
//     query Employee($user_id: String!) {
//       user(user_id: $user_id) {
//         name
//         email
//         user_id
//         gender
//         join_date
//         birth_date
//         phone_number
//         status
//         avatar
//         role
//         phone_number
//         position
//         department
//         created_at
//       }
//       employeeProfile(user_id: $user_id) {
//         employment_of_spouse
//         marital_status
//       }
//     }
//   `,
//   () => ({
//     user_id: props.id,
//   })
// )

// watch(result, (usr) => {
//   console.log(usr?.employeeProfile)
// })

const { t } = useI18n()

const employee = ref()

const back = () => {
  router.push({ name: 'hr/employee' })
}

const fetchProfile = async () => {
  try {
    employee.value = await employeeServices.getProfile(props.id)
  } catch (error) {
    employee.value = null
  }
}

onBeforeMount(() => {
  Promise.all([fetchProfile()])
})
</script>

<style scoped lang="scss">
.wrapper {
  border-radius: 20px;
  position: relative;
}

.page-title {
  font-size: 24px;
  padding-top: 6px;
  margin-left: 60px;
}

.profile {
  background: getColor(bg-color);
  padding: 20px;
  margin-top: 10px;
  border-radius: 20px;
}

img {
  border: none;
}

.general-info {
  display: flex;
  gap: 10px;
  flex-direction: column;
  margin-left: 20px;
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
