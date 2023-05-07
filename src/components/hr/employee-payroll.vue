<template>
  <el-divider />
  <div class="mt-10">
    <div class="flex items-center justify-between mb-10 w-full">
      <h1 class="text-lg">Thong so bảng lương</h1>
    </div>

    <vs-input
      :model-value="salarySettings.base_salary"
      type="number"
      class="mb-5"
      disabled
      label="Lương cơ bản (1 giờ)"
    />
    <vs-input
      :model-value="salarySettings.conveyance"
      type="number"
      class="mb-5"
      disabled
      label="Trợ cấp đi lại"
    />
    <vs-input
      :model-value="salarySettings.media_allowance"
      type="number"
      class="mb-5"
      disabled
      label="Trợ cấp y tế"
    />
    <vs-input
      :model-value="salarySettings.allowance"
      type="number"
      class="mb-5"
      disabled
      label="Trợ cấp khác"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

type PayrollSetting = {
  base_salary: number
  conveyance: number
  media_allowance: number
  allowance: number
  paid_time_off: number
}

const props = defineProps<{
  id: string
}>()

const salarySettings = reactive<PayrollSetting>({
  base_salary: 0,
  conveyance: 0,
  media_allowance: 0,
  allowance: 0,
  paid_time_off: 0,
})

const { result } = useQuery<{
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
    user_id: props?.id,
  })
)

const resetSalarySetting = async () => {
  salarySettings.base_salary = result.value?.payroll?.base_salary || 0
  salarySettings.conveyance = result.value?.payroll?.conveyance || 0
  salarySettings.allowance = result.value?.payroll?.allowance || 0
  salarySettings.media_allowance = result.value?.payroll?.media_allowance || 0
  salarySettings.paid_time_off = result.value?.payroll?.paid_time_off || 0
}

watch(result, () => {
  resetSalarySetting()
})
</script>

<style scoped></style>
