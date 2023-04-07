<template>
  <div class="p-6 rounded-2xl boxes">
    <el-statistic :value="timeoffs.length">
      <template #title>
        <div class="flex items-center">Nhân viên xin nghỉ hôm nay</div>
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
import HrEmployeeTimekeeping from '~/components/hr/hr-employee-timekeeping.vue'
import EmployeeTimeoff from '~/components/employee/employee-timeoff.vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import dayjs from 'dayjs'
import { computed, onBeforeMount } from 'vue'
import { Timeoff } from '~/types'

const { result, refetch } = useQuery<{
  timeoffs: Timeoff[]
}>(
  gql`
    query EmployeeTimeoff($day_request: String) {
      timeoffs(day_request: $day_request) {
        id
        day_request
        time_from
        time_to
        reason
        type_timeoff
        status
      }
    }
  `,
  () => ({
    day_request: dayjs().format('YYYY-MM-DD'),
  })
)

const timeoffs = computed(() => result.value?.timeoffs || [])

onBeforeMount(() => {
  refetch()
})
</script>

<style scoped lang="scss">
.boxes {
  background-color: getColor(bg-color);
}
</style>
