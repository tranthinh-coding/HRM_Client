<template>
  <div class="flex items-center justify-center">
    <div
      class="w100 relative theme-layout rounded-30px p4 mx-auto my-auto flex flex-col gap4"
    >
      <h1
        class="absolute bottom-full translate-y-7 text-lg px-7 l-10 theme-layout p2 rounded-40px"
      >
        Welcome to <b>{{ APP_NAME }}</b>
      </h1>

      <div class="con-form mt-6 flex flex-col gap2">
        <vs-input v-model="form.name" :label="t('form.name')" label-float>
          <template #icon> <i class="bx bx-user"></i> </template>
          <template v-if="!form.name" #message-danger>
            Dien day du ho ten
          </template>
        </vs-input>

        <vs-input v-model="form.email" :label="t('form.email')" label-float>
          <template #icon> @ </template>
          <template v-if="!form.email" #message-danger>
            Dien day du email
          </template>
        </vs-input>

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

        <vs-input
          type="password"
          v-model="form.password_confirmation"
          :label="t('form.passwordConfirmation')"
          label-float
          show-password
        >
          <template #icon>
            <i class="bx bxs-lock"></i>
          </template>

          <template
            v-if="
              !form.password_confirmation ||
              form.password_confirmation !== form.password
            "
            #message-danger
          >
            {{
              !form.password_confirmation
                ? 'Dien mat khau'
                : 'Mat khau nhap lai khong dung'
            }}
          </template>
        </vs-input>
      </div>

      <vs-button :disabled="isFetching" block @click="submit">
        {{ t('auth.register') }}
      </vs-button>

      <span>
        {{ t('auth.haveAnAccount') }}
        <el-link type="primary">
          <router-link :to="{ name: 'login' }">
            {{ t('auth.login') }}
          </router-link>
        </el-link>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { notification } from 'vuesax-old'
import UserService from '~/services/user-service'
import { getResponseError } from '~/composables'
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

interface FormState {
  name: string
  email: string
  password: string
  password_confirmation: string
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

const form = reactive<FormState>({
  name: 'think',
  email: 'tranthinh.own@gmail.com',
  password: '123123123',
  password_confirmation: '123123123',
})

const isFetching = ref<boolean>(false)

const submit = async () => {
  if (
    !form.email ||
    !form.password ||
    !form.password_confirmation ||
    !form.name
  ) {
    return
  }

  isFetching.value = true

  try {
    const usr = await UserService.register(form)

    if (!usr) {
      notification({
        title: t('auth.register'),
        text: t('request.response.noData'),
        border: 'danger',
        duration: 8 * 1000,
        position: 'top-center',
        progress: true,
      })
      return
    }

    // need to restart the graphql query
    applicationStore.restart()
    departmentsStore.restart()
    employeeStore.restart()
    hourlyWageCoefficientStore.restart()
    jobStore.restart()
    positionStore.restart()
    rewardStore.restart()
    timekeepingStore.restart()
    timeoffStore.restart()
    usersStore.restart()

    console.log('[GRAPHQL] restarted')

    notification({
      title: t('auth.register'),
      text: t('auth.registerSuccess'),
      border: 'success',
      duration: 1.5 * 1000,
      position: 'top-center',
      progress: true,
    })

    isFetching.value = false
    return router.push({ name: 'home' })
  } catch (error) {
    const _error = getResponseError<FormState>(error)

    if (_error.message) {
      notification({
        title: t('auth.register'),
        text: _error.message,
        border: 'danger',
        duration: 8 * 1000,
        position: 'top-center',
        progress: true,
      })
    }
    isFetching.value = false
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

.form {
  max-width: 380px;
  margin: auto;
  background-color: getColor(bg-color, page);
  max-height: max-content;
  min-height: 220px;
  padding: 28px;
  border-radius: var(--el-border-radius-large);
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input__inner {
  padding: 14px 0;
}

.form-header {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  margin-top: 20px;
  color: getColor(primary);
  text-align: center;
  width: 100%;
  font-family: 'Ubuntu', sans-serif;
}

.form-submit {
  width: 100%;
}
</style>
