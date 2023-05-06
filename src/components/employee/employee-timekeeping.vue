<template>
  <div>
    <div class="w-full flex justify-start gap-3 my-4">
      <el-config-provider :locale="viVN">
        <el-date-picker
          v-model="date"
          type="week"
          format="[Tuần] ww"
          placeholder="Chọn tuần"
          value-format="YYYY-MM-DD"
          class="max-w-[200px]"
          :clearable="false"
        />
      </el-config-provider>
      <vs-button type="flat" @click="jumpToCurrentWeek"> Tuần này </vs-button>
    </div>
    <el-table :data="employees" table-layout="fixed" :cell-style="cellStyle">
      <el-table-column
        min-width="150"
        align="center"
        class-name="bg-gray-3 bg-opacity-11"
      >
        <template #header>
          <header-column :date="dayjs(date)" weekday="CN" />
        </template>
        <template #default="{ row }: { row: Employee }">
          <date-column
            :date="dayjs(date)"
            :employee="row"
            :timekeeping="timekeepings[row.employee_id]"
            @open-list-timekeeping="openListTimekeeping"
            @see-detail="seeDetail"
          />
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        :class-name="tableColumnClassName"
      >
        <template #header>
          <header-column :date="dayjs(date).add(1, 'day')" weekday="T2" />
        </template>
        <template #default="{ row }: { row: Employee }">
          <date-column
            :date="dayjs(date).add(1, 'day')"
            :employee="row"
            :timekeeping="timekeepings[row.employee_id]"
            @open-list-timekeeping="openListTimekeeping"
            @see-detail="seeDetail"
          />
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        :class-name="tableColumnClassName"
      >
        <template #header>
          <header-column :date="dayjs(date).add(2, 'days')" weekday="T3" />
        </template>
        <template #default="{ row }: { row: Employee }">
          <date-column
            :date="dayjs(date).add(2, 'days')"
            :employee="row"
            :timekeeping="timekeepings[row.employee_id]"
            @open-list-timekeeping="openListTimekeeping"
            @see-detail="seeDetail"
          />
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        :class-name="tableColumnClassName"
      >
        <template #header>
          <header-column :date="dayjs(date).add(3, 'days')" weekday="T4" />
        </template>
        <template #default="{ row }: { row: Employee }">
          <date-column
            :date="dayjs(date).add(3, 'day')"
            :employee="row"
            :timekeeping="timekeepings[row.employee_id]"
            @open-list-timekeeping="openListTimekeeping"
            @see-detail="seeDetail"
          />
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        :class-name="tableColumnClassName"
      >
        <template #header>
          <header-column :date="dayjs(date).add(4, 'days')" weekday="T5" />
        </template>
        <template #default="{ row }: { row: Employee }">
          <date-column
            :date="dayjs(date).add(4, 'day')"
            :employee="row"
            :timekeeping="timekeepings[row.employee_id]"
            @open-list-timekeeping="openListTimekeeping"
            @see-detail="seeDetail"
          />
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        :class-name="tableColumnClassName"
      >
        <template #header>
          <header-column :date="dayjs(date).add(5, 'days')" weekday="T6" />
        </template>
        <template #default="{ row }: { row: Employee }">
          <date-column
            :date="dayjs(date).add(5, 'day')"
            :employee="row"
            :timekeeping="timekeepings[row.employee_id]"
            @open-list-timekeeping="openListTimekeeping"
            @see-detail="seeDetail"
          />
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        :class-name="tableColumnClassName"
      >
        <template #header>
          <header-column :date="dayjs(date).add(6, 'days')" weekday="T7" />
        </template>
        <template #default="{ row }: { row: Employee }">
          <date-column
            :date="dayjs(date).add(6, 'day')"
            :employee="row"
            :timekeeping="timekeepings[row.employee_id]"
            @open-list-timekeeping="openListTimekeeping"
            @see-detail="seeDetail"
          />
        </template>
      </el-table-column>
    </el-table>

    <vs-dialog v-model="isOpenListTimekeeping" not-close>
      <template #header>
        <h3 class="text-lg">Danh sách các ca làm việc</h3>
      </template>
      <el-row :gutter="20">
        <el-col
          v-for="(timekeeping, index) in listTimekeepingOfEmployee"
          :key="index"
          :xs="24"
          :sm="12"
        >
          <timekeeping-button
            :timekeeping="timekeeping"
            :employee="currentEmployeeOpenListTimekeeping!"
            :date="dayjs(openDate)"
            @see-detail="seeDetail"
          />
        </el-col>
      </el-row>
    </vs-dialog>

    <vs-dialog v-model="isOpenDetailTimekeeping">
      <timekeeping-history :timekeeping="timekeeping" />
    </vs-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs, { Dayjs } from 'dayjs'
import { castArray } from 'lodash-unified'
// @ts-ignore
import viVN from 'element-plus/dist/locale/vi.min.js'

import { useEmployeeTimekeepingStore, useUserStore } from '~/store'
import { useEmployeeDetail } from '~/store/employee-detail'
import { isCurrentDate } from '~/utils'

import DateColumn from '~/components/hr/timekeeping/date-column.vue'
import TimekeepingButton from '~/components/hr/timekeeping/timekeeping-button.vue'
import TimekeepingHistory from '~/components/hr/timekeeping/timekeeping-history.vue'

import type { Employee, Timekeeping } from '~/types'

const user = useUserStore()

const employeeDetailStore = useEmployeeDetail()
const { employee } = storeToRefs(employeeDetailStore)

const timekeepingStore = useEmployeeTimekeepingStore()
const { timekeepings } = storeToRefs(timekeepingStore)

const employees = computed(() => (employee.value ? [employee.value] : []))

/**
 * The last date of the prev week - the first day of the current week
 *
 * Format (YYYY-MM-DD)
 * */
const date = ref(dayjs().endOf('w').add(-6, 'day').format('YYYY-MM-DD'))
/**
 * current date opening in timekeeping form
 *
 * Dayjs Format (YYYY-MM-DD)
 * */
const openDate = ref(dayjs().format('YYYY-MM-DD'))

/** List Open */
const isOpenListTimekeeping = ref<boolean>(false)
const currentEmployeeOpenListTimekeeping = ref<Employee | null>(null)

const openListTimekeeping = (employee: Employee, date: Dayjs) => {
  currentEmployeeOpenListTimekeeping.value = employee
  const stringDate = dayjs(date).format('YYYY-MM-DD')
  openDate.value = stringDate
  isOpenListTimekeeping.value = true
}

const isOpenDetailTimekeeping = ref(false)
const timekeeping = ref()

const seeDetail = (_timekeeping: Timekeeping) => {
  isOpenDetailTimekeeping.value = true

  timekeeping.value = _timekeeping
}

const listTimekeepingOfEmployee = computed<Timekeeping[]>(
  () =>
    castArray(
      timekeepings.value[
        currentEmployeeOpenListTimekeeping.value?.employee_id!
      ][openDate.value]
    ) || []
)

/** Column's Classes */
const tableColumnClassName = computed(() =>
  isCurrentDate(date.value) ? 'bg-gray-3 bg-opacity-10' : ''
)

const cellStyle = ({ columnIndex }: { columnIndex: number }) => {
  if (columnIndex > 0)
    return {
      'border-left': `var(--el-table-border)`,
    }
}

const jumpToCurrentWeek = () => {
  date.value = dayjs().endOf('w').add(-6, 'day').format('YYYY-MM-DD')
}

watch(date, (val) => {
  timekeepingStore.refetch(
    { date: val },
    {
      from: val,
      to: dayjs(val).add(6, 'days').format('YYYY-MM-DD'),
      user_id: user.user?.user_id,
    }
  )
})
</script>
