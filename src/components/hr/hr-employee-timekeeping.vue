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
      />
    </el-config-provider>
    <vs-button type="transparent" @click="jumpToCurrentWeek">
      Tuần này
    </vs-button>
  </div>
  <div>
    <el-table :data="employees" table-layout="fixed" border>
      <el-table-column align="center" min-width="100" fixed="left">
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
              {{ row.name }}
            </div>
          </vs-tooltip>
        </template>
      </el-table-column>

      <el-table-column min-width="150" align="center">
        <template #header> CN ({{ dayjs(date).format('DD-MM') }}) </template>
        <template #default="{ row }: { row: Employee }">
          <div class="w-full h-full flex items-center justify-center">
            <button
              class="w-1/2 rounded-xl py-2 px-5 flex items-center justify-center border-dashed border-2"
              @click="openTimekeepingForm(row, dayjs(date))"
            >
              <el-icon size="20">
                <add />
              </el-icon>
            </button>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center">
        <template #header>
          T2 ({{ dayjs(date).add(1, 'day').format('DD-MM') }})
        </template>
        <template #default="{ row }: { row: Employee }">
          <div class="w-full h-full flex items-center justify-center">
            <button
              class="w-1/2 rounded-xl py-2 px-5 flex items-center justify-center border-dashed border-2"
              @click="openTimekeepingForm(row, dayjs(date).add(1, 'day'))"
            >
              <el-icon size="20">
                <add />
              </el-icon>
            </button>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center">
        <template #header>
          T3 ({{ dayjs(date).add(2, 'day').format('DD-MM') }})
        </template>
        <template #default="{ row }: { row: Employee }">
          <div class="w-full h-full flex items-center justify-center">
            <button
              class="w-1/2 rounded-xl py-2 px-5 flex items-center justify-center border-dashed border-2"
              @click="openTimekeepingForm(row, dayjs(date).add(2, 'day'))"
            >
              <el-icon size="20">
                <add />
              </el-icon>
            </button>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center">
        <template #header>
          T4 ({{ dayjs(date).add(3, 'day').format('DD-MM') }})
        </template>
        <template #default="{ row }: { row: Employee }">
          <div class="w-full h-full flex items-center justify-center">
            <button
              class="w-1/2 rounded-xl py-2 px-5 flex items-center justify-center border-dashed border-2"
              @click="openTimekeepingForm(row, dayjs(date).add(3, 'day'))"
            >
              <el-icon size="20">
                <add />
              </el-icon>
            </button>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center">
        <template #header>
          T5 ({{ dayjs(date).add(4, 'day').format('DD-MM') }})
        </template>
        <template #default="{ row }: { row: Employee }">
          <div class="w-full h-full flex items-center justify-center">
            <button
              class="w-1/2 rounded-xl py-2 px-5 flex items-center justify-center border-dashed border-2"
              @click="openTimekeepingForm(row, dayjs(date).add(4, 'day'))"
            >
              <el-icon size="20">
                <add />
              </el-icon>
            </button>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center">
        <template #header>
          T6 ({{ dayjs(date).add(5, 'day').format('DD-MM') }})
        </template>
        <template #default="{ row }: { row: Employee }">
          <div class="w-full h-full flex items-center justify-center">
            <button
              class="w-1/2 rounded-xl py-2 px-5 flex items-center justify-center border-dashed border-2"
              @click="openTimekeepingForm(row, dayjs(date).add(5, 'day'))"
            >
              <el-icon size="20">
                <add />
              </el-icon>
            </button>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center">
        <template #header>
          T7 ({{ dayjs(date).add(6, 'day').format('DD-MM') }})
        </template>
        <template #default="{ row }: { row: Employee }">
          <div class="w-full h-full flex items-center justify-center">
            <button
              class="w-1/2 rounded-xl py-2 px-5 flex items-center justify-center border-dashed border-2"
              @click="openTimekeepingForm(row, dayjs(date).add(6, 'day'))"
            >
              <el-icon size="20">
                <add />
              </el-icon>
            </button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <vs-dialog v-model="isOpenTimekeepingForm" prevent-close>
      <template #header>
        <h2 class="text-lg">
          {{
            employeesAttendance.get(employeeTimekeeingForm.employee_id)?.[
              openDate
            ].name
          }}: Ngày
          {{ openDate }}
        </h2>
      </template>

      <div class="flex flex-col gap-4">
        <vs-input
          disabled
          label="ID"
          :model-value="
            employeesAttendance.get(employeeTimekeeingForm.employee_id)?.[
              openDate
            ].employee_id
          "
        />

        <div>
          <p
            class="flex items-center gap-2 ml-2"
            v-if="
              employeesAttendance.get(employeeTimekeeingForm.employee_id)?.[
                openDate
              ]?.startTime &&
              employeesAttendance.get(employeeTimekeeingForm.employee_id)?.[
                openDate
              ]?.endTime
            "
          >
            {{
              diffTime(
                employeesAttendance.get(employeeTimekeeingForm.employee_id)![
                  openDate
                ].startTime,
                employeesAttendance.get(employeeTimekeeingForm.employee_id)![
                  openDate
                ].endTime
              )
            }}
            tiếng
          </p>

          <div class="flex items-center gap-1 justify-start">
            <el-time-select
              :model-value="
                employeesAttendance.get(employeeTimekeeingForm.employee_id)?.[
                  openDate
                ].startTime
              "
              @update:model-value="
                (e) =>
                  updateAttendance(
                    employeeTimekeeingForm.employee_id,
                    'startTime',
                    e
                  )
              "
              :max-time="
                employeesAttendance.get(employeeTimekeeingForm.employee_id)?.[
                  openDate
                ]?.endTime
              "
              placeholder="Start time"
              start="00:00"
              step="00:30"
              end="23:30"
            />
            -
            <el-time-select
              :model-value="
                employeesAttendance.get(employeeTimekeeingForm.employee_id)?.[
                  openDate
                ]?.endTime
              "
              :min-time="
                employeesAttendance.get(employeeTimekeeingForm.employee_id)?.[
                  openDate
                ]?.startTime
              "
              @update:model-value="
                (e) =>
                  updateAttendance(
                    employeeTimekeeingForm.employee_id,
                    'endTime',
                    e
                  )
              "
              placeholder="End time"
              start="00:00"
              step="00:30"
              end="23:30"
            />
          </div>
        </div>
        <vs-select
          :model-value="`${
            employeesAttendance.get(employeeTimekeeingForm.employee_id)?.[
              openDate
            ].type_of_time
          } - ${
            employeesAttendance.get(employeeTimekeeingForm.employee_id)?.[
              openDate
            ].coefficient
          }`"
          @change="(h: HourlyWageCoefficient) => changeEmployeeTypeOfTime(employeeTimekeeingForm.employee_id, h)"
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
          <vs-button @click="acceptUpdate" type="transparent">
            Xác nhận
          </vs-button>
          <vs-button
            @click="cancleUpdate"
            type="transparent"
            color="google-plus"
          >
            Huỷ
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import { Employee, HourlyWageCoefficient } from '~/types'
import { diffTime } from '~/utils'
// @ts-ignore
import viVN from 'element-plus/dist/locale/vi.min.js'

type Attendance = {
  employee_id: string
  name: string
  date: string
  startTime: string
  endTime: string
  type_of_time: string
  coefficient: number
}

type EmployeeAttendances = {
  [date: string]: Attendance
}

const defaultAttendance: Attendance = {
  employee_id: '',
  name: '',
  date: dayjs().format('YYYY-MM-DD'),
  startTime: '09:00',
  endTime: '17:00',
  type_of_time: 'Hành chính',
  coefficient: 1,
}

const defaultTime: EmployeeAttendances = {
  [dayjs().format('YYYY-MM-DD')]: Object.assign({}, defaultAttendance),
}

const date = ref(dayjs().endOf('w').add(-6, 'day').format('YYYY-MM-DD'))

const isOpenTimekeepingForm = ref<boolean>(false)

const openDate = ref(dayjs().format('YYYY-MM-DD'))
const employeeTimekeeingForm = ref<Employee>({
  department: '',
  email: '',
  employee_id: '',
  name: '',
  position: '',
})

const employeesAttendance = ref<Map<string, EmployeeAttendances>>(new Map())

const { result } = useQuery<{
  employees: {
    data: Employee[]
  }
  hourly_wage_coefficients: HourlyWageCoefficient[]
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
      hourly_wage_coefficients {
        id
        type_of_time
        coefficient
      }
    }
  `
)

const jumpToCurrentWeek = () => {
  date.value = dayjs().endOf('w').add(-6, 'day').format('YYYY-MM-DD')
}

const updateAttendance = (eid: string, key: keyof Attendance, val: any) => {
  const employeesAttendanceCaches =
    employeesAttendance.value.get(eid) || Object.assign({}, defaultTime)

  const attendanceCurrentDay = employeesAttendanceCaches[openDate.value]

  employeesAttendance.value.set(eid, {
    ...employeesAttendanceCaches,
    [openDate.value]: {
      ...defaultAttendance,
      ...attendanceCurrentDay,
      [key]: val,
    },
  })
}

const cancleUpdate = () => {
  isOpenTimekeepingForm.value = false
}

const acceptUpdate = () => {
  console.log(
    employeesAttendance.value.get(employeeTimekeeingForm.value.employee_id)?.[
      openDate.value
    ]
  )
}

const openTimekeepingForm = (row: Employee, date: Dayjs) => {
  employeeTimekeeingForm.value = row

  const stringDate = dayjs(date).format('YYYY-MM-DD')

  openDate.value = stringDate

  updateAttendance(row.employee_id, 'employee_id', row.employee_id)
  updateAttendance(row.employee_id, 'name', row.name)
  updateAttendance(row.employee_id, 'date', stringDate)

  isOpenTimekeepingForm.value = true
}

const changeEmployeeTypeOfTime = (
  eid: string,
  typeOfTime: HourlyWageCoefficient
) => {
  updateAttendance(eid, 'type_of_time', typeOfTime.type_of_time)
  updateAttendance(eid, 'coefficient', typeOfTime.coefficient)
}

const hourlyWageCoefficients = computed(
  () => result.value?.hourly_wage_coefficients || []
)

const employees = computed(() => result.value?.employees.data || [])

watch(employees, (ep) => {
  ep.forEach((e) => {
    // is set
    if (!employeesAttendance.value.has(e.employee_id)) {
      employeesAttendance.value.set(
        e.employee_id,
        Object.assign({}, defaultTime)
      )
    }
  })
})
</script>

<style scoped lang="scss"></style>
