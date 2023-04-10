<template>
  <div v-if="!shift" class="w-full h-full flex items-center justify-center">
    <untimed-button
      :employee="employee"
      :date="date"
      @open-timekeeping-form="openTimekeepingForm"
    />
  </div>
  <template v-else>
    <div
      v-if="isArray(shift)"
      class="cursor-pointer h-full p-14px"
      @click="openListTimekeeping"
    >
      {{ shift.length }} Ca
    </div>
    <shift-button
      v-else
      :employee="employee"
      :date="date"
      :shift="shift"
      @open-timekeeping-form="openTimekeepingForm"
      @open-edit-form="onOpenEditForm"
    />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { isArray } from 'lodash-unified'
import ShiftButton from './shift-button.vue'
import UntimedButton from './untimed-button.vue'

import type { Dayjs } from 'dayjs'
import type { Employee, Timekeeping, EmployeeTimekeepings } from '~/types'

const props = defineProps<{
  employee: Employee
  date: Dayjs
  shift?: EmployeeTimekeepings
}>()

const emit = defineEmits<{
  (event: 'openTimekeepingForm', employee: Employee, date: Dayjs): void
  (event: 'openEditForm', shift: Timekeeping): void
  (event: 'openListTimekeeping', employee: Employee, date: Dayjs): void
}>()

const openTimekeepingForm = () => {
  emit('openTimekeepingForm', props.employee, props.date)
}
const openListTimekeeping = () => {
  emit('openListTimekeeping', props.employee, props.date)
}

const onOpenEditForm = (shift: Timekeeping) => {
  emit('openEditForm', shift)
}

const dateString = computed(() => dayjs(props.date).format('YYYY-MM-DD'))

const shift = computed(() => props.shift?.[dateString.value])
</script>

<style scoped></style>
