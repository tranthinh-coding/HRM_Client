<template>
  <vs-tooltip>
    <template #content>Tạo ca làm việc</template>
    <button
      v-bind="$attrs"
      class="w-1/2 rounded-xl py-2 px-5 flex items-center justify-center border-dashed border-2"
      @click="openTimekeepingForm"
    >
      <slot>
        <el-icon size="14">
          <finger-scan />
        </el-icon>
      </slot>
    </button>
  </vs-tooltip>
</template>

<script lang="ts" setup>
import { Dayjs } from 'dayjs'
import { Employee } from '~/types'

const props = defineProps<{
  employee: Employee
  date: Dayjs
}>()

const emit = defineEmits<{
  (event: 'openTimekeepingForm', employee: Employee, date: Dayjs): void
}>()

const openTimekeepingForm = () => {
  emit('openTimekeepingForm', props.employee, props.date)
}
</script>
