<template>
  <h1 class="text-xl mb-10">Thông tin thanh toán</h1>

  <vs-input class="mb-5" label="Tên ngân hàng" />

  <vs-input class="mb-5" label="Tên chủ thẻ" />

  <vs-input class="mb-5" label="Số tài khoản" />

  <vs-input class="mb-2" label="Chi nhánh" />

  <vs-button class="ml-auto">Lưu</vs-button>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { inject } from 'vue'

const employee = inject<{ employee_id: string }>('employee-detail')

// const { result } = useQuery(
//   gql`
//     query PaymentQuery($user_id: String!) {

//     }
//   `,
//   () => ({
//     user_id: employee?.employee_id,
//   })
// )
// result.value
</script>

<style>
.vs-input__label {
  font-size: unset;
}
</style>
