<template>
  <el-calendar v-model="calendar" ref="calendarInstance">
    <template #header="a">
      <div class="flex items-center">
        Tháng {{ new Date(a.date).getMonth() + 1 }},
        {{ new Date(a.date).getFullYear() }}
      </div>
      <div class="flex items-center justify-end gap-2">
        <vs-button
          type="flat"
          @click="calendarInstance?.selectDate('prev-month')"
        >
          Tháng trước
        </vs-button>
        <vs-button type="flat" @click="calendarInstance?.selectDate('today')">
          Hôm nay
        </vs-button>
      </div>
    </template>
    <template #date-cell="{ data }">
      <div class="flex justify-between">
        <div class="text-lg date" :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(2).join('-') }}
        </div>
        <p>8h</p>
      </div>
    </template>
  </el-calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CalendarInstance } from 'element-plus/es/components/calendar/src/instance'

const calendarInstance = ref<CalendarInstance | null>(null)
const calendar = ref(new Date())
</script>
