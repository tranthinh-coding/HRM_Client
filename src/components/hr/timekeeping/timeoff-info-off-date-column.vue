<template>
  <vs-tooltip v-if="timeoffsResolved.length" placement="top">
    <template #content>Danh sách khung giờ xin nghỉ của nhân viên</template>
    <vs-button
      icon
      v-bind="$attrs"
      color="danger"
      type="transparent"
      @click="isOpenListTimeoff = true"
    >
      <el-icon size="20">
        <timer-pause />
      </el-icon>
    </vs-button>
  </vs-tooltip>

  <vs-dialog v-model="isOpenListTimeoff">
    <template #header>
      <h3 class="text-lg font-500">Danh sách các ca xin nghỉ</h3>
    </template>

    <div
      v-for="(timeoff, index) in timeoffsResolved"
      :key="index"
      class="flex items-center gap-6px"
    >
      <div class="inline-block w-6px h-6px rounded-full dot" />
      {{ timeoff.time_from }} - {{ timeoff.time_to }}
    </div>
  </vs-dialog>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { castArray } from 'lodash-unified'
import dayjs from 'dayjs'
import { useEmployeeTimeoffStore } from '~/store'

import type { Dayjs } from 'dayjs'

const props = defineProps<{
  eid?: string
  date: Dayjs
}>()

const employeeTimeoffStore = useEmployeeTimeoffStore()
const { timeoffs } = storeToRefs(employeeTimeoffStore)

const isOpenListTimeoff = ref(false)

const listTimeoffs = computed(() =>
  castArray(
    timeoffs.value?.[props.eid ? props.eid : '---1']?.[dateString.value] || []
  )
)
const timeoffsResolved = computed(() => {
  return listTimeoffs.value.filter((e) => e?.status === 'Resolved')
})
const dateString = computed(() => dayjs(props.date).format('YYYY-MM-DD'))
</script>

<style scoped lang="scss">
.dot {
  background: getColor(primary);
}
</style>
