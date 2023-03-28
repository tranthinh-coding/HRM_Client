<template>
  <el-divider />
  <div class="mt-10">
    <div class="flex items-center justify-between mb-10 w-full">
      <h1 class="text-lg">Cài đặt bảng lương</h1>
      <vs-tooltip>
        <template #content>Chỉnh sửa</template>
        <vs-button icon color="dribbble" type="transparent">
          <el-icon size="18" @click="editable = !editable">
            <edit />
          </el-icon>
        </vs-button>
      </vs-tooltip>
    </div>

    <vs-input
      v-model="salarySettings.base_salary"
      type="number"
      class="mb-5"
      :disabled="!editable"
      label="Lương cơ bản (1 giờ)"
    />
    <vs-input
      v-model="salarySettings.conveyance"
      type="number"
      class="mb-5"
      :disabled="!editable"
      label="Trợ cấp đi lại"
    />
    <vs-input
      v-model="salarySettings.media_allowance"
      type="number"
      class="mb-5"
      :disabled="!editable"
      label="Trợ cấp y tế"
    />
    <vs-input
      v-model="salarySettings.allowance"
      type="number"
      class="mb-5"
      :disabled="!editable"
      label="Trợ cấp khác"
    />
    <vs-input
      v-model="salarySettings.paid_time_off"
      type="number"
      class="mb-5"
      :disabled="!editable"
      label="Số giờ nghỉ phép được tính lương"
    />

    <template v-if="editable">
      <div class="flex items-center justify-end">
        <vs-button @click="cancelChanges" type="transparent">Huỷ</vs-button>
        <vs-button @click="saveChanges" :loading="uploading">
          Lưu cài đặt
        </vs-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import PayrollServices from '~/services/payroll-services'
import { ElMessage } from 'element-plus'
import { getResponseError } from '~/composables'

type PayrollSetting = {
  base_salary: number
  conveyance: number
  media_allowance: number
  allowance: number
  paid_time_off: number
}

const employee = inject<{ employee_id: string }>('employee-detail')

if (!employee) {
  throw new Error(
    'components[employee-payroll]: need to inject the employee_id, got undefined'
  )
}

const editable = ref<boolean>(false)
const uploading = ref<boolean>(false)

const salarySettings = reactive<PayrollSetting>({
  base_salary: 0,
  conveyance: 0,
  media_allowance: 0,
  allowance: 0,
  paid_time_off: 0,
})

onMounted(() => {
  refetch(() => ({
    user_id: employee?.employee_id,
  }))
})

const { result, refetch } = useQuery<{
  payroll: PayrollSetting
}>(
  gql`
    query PayrollQuery($user_id: String!) {
      payroll(user_id: $user_id) {
        base_salary
        conveyance
        media_allowance
        allowance
        paid_time_off
      }
    }
  `,
  () => ({
    user_id: employee?.employee_id,
  })
)

const saveChanges = async () => {
  uploading.value = true
  try {
    for (const key in salarySettings) {
      // @ts-ignore pair to Number
      salarySettings[key] = Number(salarySettings[key])
    }
    const response = await PayrollServices.savePayrollSetting({
      ...salarySettings,
      user_id: employee?.employee_id,
    })
    ElMessage({
      message: response.message || 'Success',
      type: 'success',
      duration: 3000,
    })
    await refetch({
      user_id: employee?.employee_id,
    })
    resetSalarySetting()
  } catch (e) {
    const error = getResponseError(e)
    ElMessage({
      message:
        error.message ||
        'Cài đặt bảng lương không thành công, liên hệ bộ phận kĩ thuật!',
      type: 'error',
      duration: 3000,
    })
  }
  uploading.value = false
}

const cancelChanges = () => {
  editable.value = false
  resetSalarySetting()
}

const resetSalarySetting = async () => {
  if (!result.value?.payroll) return

  salarySettings.base_salary = result.value.payroll.base_salary
  salarySettings.conveyance = result.value.payroll.conveyance
  salarySettings.allowance = result.value.payroll.allowance
  salarySettings.media_allowance = result.value.payroll.media_allowance
  salarySettings.paid_time_off = result.value.payroll.paid_time_off
}

watch(result, () => {
  resetSalarySetting()
})

watch(salarySettings, (val) => {
  editable.value = Object.keys(salarySettings).some((key: unknown) => {
    if (key === '__typename') return false
    let _key = key as unknown as keyof PayrollSetting
    // if (isNil(result.value?.payroll?.[_key]) || isNil(val[_key])) return false
    return Number(result.value?.payroll?.[_key]) != Number(val[_key])
  })
})
</script>

<style scoped></style>
