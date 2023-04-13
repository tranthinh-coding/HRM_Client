<template>
  <div class="box rounded-2xl p-6">
    <el-tabs>
      <el-tab-pane name="1">
        <template #label>
          <div class="pt-4">
            <el-badge :value="timeoffsArray.length" :max="99">
              Tất cả
            </el-badge>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane name="2">
        <template #label>
          <div class="pt-4">
            <el-badge :value="timeoffsResolved.length" :max="99">
              Chấp thuận
            </el-badge>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane name="3">
        <template #label>
          <div class="pt-4">
            <el-badge :value="timeoffsRejected.length" :max="99">
              Từ chối
            </el-badge>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useEmployeeTimeoffStore } from '~/store'

const timeoffStore = useEmployeeTimeoffStore()
const { timeoffsArray } = storeToRefs(timeoffStore)

const timeoffsResolved = computed(
  () => timeoffsArray.value.filter((e) => e.status === 'Resolved') || []
)
const timeoffsRejected = computed(
  () => timeoffsArray.value.filter((e) => e.status === 'Rejected') || []
)
</script>

<style scoped lang="scss">
.box {
  background-color: getColor(bg-color);
}
</style>
