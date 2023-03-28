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
      <h1 class="form-header">{{ APP_NAME }}</h1>
    </el-form-item>
    <el-form-item prop="email">
      <el-input
        v-model="form.email"
        label="email"
        :placeholder="t('form.email')"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="form.password"
        label="password"
        :placeholder="t('form.password')"
        clearable
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="isFetching"
        class="form-submit"
        @click="submit"
        type="primary"
      >
        {{ t('auth.login') }}
      </el-button>
    </el-form-item>
    <el-form-item size="large">
      <span>
        {{ t('auth.haveNotAnAccount') }}
        <el-link type="primary">
          <router-link :to="{ name: 'register' }">
            {{ t('auth.register') }}
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
import type { FormInstance, FormRules } from 'element-plus'
import { APP_NAME } from '~/config'
import UserService from '~/services/user-service'
import { getResponseError } from '~/composables'

interface FormState {
  email: string
  password: string
}

const { t } = useI18n()
const router = useRouter()
const formRef = ref<FormInstance>()
const form = reactive<FormState>({
  email: 'tranthinh.own@gmail.com',
  password: '123123123',
})
const formRules = reactive<FormRules>({
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
})
const isFetching = ref<boolean>(false)

// Submit form
const submit = () => {
  if (!formRef.value) return

  formRef.value.validate(async (valid: Boolean) => {
    if (!valid) return
    isFetching.value = true

    try {
      const usr = await UserService.login(form)

      if (!usr) {
        ElMessage({
          message: t('request.response.noData'),
          type: 'error',
          duration: 3 * 1000,
          showClose: true,
        })
        isFetching.value = false
        return
      }

      ElMessage({
        message: t('auth.loginSuccess'),
        type: 'success',
        duration: 3 * 1000,
        showClose: true,
      })

      isFetching.value = false
      return router.push({ name: 'home' })
    } catch (error) {
      const _error = getResponseError<FormState>(error)
      ElMessage({
        message: _error.message,
        type: 'error',
        duration: 3 * 1000,
        showClose: true,
      })
    }

    isFetching.value = false
  })
}
</script>

<style scoped lang="scss">
@import 'element-plus/theme-chalk/src/mixins/function.scss';
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

.form {
  max-width: 380px;
  margin: auto;
  background-color: getCssVar(bg-color, page);
  max-height: max-content;
  min-height: 220px;
  padding: 28px;
  border-radius: 30px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input__inner {
  padding: 1.4rem 0;
}

.form-header {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  margin-top: 20px;
  color: getCssVar(color, primary);
  text-align: center;
  width: 100%;
  font-family: 'Ubuntu', sans-serif;
}

.form-submit {
  width: 100%;
}
</style>