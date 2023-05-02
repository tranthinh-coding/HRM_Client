<template>
  <div class="p-6 rounded-2xl box">
    <el-statistic :value="currDateTimeoffs.length">
      <template #title>
        <div class="flex items-center">Số yêu cầu nghỉ hôm nay</div>
      </template>
    </el-statistic>

    <div class="mt-5">
      <el-tabs>
        <el-tab-pane label="Thông tin chấm công" value="1">
          <hr-employee-timekeeping />
        </el-tab-pane>
        <el-tab-pane label="Thông tin nghỉ phép" value="2">
          <employee-timeoff />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useEmployeeTimeoffStore } from '~/store'

import HrEmployeeTimekeeping from '~/components/hr/timekeeping/hr-employee-timekeeping.vue'
import EmployeeTimeoff from '~/components/employee/employee-timeoff.vue'
import { storeToRefs } from 'pinia'

const timeoffStore = useEmployeeTimeoffStore()
const { timeoffsArray } = storeToRefs(timeoffStore)

const currDateTimeoffs = computed(() =>
  timeoffsArray.value.filter(
    (e) => e.day_request === dayjs().format('YYYY-MM-DD')
  )
)
</script>

<style scoped lang="scss">
.boxes {
  background-color: getColor(bg-color);
}
</style>
