<template>
  <div>{{ timeoffs.value?.[employee.employee_id] }}</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEmployeeTimeoffStore } from '~/store'
import type { Employee } from '~/types'

defineProps<{
  employee: Employee
}>()

const employeeTimeoffStore = useEmployeeTimeoffStore()
const { timeoffs } = storeToRefs(employeeTimeoffStore)
</script>
