<template>
  <el-form
    ref="formRef"
    status-icon
    scroll-to-error
    :model="form"
    :rules="formRules"
    class="form rounded-xl"
  >
    <el-form-item>
      <h1 class="form-header">{{ t('pages.getStarted') }}</h1>
    </el-form-item>
    <el-form-item prop="name" :error="formErrors.name">
      <el-input
        v-model="form.name"
        label="name"
        icon=""
        :placeholder="t('form.name')"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item prop="email" :error="formErrors.email">
      <el-input
        v-model="form.email"
        label="email"
        :placeholder="t('form.email')"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item prop="password" :error="formErrors.password">
      <el-input
        type="password"
        v-model="form.password"
        label="password"
        :placeholder="t('form.password')"
        clearable
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item
      prop="password_confirmation"
      :error="formErrors.password_confirmation"
    >
      <el-input
        type="password"
        v-model="form.password_confirmation"
        label="password_confirmation"
        :placeholder="t('form.passwordConfirmation')"
        clearable
        show-password
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="form-submit"
        :disabled="isFetching"
        @click.prevent="submit"
      >
        {{ t('auth.register') }}
      </el-button>
    </el-form-item>
    <el-form-item size="large">
      <span>
        {{ t('auth.haveAnAccount') }}
        <el-link type="primary">
          <router-link :to="{ name: 'login' }">
            {{ t('auth.login') }}
          </router-link>
        </el-link>
      </span>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import type { FormRules, FormInstance } from 'element-plus'
import UserService from '~/services/user-service'
import { getResponseError } from '~/composables'

interface FormState {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const { t } = useI18n()
const router = useRouter()
const formRef = ref<FormInstance>()
const form = reactive<FormState>({
  name: 'think',
  email: 'tranthinh.own@gmail.com',
  password: '123123123',
  password_confirmation: '123123123',
})
const isFetching = ref<boolean>(false)
const formErrors = reactive<FormState>({
  email: '',
  name: '',
  password: '',
  password_confirmation: '',
})
const formRules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: t('validate.required'),
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: t('validate.required'),
      trigger: 'blur',
    },
    {
      type: 'email',
      message: t('validate.email'),
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: t('validate.required'),
      trigger: 'blur',
    },
  ],
  password_confirmation: [
    {
      required: true,
      message: t('validate.required'),
      trigger: 'blur',
    },
    {
      validator: formRule_validatePass2,
      trigger: 'blur',
    },
  ],
})

function formRule_validatePass2(
  _: any,
  value: any,
  callback: (error?: string | Error | undefined) => void
) {
  if (value === form.password) {
    return callback()
  }
  // validate confirmation: {param} need to confirm.: Call t('path', [param])
  return callback(t('validate.confirmation', [t('validate.password')]))
}

const submit = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid: Boolean) => {
    if (!valid) return
    isFetching.value = true

    try {
      const usr = await UserService.register(form)

      if (!usr) {
        ElMessage({
          message: t('request.response.noData'),
          type: 'error',
          duration: 8 * 1000,
          showClose: true,
        })
        return
      }

      ElMessage({
        message: t('auth.registerSuccess'),
        type: 'success',
        duration: 1.5 * 1000,
        showClose: true,
      })
      return router.push({ name: 'home' })
    } catch (error) {
      const _error = getResponseError<FormState>(error)

      if (_error.errors) {
        formErrors.email = _error.errors.email?.[0] || ''
        formErrors.name = _error.errors.name?.[0] || ''
        formErrors.password = _error.errors.password?.[0] || ''
        formErrors.password_confirmation =
          _error.errors.password_confirmation?.[0] || ''
      }
      if (_error.message) {
        ElMessage({
          message: _error.message,
          type: 'error',
          duration: 8 * 1000,
          showClose: true,
        })
      }
    }

    isFetching.value = false
  })
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');
@import 'element-plus/theme-chalk/src/mixins/function.scss';

.form {
  max-width: 380px;
  margin: auto;
  background-color: getCssVar(bg-color, page);
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
  color: var(--el-color-primary);
  text-align: center;
  width: 100%;
  font-family: 'Ubuntu', sans-serif;
}

.form-submit {
  width: 100%;
}
</style>
