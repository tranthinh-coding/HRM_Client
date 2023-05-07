<template>
  <div
    class="w100 rounded-30px theme-layout p4 h88 mx-auto my-auto flex flex-col gap4"
  >
    <h1
      class="absolute bottom-full translate-y-7 text-lg px-7 l-10 theme-layout p2 rounded-40px"
    >
      Welcome to <b>{{ APP_NAME }}</b>
    </h1>

    <div class="con-form mt-6 flex flex-col gap-3">
      <div class="form-group">
        <vs-input v-model="form.email" :label="t('form.email')" label-float>
          <template #icon> @ </template>
          <template v-if="!form.email" #message-danger>
            Dien day du email
          </template>
        </vs-input>
      </div>

      <div class="form-group">
        <vs-input
          type="password"
          v-model="form.password"
          :label="t('form.password')"
          label-float
          show-password
        >
          <template #icon>
            <i class="bx bxs-lock"></i>
          </template>

          <template v-if="!form.password" #message-danger>
            Dien mat khau
          </template>
        </vs-input>
      </div>
    </div>
    <div class="form-group flex">
      <vs-checkbox v-model="remember">Remember me</vs-checkbox>
    </div>

    <vs-button :disabled="isFetching" block @click="submit">
      {{ t('auth.login') }}
    </vs-button>

    <span>
      {{ t('auth.haveNotAnAccount') }}
      <el-link type="primary">
        <router-link :to="{ name: 'register' }">
          {{ t('auth.register') }}
        </router-link>
      </el-link>
    </span>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { notification } from 'vuesax-old'
import {
  useUsersStore,
  useApplicantsStore,
  useDepartmentStore,
  useEmployeeTimeoffStore,
  useEmployeeTimekeepingStore,
  useRewardStore,
  usePositionStore,
  useJobsStore,
  useHourlyWageCoefficientsStore,
  useEmployeesStore,
} from '~/store'

import { APP_NAME } from '~/config'
import UserService from '~/services/user-service'
import { getResponseError } from '~/composables'

interface FormState {
  email: string
  password: string
}

const applicationStore = useApplicantsStore()
const departmentsStore = useDepartmentStore()
const employeeStore = useEmployeesStore()
const hourlyWageCoefficientStore = useHourlyWageCoefficientsStore()
const jobStore = useJobsStore()
const positionStore = usePositionStore()
const rewardStore = useRewardStore()
const timekeepingStore = useEmployeeTimekeepingStore()
const timeoffStore = useEmployeeTimeoffStore()
const usersStore = useUsersStore()

const { t } = useI18n()
const router = useRouter()
const remember = ref(true)

const form = reactive<FormState>({
  email: 'tranthinh.own@gmail.com',
  password: '123123123',
})

const isFetching = ref<boolean>(false)

// Submit form
const submit = async () => {
  if (!form.email || !form.password) {
    return
  }

  isFetching.value = true

  try {
    const usr = await UserService.login(form)

    if (!usr) {
      notification({
        text: t('request.response.noData'),
        border: 'danger',
        duration: 3 * 1000,
        position: 'top-center',
        progress: true,
      })
      isFetching.value = false
      return
    }

    // need to restart the graphql query
    applicationStore.start()
    departmentsStore.start()
    employeeStore.start()
    hourlyWageCoefficientStore.start()
    jobStore.start()
    positionStore.start()
    rewardStore.start()
    timekeepingStore.start()
    timeoffStore.start()
    usersStore.start()

    console.log('[GRAPHQL] restarted')

    notification({
      text: t('auth.loginSuccess'),
      border: 'success',
      duration: 3 * 1000,
      position: 'top-center',
      progress: true,
    })

    isFetching.value = false
    return router.push({ name: 'home' })
  } catch (error) {
    const _error = getResponseError<FormState>(error)
    notification({
      text: _error.message,
      border: 'danger',
      duration: 3 * 1000,
      position: 'top-center',
      progress: true,
    })
    isFetching.value = false
  }
}
</script>

<style scoped lang="scss"></style>
