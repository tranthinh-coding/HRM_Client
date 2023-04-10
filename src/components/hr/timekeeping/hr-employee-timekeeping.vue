<template>
  <div class="w-full flex justify-start gap-6 my-4">
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
    <vs-button type="transparent" @click="jumpToCurrentWeek">
      Tuần này
    </vs-button>
  </div>
  <div>
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
            :shift="employeesShift[row.employee_id]"
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
            :shift="employeesShift[row.employee_id]"
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
            :shift="employeesShift[row.employee_id]"
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
            :shift="employeesShift[row.employee_id]"
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
            :shift="employeesShift[row.employee_id]"
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
            :shift="employeesShift[row.employee_id]"
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
            :shift="employeesShift[row.employee_id]"
            @open-timekeeping-form="openTimekeepingForm"
            @open-list-timekeeping="openListTimekeeping"
            @open-edit-form="onOpenEditForm"
          />
        </template>
      </el-table-column>
    </el-table>

    <vs-dialog v-model="isCreateShift" prevent-close>
      <template #header>
        <h2 class="text-lg">
          {{ tempEmployeeOpened?.name }}: Ngày
          {{ openDate }}
        </h2>
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
            v-if="tempShiftTime?.time_from && tempShiftTime?.time_to"
          >
            {{ diffTime(tempShiftTime.time_from, tempShiftTime.time_to) }}
            tiếng
          </p>

          <div class="flex items-center gap-1 justify-start">
            <el-time-select
              :model-value="tempShiftTime?.time_from"
              @update:model-value="(e) => updateTempShift('time_from', e)"
              :max-time="tempShiftTime?.time_to"
              placeholder="Start time"
              start="00:00"
              step="00:30"
              end="23:30"
            />
            -
            <el-time-select
              :model-value="tempShiftTime?.time_to"
              :min-time="tempShiftTime?.time_from"
              @update:model-value="(e) => updateTempShift('time_to', e)"
              placeholder="End time"
              start="00:00"
              step="00:30"
              end="23:30"
            />
          </div>
        </div>
        <vs-select
          :model-value="`${tempShiftTime?.type_of_time} - ${tempShiftTime?.coefficient}`"
          @change="changeEmployeeTypeOfTime"
          label="Ca làm việc"
        >
          <vs-option
            v-for="(h, index) in hourlyWageCoefficients"
            :key="index"
            :value="h"
            :label="h.type_of_time"
          >
            <div class="flex justify-between w-full">
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

    <vs-dialog
      v-model="isEditShift"
      @vnode-unmounted="tempShiftEdit = null"
      scroll
    >
      <template #header>Chỉnh sửa thông tin</template>

      <div class="flex flex-col gap-4">
        <vs-input disabled label="ID" :model-value="tempShiftEdit?.user_id" />

        <div>
          <p
            class="flex items-center gap-2 ml-2"
            v-if="tempShiftEdit?.time_from && tempShiftEdit?.time_to"
          >
            {{ diffTime(tempShiftEdit.time_from, tempShiftEdit.time_to) }}
            tiếng
          </p>

          <div class="flex items-center gap-1 justify-start">
            <el-time-select
              :model-value="tempShiftEdit?.time_from"
              @update:model-value="(e) => updateTempEditShift('time_from', e)"
              :max-time="tempShiftEdit?.time_to"
              placeholder="Start time"
              start="00:00"
              step="00:30"
              end="23:30"
            />
            -
            <el-time-select
              :model-value="tempShiftEdit?.time_to"
              :min-time="tempShiftEdit?.time_from"
              @update:model-value="(e) => updateTempEditShift('time_to', e)"
              placeholder="End time"
              start="00:00"
              step="00:30"
              end="23:30"
            />
          </div>
        </div>
        <vs-select
          @change="changeEmployeeEditTypeOfTime"
          :model-value="`${tempShiftEdit?.type_of_time} - ${tempShiftEdit?.coefficient}`"
          label="Ca làm việc"
        >
          <vs-option
            v-for="(h, index) in hourlyWageCoefficients"
            :key="index"
            :value="h"
            :label="h.type_of_time"
          >
            <div class="flex justify-between w-full">
              <p class="text-sm">{{ h.type_of_time }}</p>
              <p>
                <span class="text-xs">HS lương</span>
                {{ h.coefficient }}
              </p>
            </div>
          </vs-option>
        </vs-select>
      </div>

      <shift-history :shift="tempShiftEdit!" />

      <template #footer>
        <div class="flex w-full justify-end items-center gap-2">
          <vs-button @click="acceptEdit" type="transparent">
            Xác nhận
          </vs-button>
          <vs-button @click="clearEdit" type="transparent" color="google-plus">
            Huỷ
          </vs-button>
        </div>
      </template>
    </vs-dialog>

    <vs-dialog v-model="isOpenListShift" not-close>
      <template #header>
        <h3 class="text-lg">
          Danh sách ca làm việc của
          {{ currentEmployeeOpenListTimekeeping?.name }} -
          {{ currentEmployeeOpenListTimekeeping?.employee_id }}
        </h3>
      </template>
      <el-row :gutter="20">
        <el-col
          v-for="(shift, index) in listTimekeepingOfEmployee"
          :key="index"
          :xs="24"
          :sm="12"
          class="mb-16px"
        >
          <shift-button
            :shift="shift"
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import dayjs, { Dayjs } from 'dayjs'
import { isArray, castArray, assign } from 'lodash-unified'
import { getResponseError } from '~/composables'
import { diffTime, isCurrentDate } from '~/utils'
import EmployeeShiftServices from '~/services/employee-shift-services'
import { useHourlyWageCoefficientsStore } from '~/store/hourlyWageCoefficients'
// @ts-ignore
import viVN from 'element-plus/dist/locale/vi.min.js'
import ShiftHistory from '~/components/shift-history.vue'
import DateColumn from './date-column.vue'
import HeaderColumn from './header-column.vue'
import ShiftButton from './shift-button.vue'
import UntimedButton from './untimed-button.vue'
import { notification } from 'vuesax-old'

import type {
  Employee,
  HourlyWageCoefficient,
  Timekeeping,
  EmployeeTimekeepings,
} from '~/types'

const { hourlyWageCoefficients } = storeToRefs(useHourlyWageCoefficientsStore())

const defaultShift = (): Pick<
  Timekeeping,
  'time_from' | 'time_to' | 'type_of_time' | 'coefficient'
> => ({
  time_from: '09:00',
  time_to: '17:00',
  type_of_time: 'Hành chính',
  coefficient: 1,
})

const { result } = useQuery<{
  employees: {
    data: Employee[]
  }
}>(
  gql`
    query ListOfTimekeepers {
      employees {
        data {
          name
          email
          position
          department
          employee_id
        }
      }
    }
  `
)

const date = ref(dayjs().endOf('w').add(-6, 'day').format('YYYY-MM-DD'))

/** Dayjs Format (YYYY-MM-DD) */
const openDate = ref(dayjs().format('YYYY-MM-DD'))

const tempShiftTime = ref<ReturnType<typeof defaultShift> | null>(null)

const employeesShift = ref<{
  [eid: string]: EmployeeTimekeepings
}>({})

const employees = computed(() => result.value?.employees.data || [])

const jumpToCurrentWeek = () => {
  date.value = dayjs().endOf('w').add(-6, 'day').format('YYYY-MM-DD')
}

/** Create Timekeeping */
const isCreateShift = ref<boolean>(false)
const tempEmployeeOpened = ref<Employee | null>(null)

const updateTempShift = (
  key: keyof ReturnType<typeof defaultShift>,
  val: unknown
) => {
  if (tempShiftTime.value) tempShiftTime.value[key] = val as never
}

const createEmployeeShift = async () => {
  const tempAttd: Omit<Timekeeping, 'id'> = {
    user_id: tempEmployeeOpened.value!.employee_id,
    name: tempEmployeeOpened.value!.name,
    time_from: tempShiftTime.value!.time_from,
    time_to: tempShiftTime.value!.time_to,
    type_of_time: tempShiftTime.value!.type_of_time,
    coefficient: tempShiftTime.value!.coefficient,
    date: openDate.value,
  }

  // send request to server
  try {
    const res = await EmployeeShiftServices.createShift(tempAttd)
    const employeeShiftsCached = employeesShift.value[res.user_id]

    const wasHadAShift = employeesShift.value[res.user_id]?.[openDate.value]

    let setOpenDateShift: any = res

    if (wasHadAShift) {
      if (isArray(wasHadAShift)) {
        setOpenDateShift = [...wasHadAShift, res]
      } else {
        setOpenDateShift = [wasHadAShift, res]
      }
    }

    employeesShift.value[res.user_id] = {
      ...employeeShiftsCached,
      [openDate.value]: setOpenDateShift,
    }
    notification({
      title: 'Timekeeping',
      position: 'top-center',
      text: 'Create employee shift successfully',
      border: 'success',
      duration: 3000,
    })
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

const clearTempCreate = () => {
  isCreateShift.value = false

  tempEmployeeOpened.value = null
  tempShiftTime.value = null
}

const acceptCreate = () => {
  createEmployeeShift()
  clearTempCreate()
}

const openTimekeepingForm = (row: Employee, date: Dayjs) => {
  tempEmployeeOpened.value = row
  const stringDate = dayjs(date).format('YYYY-MM-DD')

  openDate.value = stringDate

  tempShiftTime.value = defaultShift()

  isCreateShift.value = true
}

const changeEmployeeTypeOfTime = (typeOfTime: HourlyWageCoefficient) => {
  updateTempShift('type_of_time', typeOfTime.type_of_time)
  updateTempShift('coefficient', typeOfTime.coefficient)
}

/** Edit FORM */
const isEditShift = ref<boolean>(false)
const tempShiftEdit = ref<Timekeeping | null>(null)

const onOpenEditForm = (shift: Timekeeping) => {
  tempShiftEdit.value = shift
  isEditShift.value = true
}

const changeEmployeeEditTypeOfTime = (typeOfTime: HourlyWageCoefficient) => {
  updateTempEditShift('type_of_time', typeOfTime.type_of_time)
  updateTempEditShift('coefficient', typeOfTime.coefficient)
}

const updateTempEditShift = (key: keyof Timekeeping, val: unknown) => {
  if (tempShiftEdit.value) tempShiftEdit.value[key] = val as never
}

const isOpenListShift = ref<boolean>(false)
const currentEmployeeOpenListTimekeeping = ref<Employee | null>(null)

const listTimekeepingOfEmployee = computed<Timekeeping[]>(
  () =>
    castArray(
      employeesShift.value[
        currentEmployeeOpenListTimekeeping.value?.employee_id!
      ][openDate.value]
    ) || []
)

const acceptEdit = async () => {
  // send request to the server
  try {
    if (!tempShiftEdit.value) {
      throw new Error('Cannot update shift of null')
    }
    const res = await EmployeeShiftServices.updateShift(tempShiftEdit.value)

    let shiftOfDate = employeesShift.value[res.user_id][res.date]

    let setOpenDateShift: any = res

    // find the shift in the history
    if (isArray(shiftOfDate)) {
      const shift = shiftOfDate.find((shift) => shift.id === res.id)
      assign(shift, res)
    } else {
      employeesShift.value[res.user_id][res.date] = setOpenDateShift
    }

    notification({
      title: 'Timekeeping',
      position: 'top-center',
      text: 'Update employee shift successfully',
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
  tempShiftEdit.value = null
  isEditShift.value = false
}

const openListTimekeeping = (employee: Employee, date: Dayjs) => {
  currentEmployeeOpenListTimekeeping.value = employee
  const stringDate = dayjs(date).format('YYYY-MM-DD')
  openDate.value = stringDate
  isOpenListShift.value = true
}

/** Column's Classes */
const tableColumnClassName = computed(() =>
  isCurrentDate(date.value) ? 'bg-gray-3 bg-opacity-10' : ''
)
</script>

<style scoped lang="scss"></style>
