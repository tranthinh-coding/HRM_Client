<template>
  <div>
    <div
      v-if="isEmployee(currentUser?.role)"
      class="flex items-center justify-end"
    >
      <vs-button
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
      class="w-full mt-4"
      :default-sort="{ prop: 'day_request', order: 'descending' }"
    >
      <template v-if="isHR(currentUser?.role)">
        <el-table-column align="center" label="User info" fixed="left">
          <el-table-column align="center" prop="user.name" label="Tên" />
          <el-table-column align="center" prop="user.user_id" label="ID" />
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
      <el-table-column
        prop="time_from"
        label="Thời gian bắt đầu"
        min-width="100"
      />
      <el-table-column
        prop="time_to"
        label="Thời gian kết thúc"
        min-width="100"
      />

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
        v-if="isEmployee(currentUser?.role)"
        prop="type_timeoff"
        label="Phân loại"
        min-width="120"
        :filters="[
          { text: 'Nghỉ có lương', value: 'paid' },
          { text: 'Nghỉ không lương', value: 'unpaid' },
        ]"
        :filter-method="filterPaid"
      >
        <template #default="{ row }: { row: Timeoff }">
          <template v-if="row.type_timeoff === 'paid'">Nghỉ có lương</template>
          <template v-else>Nghỉ không lương</template>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <vs-dialog
    v-if="isEmployee(currentUser?.role)"
    v-model="isOpenRequestTimeoffForm"
    not-close
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
          />
        </div>
        <div>
          <div class="flex items-center gap-2 ml-2 mb-1">
            <p class="text-xs">Chọn thời gian nghỉ</p>
            <p v-if="diffTime">{{ diffTime }} giờ</p>
          </div>
          <el-time-select
            v-model="startTime"
            :max-time="endTime"
            class="mr-4"
            placeholder="Start time"
            start="08:30"
            step="00:30"
            end="18:30"
            :disabled="isAllDay"
          />
          <el-time-select
            v-model="endTime"
            :min-time="startTime"
            placeholder="End time"
            start="08:30"
            step="00:30"
            end="18:30"
            :disabled="isAllDay"
          />
        </div>
      </el-config-provider>

      <div>
        <p class="ml-2 text-xs mb-1 flex items-center gap-2">
          Chọn loại thời gian nghỉ
          <vs-tooltip>
            <el-icon size="18"><info-circle-broken /></el-icon>
            <template #content>
              <p class="text-sm">
                Trường hợp thời gian nghỉ có lương trong tháng tới giới hạn, hệ
                thống sẽ tính nghỉ không lương
              </p>
            </template>
          </vs-tooltip>
        </p>
        <vs-select v-model="typeTimeoff">
          <vs-option value="paid" label="Nghỉ có lương" />
          <vs-option value="unpaid" label="Nghỉ không lương" />
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
import dayjs from 'dayjs'
import { notification } from 'vuesax-old'
// @ts-ignore
import viVN from 'element-plus/dist/locale/vi.min.js'

import EmployeeServices from '~/services/employee-services'
import { useEmployeeTimeoffStore, useUserStore } from '~/store'
import { isHR, isEmployee } from '~/config'
import type { Timeoff } from '~/types'
import { getResponseError } from '~/composables'
import { storeToRefs } from 'pinia'

const { user: currentUser } = storeToRefs(useUserStore())
const timeoffStore = useEmployeeTimeoffStore()
const { timeoffsArray } = storeToRefs(timeoffStore)

const isOpenRequestTimeoffForm = ref<boolean>(false)
const isAllDay = ref<boolean>(false)
const sendingRequestTimeoff = ref<boolean>(false)
const notes = ref<string>('')
/**
 * Ref<Date[]>
 * */
const dates = ref<any>([dayjs().format('YYYY-MM-DD')])
const typeTimeoff = ref('paid')

const startTime = ref('09:00')
const endTime = ref('17:00')

const diffTime = computed(() => {
  const _startTime = dayjs(`2023-04-01T${startTime.value}:00`)
  const _endTime = dayjs(`2023-04-01T${endTime.value}:00`)

  const timeDiffInHours = _endTime.diff(_startTime, 'hours', true)

  return timeDiffInHours
})
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
    timeoffStore.refetch(
      {},
      {
        user_id: isHR(currentUser.value?.role)
          ? ''
          : currentUser.value?.user_id,
      }
    )
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

    const datesParsed = _dates.map((e) => dayjs(e).format('YYYY-MM-DD'))

    await EmployeeServices.requestTimeoff({
      time_from: startTime.value,
      time_to: endTime.value,
      type_timeoff: typeTimeoff.value,
      reason: notes.value,
      dates: datesParsed,
      user_id: currentUser.value?.user_id,
    })
    timeoffStore.refetch(
      {},
      {
        user_id: currentUser.value?.user_id,
      }
    )
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

/** Table filter */
const filterStatus = (value: string, row: Timeoff) => row.status === value
const filterPaid = (value: string, row: Timeoff) => row.type_timeoff === value
const filterDate = (value: string, row: Timeoff) => row.day_request === value

watch(isAllDay, () => {
  startTime.value = '09:00'
  endTime.value = '17:00'
})
</script>
