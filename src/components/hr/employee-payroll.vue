<template>
  <el-divider />
  <div class="mt-10">
    <div class="flex items-center justify-between mb-10 w-full">
      <h1 class="text-lg">Bảng lương</h1>
      <vs-tooltip v-if="isHR(user.user?.role)">
        <template #content>Chỉnh sửa</template>
        <vs-button
          @click="toggleEditable"
          icon
          color="dribbble"
          type="transparent"
        >
          <el-icon size="18">
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
    <!-- <vs-input
      v-model="salarySettings.paid_time_off"
      type="number"
      class="mb-5"
      :disabled="!editable"
      label="Số giờ nghỉ phép được tính lương"
    /> -->

    <template v-if="editable && isHR(user.user?.role)">
      <div class="flex items-center justify-end gap-2">
        <vs-button @click="cancelChanges" type="transparent">Huỷ</vs-button>
        <vs-button @click="saveChanges" :loading="uploading">
          Lưu cài đặt
        </vs-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import PayrollServices from '~/services/payroll-services'
import { ElMessage } from 'element-plus'
import { useUserStore } from '~/store'
import { isHR } from '~/config'

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

const user = useUserStore()

const editable = ref<boolean>(false)
const uploading = ref<boolean>(false)

const salarySettings = reactive<PayrollSetting>({
  base_salary: 0,
  conveyance: 0,
  media_allowance: 0,
  allowance: 0,
  paid_time_off: 0,
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
    user_id: props?.id,
  })
)

const toggleEditable = () => {
  if (editable.value) {
    return cancelChanges()
  }
  editable.value = true
}

const saveChanges = async () => {
  uploading.value = true
  try {
    for (const key in salarySettings) {
      // @ts-ignore pair to Number
      salarySettings[key] = Number(salarySettings[key])
    }
    const response = await PayrollServices.savePayrollSetting({
      ...salarySettings,
      user_id: props?.id,
    })
    await refetch(() => ({
      user_id: props?.id,
    }))
    ElMessage({
      message: response.message || 'Success',
      type: 'success',
      duration: 3000,
    })
  } catch (e) {
    ElMessage({
      message: 'Cài đặt bảng lương không thành công, liên hệ bộ phận kĩ thuật!',
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
