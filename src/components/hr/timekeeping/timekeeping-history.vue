<template>
  <div class="p1">
    <h4 class="p3 text-lg">Lịch sử thao tác</h4>

    <el-table :data="histories" max-height="200">
      <el-table-column prop="time_from" label="Từ" min-width="100px" />
      <el-table-column prop="time_to" label="Đến" min-width="100px" />
      <el-table-column
        prop="type_of_time"
        label="Loại giờ làm"
        min-width="150px"
      />
      <el-table-column
        prop="coefficient"
        label="Hệ số lương"
        min-width="110px"
      />
      <el-table-column prop="user.name" label="Người tạo" min-width="100px" />
      <el-table-column prop="message" label="Lời nhắn" min-width="150px" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEmployeeTimekeepingStore } from '~/store'
import { Timekeeping } from '~/types'

const props = defineProps<{
  timekeeping: Timekeeping
}>()

const timekeepingStore = useEmployeeTimekeepingStore()

const histories = computed(() =>
  timekeepingStore.timekeepingHistories(props.timekeeping.id)
)
</script>

<style scoped></style>
