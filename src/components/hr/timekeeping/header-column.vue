<template>
  <vs-tooltip v-if="isCurrentDate(date)" type="shadow">
    <template #content>Ngày hôm nay</template>
    <el-icon color="rgb(257,76,137)"><star /></el-icon>
  </vs-tooltip>
  {{ weekday }} ({{ date.format('DD-MM') }})
</template>

<script setup lang="ts">
import { isCurrentDate } from '~/utils'
import type { Dayjs } from 'dayjs'

defineProps<{
  date: Dayjs
  weekday: string
}>()
</script>

<style scoped></style>
