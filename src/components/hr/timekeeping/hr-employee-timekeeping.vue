<template>
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
  <el-table :data="employees" table-layout="fixed" border>
    <el-table-column align="center" min-width="150" fixed="left">
      <template #default="{ row }: { row: Employee }">
        <vs-tooltip>
          <template #content>
            <div class="flex flex-col items-start gap-1">
              <div class="flex gap-2 items-center">
                <el-icon size="18"><building-outline /></el-icon>
                {{ row.department }}
              </div>
              <div class="flex gap-2 items-center">
                <el-icon size="18"><email /></el-icon>
                {{ row.email }}
              </div>
              <div class="flex gap-2 items-center">
                <el-icon size="18"><people /></el-icon>
                {{ row.employee_id }}
              </div>
              <div class="flex gap-2 items-center">
                <el-icon size="18"><user-octagon-outline /></el-icon>
                {{ row.position }}
              </div>
            </div>
          </template>
          <div class="flex items-center gap-2">
            <vs-avatar>
              {{ row.name }}
            </vs-avatar>
            <span class="whitespace-nowrap">{{ row.name }}</span>
          </div>
        </vs-tooltip>
      </template>
    </el-table-column>

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
          @open-timekeeping-form="openTimekeepingForm"
          @open-list-timekeeping="openListTimekeeping"
          @open-edit-form="onOpenEditForm"
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
          @open-timekeeping-form="openTimekeepingForm"
          @open-list-timekeeping="openListTimekeeping"
          @open-edit-form="onOpenEditForm"
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
          @open-timekeeping-form="openTimekeepingForm"
          @open-list-timekeeping="openListTimekeeping"
          @open-edit-form="onOpenEditForm"
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
          @open-timekeeping-form="openTimekeepingForm"
          @open-list-timekeeping="openListTimekeeping"
          @open-edit-form="onOpenEditForm"
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
          @open-timekeeping-form="openTimekeepingForm"
          @open-list-timekeeping="openListTimekeeping"
          @open-edit-form="onOpenEditForm"
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
          @open-timekeeping-form="openTimekeepingForm"
          @open-list-timekeeping="openListTimekeeping"
          @open-edit-form="onOpenEditForm"
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
          @open-timekeeping-form="openTimekeepingForm"
          @open-list-timekeeping="openListTimekeeping"
          @open-edit-form="onOpenEditForm"
        />
      </template>
    </el-table-column>
  </el-table>

  <vs-dialog v-model="isCreateTimekeeping" scroll>
    <template #header>
      <h2 class="text-lg">
        {{ tempEmployeeOpened?.name }}: Ngày
        {{ openDate }}
      </h2>
      <timeoff-info-off-date-column
        :date="dayjs(openDate)"
        :eid="tempEmployeeOpened?.employee_id"
      />
    </template>

    <div class="flex flex-col gap-4">
      <vs-input
        disabled
        label="ID"
        :model-value="tempEmployeeOpened?.employee_id"
      />

      <div>
        <p
          class="flex items-center gap-2 ml-2"
          v-if="tempTimekeepingTime?.time_from && tempTimekeepingTime?.time_to"
        >
          {{
            diffTime(
              tempTimekeepingTime.time_from,
              tempTimekeepingTime.time_to
            ) - employeeTimeoffsBreaktime
          }}
          tiếng
        </p>

        <div class="flex items-center gap-1 justify-start">
          <vs-time-select
            :model-value="tempTimekeepingTime?.time_from"
            @update:model-value="(e: any) => updateTempTimekeeping('time_from', e)"
            :max-time="tempTimekeepingTime?.time_to"
            placeholder="Start time"
            :start="TIME_START"
            :step="TIME_STEP"
            :end="TIME_END"
            :clearable="false"
            :disabled-items="employeeTimeoffsDisabled"
          />
          -
          <vs-time-select
            :model-value="tempTimekeepingTime?.time_to"
            :min-time="tempTimekeepingTime?.time_from"
            @update:model-value="(e: any) => updateTempTimekeeping('time_to', e)"
            placeholder="End time"
            :start="TIME_START"
            :step="TIME_STEP"
            :end="TIME_END"
            :clearable="false"
            :disabled-items="employeeTimeoffsDisabled"
          />
        </div>
      </div>
      <vs-select
        :model-value="`${tempTimekeepingTime?.type_of_time} - ${tempTimekeepingTime?.coefficient}`"
        @change="changeEmployeeTypeOfTime"
        label="Ca làm việc"
      >
        <vs-option
          v-for="(h, index) in hourlyWageCoefficients"
          :key="index"
          :value="h"
          :label="h.type_of_time"
        >
          <div class="flex justify-between w-full items-center">
            <p class="text-sm">{{ h.type_of_time }}</p>
            <p>
              <span class="text-xs">HS lương</span>
              {{ h.coefficient }}
            </p>
          </div>
        </vs-option>
      </vs-select>
    </div>

    <template #footer>
      <div class="flex w-full justify-end items-center gap-2">
        <vs-button @click="acceptCreate" type="transparent">
          Xác nhận
        </vs-button>
        <vs-button
          @click="clearTempCreate"
          type="transparent"
          color="google-plus"
        >
          Huỷ
        </vs-button>
      </div>
    </template>
  </vs-dialog>

  <vs-dialog v-model="isEditTimekeeping" scroll>
    <template #header>
      <h2 class="text-lg">Chỉnh sửa thông tin</h2>
      <timeoff-info-off-date-column
        :date="dayjs(tempTimekeepingEdit!.date)"
        :eid="tempTimekeepingEdit!.user_id"
      />
    </template>

    <div class="flex flex-col gap-4">
      <vs-input
        disabled
        label="ID"
        :model-value="tempTimekeepingEdit?.user_id"
      />

      <div>
        <p
          class="flex items-center gap-2 ml-2"
          v-if="tempTimekeepingEdit?.time_from && tempTimekeepingEdit?.time_to"
        >
          {{
            diffTime(
              tempTimekeepingEdit.time_from,
              tempTimekeepingEdit.time_to
            ) - employeeTimeoffsBreaktime
          }}
          tiếng
        </p>

        <div class="flex items-center gap-1 justify-start">
          <vs-time-select
            :model-value="tempTimekeepingEdit?.time_from"
            @update:model-value="
              (e: any) => updateTempEditTimekeeping('time_from', e)
            "
            :max-time="tempTimekeepingEdit?.time_to"
            placeholder="Start time"
            :start="TIME_START"
            :step="TIME_STEP"
            :end="TIME_END"
            :clearable="false"
            :disabled-items="employeeTimeoffsDisabled"
          />
          -
          <vs-time-select
            :model-value="tempTimekeepingEdit?.time_to"
            :min-time="tempTimekeepingEdit?.time_from"
            @update:model-value="(e: any) => updateTempEditTimekeeping('time_to', e)"
            placeholder="End time"
            :start="TIME_START"
            :step="TIME_STEP"
            :end="TIME_END"
            :clearable="false"
            :disabled-items="employeeTimeoffsDisabled"
          />
        </div>
      </div>
      <vs-select
        @change="changeEmployeeEditTypeOfTime"
        :model-value="`${tempTimekeepingEdit?.type_of_time} - ${tempTimekeepingEdit?.coefficient}`"
        label="Ca làm việc"
      >
        <vs-option
          v-for="(h, index) in hourlyWageCoefficients"
          :key="index"
          :value="h"
          :label="h.type_of_time"
        >
          <div class="flex justify-between w-full items-center">
            <p class="text-sm">{{ h.type_of_time }}</p>
            <p>
              <span class="text-xs">HS lương</span>
              {{ h.coefficient }}
            </p>
          </div>
        </vs-option>
      </vs-select>
    </div>

    <timekeeping-history :timekeeping="tempTimekeepingEdit!" />

    <template #footer>
      <div class="flex w-full justify-end items-center gap-2">
        <vs-button @click="acceptEdit" type="transparent"> Xác nhận </vs-button>
        <vs-button @click="clearEdit" type="transparent" color="google-plus">
          Huỷ
        </vs-button>
      </div>
    </template>
  </vs-dialog>

  <vs-dialog v-model="isOpenListTimekeeping" not-close>
    <template #header>
      <h3 class="text-lg">
        Danh sách ca làm việc của
        {{ currentEmployeeOpenListTimekeeping?.name }} -
        {{ currentEmployeeOpenListTimekeeping?.employee_id }}
      </h3>
    </template>
    <el-row :gutter="20">
      <el-col
        v-for="(timekeeping, index) in listTimekeepingOfEmployee"
        :key="index"
        :xs="24"
        :sm="12"
        class="mb-16px"
      >
        <timekeeping-button
          :timekeeping="timekeeping"
          :is-nested="true"
          :employee="currentEmployeeOpenListTimekeeping!"
          :date="dayjs(openDate)"
          @open-edit-form="onOpenEditForm"
        />
      </el-col>
      <el-col :xs="24" :sm="12">
        <untimed-button
          :employee="currentEmployeeOpenListTimekeeping!"
          :date="dayjs(openDate)"
          @open-timekeeping-form="openTimekeepingForm"
          class="!w-full"
        >
          <el-icon size="32">
            <finger-scan />
          </el-icon>
        </untimed-button>
      </el-col>
    </el-row>
  </vs-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs, { Dayjs } from 'dayjs'
import { castArray } from 'lodash-unified'
import { notification } from 'vuesax-old'
// @ts-ignore
import viVN from 'element-plus/dist/locale/vi.min.js'

import {
  useHourlyWageCoefficientsStore,
  useEmployeeTimekeepingStore,
  useEmployeesStore,
  useEmployeeTimeoffStore,
} from '~/store'
import { getResponseError } from '~/composables'
import { diffTime, isCurrentDate } from '~/utils'
import EmployeeTimekeepingServices from '~/services/employee-timekeeping-services'
import { compareTime, nextTime } from './time'
// import { createReusableTemplate } from 'vue-reuse-template'
import TimekeepingHistory from '~/components/timekeeping-history.vue'
import DateColumn from './date-column.vue'
import HeaderColumn from './header-column.vue'
import TimekeepingButton from './timekeeping-button.vue'
import UntimedButton from './untimed-button.vue'
import TimeoffInfoOffDateColumn from './timeoff-info-off-date-column.vue'

import type {
  Employee,
  HourlyWageCoefficient,
  Timekeeping,
  Timeoff,
} from '~/types'

// const [DefineTableColumn, ReuseTableColumn] = createReusableTemplate<{
//   date: Dayjs
//   weekday: string
// }>()

const TIME_STEP = '00:30'
const TIME_START = '00:00'
const TIME_END = '23:30'
const TIME_FORMAT = 'HH:mm'

const { hourlyWageCoefficients } = storeToRefs(useHourlyWageCoefficientsStore())

const employeeTimeoffStore = useEmployeeTimeoffStore()

const employeeTimeoffsBreaktime = computed(() => {
  const timeFrom = isEditTimekeeping.value
    ? tempTimekeepingEdit.value?.time_from
    : isCreateTimekeeping.value
    ? tempTimekeepingTime.value?.time_from
    : undefined
  const timeTo = isEditTimekeeping.value
    ? tempTimekeepingEdit.value?.time_to
    : isCreateTimekeeping.value
    ? tempTimekeepingTime.value?.time_to
    : undefined
  const eid = isEditTimekeeping.value
    ? tempTimekeepingEdit.value?.user_id
    : isCreateTimekeeping.value
    ? tempEmployeeOpened.value?.employee_id
    : undefined

  const timeoffsResolvedOffOpenedDate = employeeTimeoffStore.timeoffsResolved(
    eid,
    openDate.value
  )
  const totalTime = timeoffsResolvedOffOpenedDate.reduce(
    (prev: number, curr: Timeoff) => {
      if (timeFrom && timeTo) {
        if (
          compareTime(timeFrom, curr.time_from) <= 0 &&
          compareTime(curr.time_to, timeTo) <= 0
        ) {
          prev += diffTime(curr.time_from, curr.time_to)
        }
      }
      return prev
    },
    0
  )
  return totalTime
})
const employeeTimeoffsDisabled = computed(() => {
  const timeoffsResolvedOffOpenedDate = employeeTimeoffStore.timeoffsResolved(
    tempEmployeeOpened.value?.employee_id || tempTimekeepingEdit.value?.user_id,
    openDate.value
  )

  return timeoffsResolvedOffOpenedDate.reduce<string[]>(
    (prev: string[], curr: Timeoff) => {
      const result = [...prev]

      let current = curr.time_from
      let currentTime: string

      while (
        current &&
        curr.time_to &&
        compareTime(current, curr.time_to) <= 0
      ) {
        currentTime = dayjs(current, TIME_FORMAT).format(TIME_FORMAT)

        result.push(currentTime)
        current = nextTime(current, TIME_STEP)
      }

      result.pop()
      result.shift()
      return result
    },
    []
  )
})

const employeeTimekeepingStore = useEmployeeTimekeepingStore()
const { timekeepings } = storeToRefs(employeeTimekeepingStore)
const employeesStore = useEmployeesStore()
const { employees } = storeToRefs(employeesStore)

const defaultTimekeeping = (): Pick<
  Timekeeping,
  'time_from' | 'time_to' | 'type_of_time' | 'coefficient'
> => ({
  time_from: '09:00',
  time_to: '17:00',
  type_of_time: 'Hành chính',
  coefficient: 1,
})

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

const tempTimekeepingTime = ref<ReturnType<typeof defaultTimekeeping> | null>(
  null
)

const jumpToCurrentWeek = () => {
  date.value = dayjs().endOf('w').add(-6, 'day').format('YYYY-MM-DD')
}

/** Create Timekeeping */
const isCreateTimekeeping = ref<boolean>(false)
const tempEmployeeOpened = ref<Employee | null>(null)
const updateTempTimekeeping = (
  key: keyof ReturnType<typeof defaultTimekeeping>,
  val: unknown
) => {
  if (tempTimekeepingTime.value) tempTimekeepingTime.value[key] = val as never
}
const clearTempCreate = () => {
  isCreateTimekeeping.value = false

  tempEmployeeOpened.value = null
  tempTimekeepingTime.value = null
}
const acceptCreate = async () => {
  // send request to server
  try {
    await EmployeeTimekeepingServices.createTimekeeping({
      user_id: tempEmployeeOpened.value!.employee_id,
      name: tempEmployeeOpened.value!.name,
      time_from: tempTimekeepingTime.value!.time_from,
      time_to: tempTimekeepingTime.value!.time_to,
      type_of_time: tempTimekeepingTime.value!.type_of_time,
      coefficient: tempTimekeepingTime.value!.coefficient,
      date: openDate.value,
    })

    employeeTimekeepingStore.refetch(
      { date, force: true },
      {
        from: date.value,
        to: dayjs(date.value).add(6, 'days').format('YYYY-MM-DD'),
      }
    )

    notification({
      title: 'Timekeeping',
      position: 'top-center',
      text: 'Create employee timekeeping successfully',
      border: 'success',
      duration: 3000,
    })
    clearTempCreate()
  } catch (error) {
    const e = getResponseError(error)
    notification({
      title: 'Timekeeping',
      position: 'top-center',
      text: e.message,
      border: 'error',
      duration: 0,
    })
  }
}
const openTimekeepingForm = (row: Employee, date: Dayjs) => {
  tempEmployeeOpened.value = row
  const stringDate = dayjs(date).format('YYYY-MM-DD')

  openDate.value = stringDate

  tempTimekeepingTime.value = defaultTimekeeping()

  isCreateTimekeeping.value = true
}
const changeEmployeeTypeOfTime = (typeOfTime: HourlyWageCoefficient) => {
  updateTempTimekeeping('type_of_time', typeOfTime.type_of_time)
  updateTempTimekeeping('coefficient', typeOfTime.coefficient)
}

/** Edit FORM */
const isEditTimekeeping = ref<boolean>(false)
const tempTimekeepingEdit = ref<Timekeeping | null>(null)

const onOpenEditForm = (timekeeping: Timekeeping) => {
  tempTimekeepingEdit.value = { ...timekeeping }
  isEditTimekeeping.value = true
}
const changeEmployeeEditTypeOfTime = (typeOfTime: HourlyWageCoefficient) => {
  updateTempEditTimekeeping('type_of_time', typeOfTime.type_of_time)
  updateTempEditTimekeeping('coefficient', typeOfTime.coefficient)
}
const updateTempEditTimekeeping = (
  key: keyof Timekeeping,
  val: string | number
) => {
  if (tempTimekeepingEdit.value) {
    tempTimekeepingEdit.value[key] = val as never
  }
}
const acceptEdit = async () => {
  // send request to the server
  try {
    if (!tempTimekeepingEdit.value) {
      throw new Error('Cannot update timekeeping of null')
    }
    await EmployeeTimekeepingServices.updateTimekeeping(
      tempTimekeepingEdit.value
    )
    employeeTimekeepingStore.refetch(
      { date, force: true },
      {
        from: date.value,
        to: dayjs(date.value).add(6, 'days').format('YYYY-MM-DD'),
      }
    )

    notification({
      title: 'Timekeeping',
      position: 'top-center',
      text: 'Update employee timekeeping successfully',
      border: 'success',
      duration: 3000,
    })
    clearEdit()
  } catch (error) {
    const e = getResponseError(error)
    notification({
      title: 'Timekeeping',
      position: 'top-center',
      text: e.message,
      border: 'error',
      duration: 0,
    })
  }
}
const clearEdit = () => {
  tempTimekeepingEdit.value = null
  isEditTimekeeping.value = false
}

/** List Open */
const isOpenListTimekeeping = ref<boolean>(false)
const currentEmployeeOpenListTimekeeping = ref<Employee | null>(null)

const listTimekeepingOfEmployee = computed<Timekeeping[]>(
  () =>
    castArray(
      timekeepings.value[
        currentEmployeeOpenListTimekeeping.value?.employee_id!
      ][openDate.value]
    ) || []
)
const openListTimekeeping = (employee: Employee, date: Dayjs) => {
  currentEmployeeOpenListTimekeeping.value = employee
  const stringDate = dayjs(date).format('YYYY-MM-DD')
  openDate.value = stringDate
  isOpenListTimekeeping.value = true
}
/** Column's Classes */
const tableColumnClassName = computed(() =>
  isCurrentDate(date.value) ? 'bg-gray-3 bg-opacity-10' : ''
)

watch(date, (val) => {
  employeeTimekeepingStore.refetch(
    { date: val },
    {
      from: val,
      to: dayjs(val).add(6, 'days').format('YYYY-MM-DD'),
    }
  )
})
</script>
