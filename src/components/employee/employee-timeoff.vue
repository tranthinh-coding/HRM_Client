<template>
  <div>
    <div class="flex items-center justify-end">
      <vs-tooltip>
        <vs-button icon @click="refetchTimeoff" type="shadow">
          <el-icon> <refresh-bold /> </el-icon>
        </vs-button>
        <template #content>Refresh</template>
      </vs-tooltip>
      <vs-button
        v-if="isEmployee(currentUser?.role)"
        type="transparent"
        color="dribbble"
        @click="openRequestTimeoffForm"
      >
        Yêu cầu nghỉ phép
      </vs-button>
    </div>

    <el-table
      max-height="calc(100vh - 250px)"
      :data="timeoffsArray"
      table-layout="fixed"
      class="w-full mt-4"
      :cell-style="cellStyle"
      :default-sort="{ prop: 'day_request', order: 'descending' }"
    >
      <template v-if="isHR(currentUser?.role)">
        <el-table-column align="center" label="User info" fixed="left">
          <template #default="{ row }: { row: Timeoff }">
            <vs-tooltip>
              <div class="flex items-center justify-center">
                <vs-avatar>
                  <template #text>{{ row.user.name }}</template>
                </vs-avatar>
              </div>
              <template #content>
                {{ row.user.user_id }}
              </template>
            </vs-tooltip>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        prop="day_request"
        label="Ngày"
        sortable
        min-width="120"
        fixed="left"
        :filters="[
          { text: 'Hôm nay', value: dayjs().format('YYYY-MM-DD') },
          {
            text: 'Ngày mai',
            value: dayjs().add(1, 'day').format('YYYY-MM-DD'),
          },
        ]"
        :filter-method="filterDate"
      />
      <el-table-column prop="time_from" label="Thời gian" min-width="150">
        <template #default="{ row }: { row: Timeoff }">
          {{ row.time_from }} - {{ row.time_to }}
        </template>
      </el-table-column>

      <el-table-column prop="reason" label="Lý do" min-width="120" />

      <el-table-column
        prop="status"
        label="Trạng thái"
        min-width="120"
        :filters="[
          { text: 'Đã duyệt', value: 'Resolved' },
          { text: 'Đang chờ', value: 'Pending' },
          { text: 'Từ chối', value: 'Rejected' },
        ]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template #default="{ row }: { row: Timeoff }">
          <el-tag
            v-if="isEmployee(currentUser?.role) || row.status == 'Rejected'"
            :type="tagStatusType(row.status)"
            disable-transitions
          >
            {{ row.status }}
          </el-tag>
          <template v-else>
            <vs-select
              @change="(status: string) => updateStatus(status, row.id)"
              :model-value="row.status"
              state="success"
            >
              <vs-option value="Rejected" />
              <vs-option value="Resolved" />
              <vs-option value="Pending" />
            </vs-select>
          </template>
        </template>
      </el-table-column>

      <el-table-column
        prop="type_timeoff"
        label="Phân loại"
        min-width="120"
        :filters="timeoffTypes.map((e) => ({ text: e.name, value: e.name }))"
        :filter-method="filterPaid"
      >
        <template #default="{ row }: { row: Timeoff }">
          {{ row.type_timeoff }}
          <br />
          HS lương {{ row.coefficient }}
        </template>
      </el-table-column>
    </el-table>
  </div>

  <vs-dialog
    v-if="isEmployee(currentUser?.role)"
    v-model="isOpenRequestTimeoffForm"
    not-close
    @closed="() => (isAllDay = false)"
  >
    <h3 class="text-lg font-semibold opacity-90 mt-3">
      Thêm yêu cầu nghỉ phép
    </h3>
    <el-divider />

    <div class="flex flex-col gap-4">
      <el-config-provider :locale="viVN">
        <div>
          <div class="flex items-center justify-between ml-2 mb-1">
            <p class="text-xs">Chọn ngày nghỉ</p>
            <div class="text-xs mr-1">
              Cả ngày
              <el-switch v-model="isAllDay" />
            </div>
          </div>
          <el-date-picker
            v-model="dates"
            type="dates"
            placeholder="YYYY-MM-DD"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :disabled-date="disabledDate"
            :clearable="false"
          />
        </div>
        <div>
          <div class="flex items-center gap-2 ml-2 mb-1">
            <p class="text-xs">Chọn thời gian nghỉ</p>
            <vs-tooltip :show-after="350">
              <el-icon size="18"><info-circle-broken /></el-icon>
              <template #content>
                <p class="text-sm">
                  Điều chỉnh thời gian kết thúc trước để dễ dàng lựa chọn hơn
                </p>
              </template>
            </vs-tooltip>
            {{ diffTime(startTime, endTime) }} giờ
          </div>
          <div class="flex items-center justify-between">
            <vs-time-select
              v-model="startTime"
              :max-time="endTime"
              :min-time="minTimeStart"
              class="mr-4"
              placeholder="Start time"
              :start="TIME_START"
              :step="TIME_STEP"
              :end="TIME_END"
              :disabled="isAllDay"
              :clearable="false"
            />
            -
            <vs-time-select
              v-model="endTime"
              :min-time="startTime"
              placeholder="End time"
              :start="nextTime(TIME_START, TIME_STEP)"
              :step="TIME_STEP"
              :end="TIME_END"
              :disabled="isAllDay"
              :clearable="false"
            />
          </div>
        </div>
      </el-config-provider>

      <div>
        <p class="ml-2 text-xs mb-1 flex items-center gap-2">
          Chọn loại thời gian nghỉ
          <vs-tooltip :show-after="350">
            <el-icon size="18"><info-circle-broken /></el-icon>
            <template #content>
              <p class="text-sm">
                Với nghỉ phép tiêu chuẩn, hệ thống sẽ tính hệ số lương bằng một
                nửa ca làm việc
              </p>
            </template>
          </vs-tooltip>
        </p>
        <vs-select v-model="typeTimeoff">
          <vs-option
            v-for="(type, index) in timeoffTypes"
            :key="index"
            :value="type"
            :label="`${type.name} - ${type.coefficient}`"
          />
        </vs-select>
      </div>

      <div>
        <vs-input v-model="notes" clearable label="Ghi chú" />
      </div>

      <vs-button
        @click="sendRequestTimeoff"
        type="flat"
        :loading="sendingRequestTimeoff"
      >
        Gửi
      </vs-button>
    </div>
  </vs-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { last } from 'lodash-unified'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { notification } from 'vuesax-old'
// @ts-ignore
import viVN from 'element-plus/dist/locale/vi.min.js'

import { compareTime, nextTime } from '~/utils/dayjs-time'
import EmployeeServices from '~/services/employee-services'
import { useEmployeeTimeoffStore, useUserStore } from '~/store'
import { isEmployee, isHR } from '~/config'
import { getResponseError } from '~/composables'
import type { Time, Timeoff, TimeoffType } from '~/types'

const TIME_STEP: Time = '00:30'
const TIME_START: Time = '00:00'
const TIME_END: Time = '23:30'
const TIME_FORMAT = 'HH:mm'

const TIMES: Time[] = [TIME_START]

while (compareTime(last(TIMES)!, TIME_END) != 0) {
  TIMES.push(nextTime(last(TIMES)!, TIME_STEP) as any)
}

const { user: currentUser } = storeToRefs(useUserStore())
const timeoffStore = useEmployeeTimeoffStore()
const { timeoffsArray, timeoffTypes } = storeToRefs(timeoffStore)

const isOpenRequestTimeoffForm = ref<boolean>(false)
const isAllDay = ref<boolean>(false)
const sendingRequestTimeoff = ref<boolean>(false)
const notes = ref<string>('')
/**
 * Ref<Date[]>
 * */
const dates = ref<any>([dayjs().format('YYYY-MM-DD')])
const typeTimeoff = ref<TimeoffType>()

const startTime = ref<Time>(
  /** find next step time: 16:47 => get 17:00 */
  TIMES.find((e) => compareTime(e, dayjs().format('HH:mm') as Time) > 0) ||
    TIME_START
)

const endTime = ref<Time>(nextTime(startTime.value, TIME_STEP) as Time)

const minTimeStart = computed(() =>
  dayjs().add(5, 'minutes').format(TIME_FORMAT)
)

const diffTime = (start: Time, end: Time) => {
  const _startTime = dayjs(`2023-04-01T${start}`)
  const _endTime = dayjs(`2023-04-01T${end}`)

  return _endTime.diff(_startTime, 'hours', true)
}

const refetchTimeoff = async () => {
  await timeoffStore.refetch(
    {
      force: true,
    },
    {
      user_id: isHR(currentUser.value?.role)
        ? undefined
        : currentUser.value?.user_id,
    }
  )
}
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now() - 60 * 60 * 24 * 1000
}
const tagStatusType = (status: string) => {
  if (status == 'Resolved') return 'success'
  if (status == 'Pending') return 'warning'
  return 'danger'
}
const updateStatus = async (status: string, timeoff_id: number) => {
  try {
    await EmployeeServices.updateRequestTimeoff({
      id: timeoff_id,
      status,
    })
    notification({
      title: 'Update status',
      text: 'Update status successfully',
      position: 'top-center',
      border: 'success',
      progress: 'auto',
      duration: 5000,
    })
    refetchTimeoff()
  } catch (e) {
    notification({
      title: 'Update status',
      text: 'Update status failed',
      position: 'top-center',
      border: 'warn',
      progress: 'auto',
      duration: 10000,
    })
  }
}

const sendRequestTimeoff = async () => {
  sendingRequestTimeoff.value = true
  try {
    // parse date before sending request
    /** Timestamp[] */
    const _dates: any[] = Array.isArray(dates.value)
      ? dates.value
      : [dates.value]

    if (!typeTimeoff.value) {
      throw new Error('Invalid timeoff')
    }

    const datesParsed = _dates.map((e) => dayjs(e).format('YYYY-MM-DD'))

    await EmployeeServices.requestTimeoff({
      time_from: startTime.value,
      time_to: endTime.value,
      type_timeoff_id: typeTimeoff.value.id,
      reason: notes.value,
      dates: datesParsed,
      user_id: currentUser.value?.user_id,
    })
    refetchTimeoff()
    notification({
      title: 'Update status',
      text: 'Success',
      border: 'success',
      position: 'top-center',
      progress: 'auto',
      duration: 5000,
    })
  } catch (error) {
    const e = getResponseError(error)
    notification({
      title: 'Update status',
      text: e.message || 'Có lỗi xảy ra',
      position: 'top-center',
      border: 'warn',
      progress: 'auto',
      duration: 10000,
    })
  }
  sendingRequestTimeoff.value = false
}
const openRequestTimeoffForm = () => {
  isOpenRequestTimeoffForm.value = true
}

const cellStyle = ({ columnIndex }: { columnIndex: number }) => {
  if (columnIndex > 0)
    return {
      'border-left': `var(--el-table-border)`,
    }
}

/** Table filter */
const filterStatus = (value: string, row: Timeoff) => row.status === value
const filterPaid = (value: string, row: Timeoff) => row.type_timeoff === value
const filterDate = (value: string, row: Timeoff) => row.day_request === value

watch(isAllDay, (val) => {
  if (val) {
    startTime.value = '09:00'
    endTime.value = '17:00'
  } else {
    startTime.value =
      TIMES.find((e) => compareTime(e, dayjs().format('HH:mm') as Time) > 0) ||
      TIME_START

    endTime.value = nextTime(startTime.value, TIME_STEP) as Time
  }
})
</script>
