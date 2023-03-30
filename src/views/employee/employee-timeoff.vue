<template>
  <div class="bg-theme-layout p-4 rounded-xl">
    <div class="mt-4 flex justify-start gap-8">
      <el-statistic :value="98500">
        <template #title>
          <div class="flex items-center">
            Số giờ làm trong tháng
            <el-tooltip
              effect="dark"
              content="Tính từ lần cuối thanh toán lương"
              placement="top"
            >
              <el-icon class="ml-1" :size="12">
                <info-circle-broken />
              </el-icon>
            </el-tooltip>
          </div>
        </template>

        content
      </el-statistic>

      <el-statistic :value="30">
        <template #title>
          <div>Số giờ nghỉ trong tháng</div>
        </template>
      </el-statistic>
    </div>

    <div class="mt-6">
      <el-tabs>
        <el-tab-pane label="Thông tin chấm công" value="1">
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
                <vs-button
                  type="flat"
                  @click="calendarInstance?.selectDate('today')"
                >
                  Hôm nay
                </vs-button>
              </div>
            </template>
            <template #date-cell="{ data }">
              <div class="flex justify-between">
                <div
                  class="text-lg date"
                  :class="data.isSelected ? 'is-selected' : ''"
                >
                  {{ data.day.split('-').slice(2).join('-') }}
                </div>
                <p>8h</p>
              </div>
            </template>
          </el-calendar>
        </el-tab-pane>

        <el-tab-pane label="Thông tin nghỉ phép" value="2">
          <div>
            <div class="flex items-center justify-end">
              <vs-button
                type="transparent"
                color="dribbble"
                @click="openRequestTimeoffForm"
              >
                Yêu cầu nghỉ phép
              </vs-button>
            </div>

            <div></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <vs-dialog v-model="isOpenRequestTimeoffForm" not-close>
      <h3 class="text-lg font-semibold opacity-90 mt-3">Yêu cầu nghỉ phép</h3>
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
              :disabled-date="disabledDate"
              format="YYYY-MM-DD"
              value-format="x"
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
                  Với Hệ thống tự chọn, sẽ ưu tiên trừ thời gian nghỉ có lương
                  còn lại trong tháng trước
                </p>
              </template>
            </vs-tooltip>
          </p>
          <vs-select v-model="typeTimeOff">
            <vs-option value="auto" label="Hệ thống tự chọn" />
            <vs-option value="paid" label="Nghỉ có lương" />
            <vs-option value="unpaid" label="Nghỉ không lương" />
          </vs-select>
        </div>

        <div>
          <vs-input
            v-model="notes"
            clearable
            label="Ghi chú"
            @click="sendRequestTimeoff"
          />
        </div>

        <vs-button type="flat"> Gửi </vs-button>
      </div>
    </vs-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import dayjs from 'dayjs'
// @ts-ignore
import viVN from 'element-plus/dist/locale/vi.min.js'
import type { CalendarInstance } from 'element-plus/es/components/calendar/src/instance'

// chấm công
const calendarInstance = ref<CalendarInstance | null>(null)
const calendar = ref(new Date())
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now() - 60 * 60 * 24 * 1000
}

// time off
const isOpenRequestTimeoffForm = ref<boolean>(false)
const isAllDay = ref<boolean>(false)

const notes = ref<string>('')
const dates = ref('')
const typeTimeOff = ref()

const startTime = ref('09:00')
const endTime = ref('17:00')

const diffTime = computed(() => {
  const _startTime = dayjs(`2023-04-01T${startTime.value}:00`)
  const _endTime = dayjs(`2023-04-01T${endTime.value}:00`)

  const timeDiffInHours = _endTime.diff(_startTime, 'hours', true)

  return timeDiffInHours
})

const sendRequestTimeoff = () => {
  console.log()
}

watch(isAllDay, () => {
  startTime.value = '09:00'
  endTime.value = '17:00'
})
//
const openRequestTimeoffForm = () => {
  isOpenRequestTimeoffForm.value = true
}
</script>

<style scoped lang="scss">
.date.is-selected {
  background: getColor(primary);
  color: getColor(light);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
}

.divider {
  background-color: getColor(gray-4);
}
</style>
<style lang="scss">
.el-popper {
  overflow: hidden;
}
.el-input,
.el-input__wrapper {
  width: 100% !important;
  height: unset !important;
}
.el-input__wrapper {
  width: 100%;
  padding: 6px 10px;
  background: getColor(gray-2);
  border-radius: 13px;
  border: none !important;
  box-shadow: none !important;

  .el-input__inner {
    transition: all 0.25s ease;
  }
  &.is-focus {
    .el-input__inner {
      padding-left: 4px;
    }
  }
}
</style>

<style lang="scss">
.vs-select {
  max-width: unset;
}
</style>
