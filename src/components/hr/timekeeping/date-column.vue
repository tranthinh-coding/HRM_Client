<template>
  <div
    v-if="!timekeeping"
    class="w-full h-full flex items-center justify-center"
  >
    <untimed-button
      :employee="employee"
      :date="date"
      @open-timekeeping-form="openTimekeepingForm"
    />
  </div>
  <template v-else>
    <div
      v-if="isArray(timekeeping)"
      class="cursor-pointer h-full p-14px"
      @click="openListTimekeeping"
    >
      {{ timekeeping.length }} Ca
    </div>
    <timekeeping-button
      v-else
      :employee="employee"
      :date="date"
      :timekeeping="timekeeping"
      @open-timekeeping-form="openTimekeepingForm"
      @open-edit-form="onOpenEditForm"
    />
  </template>
  <timeoff-info-off-date-column :employee="employee" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { isArray } from 'lodash-unified'
import TimekeepingButton from './timekeeping-button.vue'
import UntimedButton from './untimed-button.vue'
import TimeoffInfoOffDateColumn from './timeoff-info-off-date-column.vue'

import type { Dayjs } from 'dayjs'
import type { Employee, Timekeeping, EmployeeTimekeepings } from '~/types'

const props = defineProps<{
  employee: Employee
  date: Dayjs
  timekeeping?: EmployeeTimekeepings
}>()

const emit = defineEmits<{
  (event: 'openTimekeepingForm', employee: Employee, date: Dayjs): void
  (event: 'openEditForm', timekeeping: Timekeeping): void
  (event: 'openListTimekeeping', employee: Employee, date: Dayjs): void
}>()

const openTimekeepingForm = () => {
  emit('openTimekeepingForm', props.employee, props.date)
}
const openListTimekeeping = () => {
  emit('openListTimekeeping', props.employee, props.date)
}

const onOpenEditForm = (timekeeping: Timekeeping) => {
  emit('openEditForm', timekeeping)
}

const dateString = computed(() => dayjs(props.date).format('YYYY-MM-DD'))

const timekeeping = computed(() => props.timekeeping?.[dateString.value])
</script>

<style scoped></style>
