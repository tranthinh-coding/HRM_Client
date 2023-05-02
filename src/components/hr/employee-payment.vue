<template>
  <div class="flex items-center justify-between mb-10 w-full">
    <h1 class="text-lg">Thông tin thanh toán</h1>
    <vs-tooltip>
      <template #content>Chỉnh sửa</template>
      <vs-button
        icon
        color="dribbble"
        type="transparent"
        @click="toggleEditable"
      >
        <el-icon size="18">
          <edit />
        </el-icon>
      </vs-button>
    </vs-tooltip>
  </div>

  <vs-input
    :disabled="!editable"
    v-model="bankForm.bank_name"
    class="mb-5"
    label="Tên ngân hàng"
  />

  <vs-input
    :disabled="!editable"
    v-model="bankForm.bank_user_name"
    class="mb-5"
    label="Tên chủ thẻ"
  />

  <vs-input
    :disabled="!editable"
    v-model="bankForm.bank_account_number"
    class="mb-5"
    label="Số tài khoản"
  />

  <vs-input
    :disabled="!editable"
    v-model="bankForm.bank_branch"
    class="mb-2"
    label="Chi nhánh"
  />

  <div class="flex items-center justify-end gap-4" v-if="editable">
    <vs-button @click="cancelChanges" type="transparent" color="danger">
      Huỷ
    </vs-button>
    <vs-button @click="saveChanges" :loading="uploading" :disabled="!changed">
      Lưu
    </vs-button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { isNil } from 'lodash-unified'
import PayrollServices from '~/services/payroll-services'
import { ElMessage } from 'element-plus'
import { getResponseError } from '~/composables'

type BankAccount = {
  bank_name: string
  bank_branch: string
  bank_account_number: string
  bank_user_name: string
}
const props = defineProps<{
  id: string
}>()

const editable = ref(false)
const changed = ref<boolean>(false)
const uploading = ref<boolean>(false)

const bankForm = reactive<BankAccount>({
  bank_account_number: '',
  bank_branch: '',
  bank_name: '',
  bank_user_name: '',
})

const { result, refetch } = useQuery<{
  payment: BankAccount
}>(
  gql`
    query PaymentQuery($user_id: String!) {
      payment(user_id: $user_id) {
        bank_account_number
        bank_branch
        bank_name
        bank_user_name
      }
    }
  `,
  () => ({
    user_id: props?.id,
  })
)

const saveChanges = async () => {
  uploading.value = true
  try {
    const response = await PayrollServices.saveEmployeePayment({
      ...bankForm,
      user_id: props?.id,
    })
    await refetch(() => ({
      user_id: props?.id,
    }))
    ElMessage({
      message: response.message || 'Cập nhật thông tin tài khoản thành công',
      type: 'success',
      duration: 3000,
    })
  } catch (e) {
    const error = getResponseError(e)
    ElMessage({
      message:
        error.message ||
        'Cập nhật thông tin tài khoản ngân hàng không thành công, liên hệ bộ phận kĩ thuật!',
      type: 'error',
      duration: 3000,
    })
  }
  uploading.value = false
}

const toggleEditable = () => {
  if (editable.value) {
    return cancelChanges()
  }
  editable.value = true
}

const cancelChanges = () => {
  editable.value = false
  resetBankForm()
}

const resetBankForm = () => {
  bankForm.bank_name = result.value?.payment?.bank_name || ''
  bankForm.bank_branch = result.value?.payment?.bank_branch || ''
  bankForm.bank_user_name = result.value?.payment?.bank_user_name || ''
  bankForm.bank_account_number =
    result.value?.payment?.bank_account_number || ''
}

watch(result, () => {
  resetBankForm()
})

watch(bankForm, (val) => {
  changed.value = Object.keys(bankForm).some((key: unknown) => {
    if (key === '__typename') return false
    let _key = key as unknown as keyof BankAccount
    if (
      (isNil(result.value?.payment?.[_key]) && val[_key] == '') ||
      (isNil(val[_key]) && result.value?.payment?.[_key] == '')
    )
      return false
    return result.value?.payment?.[_key] !== val[_key]
  })
})

onBeforeMount(() => {
  refetch(() => ({
    user_id: props?.id,
  }))
})
</script>

<style>
.vs-input__label {
  font-size: unset;
}
</style>
