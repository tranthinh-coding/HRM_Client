<template>
  <div class="box rounded-2xl p-6">
    <el-tabs>
      <el-tab-pane name="1">
        <template #label>
          <div class="pt-4">
            <el-badge :value="timeoffs.length" :max="99"> Tất cả </el-badge>
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
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'
import { Timeoff } from '~/types'

const { result } = useQuery<{
  timeoffs: Timeoff[]
}>(
  gql`
    query HrRequest {
      timeoffs {
        id
        day_request
        time_from
        status
        user {
          user_id
          name
        }
      }
    }
  `
)

const timeoffs = computed(() => result.value?.timeoffs || [])
const timeoffsResolved = computed(
  () => result.value?.timeoffs.filter((e) => e.status === 'Resolved') || []
)
const timeoffsRejected = computed(
  () => result.value?.timeoffs.filter((e) => e.status === 'Rejected') || []
)
</script>

<style scoped lang="scss">
.box {
  background-color: getColor(bg-color);
}
</style>
