<template>
  <div>
    <div class="mt9">
      <h3 class="text-lg my-2">Bang khen thuong</h3>
      <el-table :data="rewards">
        <el-table-column label="#" prop="id" />
        <el-table-column label="Ten khen thuong" prop="name" />
        <el-table-column label="Loi nhan" prop="description" />
        <el-table-column label="Muc khen thuong" prop="salary" />
        <el-table-column label="Ngay tao" prop="created_at" />
      </el-table>
    </div>

    <div class="mt9">
      <h3 class="text-lg my-2">Bang khau tru</h3>
      <el-table :data="filterTableDisciplines">
        <el-table-column fixed="left" min-width="100" label="#" prop="id">
          <template #header>
            <vs-input v-model="search" :placeholder="t('page.search')">
              <template #icon>
                <el-icon><search-normal /></el-icon>
              </template>
            </vs-input>
          </template>

          <template #default="{ row }: { row: EmployeeDiscipline }">
            {{ row.id }}
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="Loai ky luat" prop="name" />
        <el-table-column min-width="150" label="Ly do" prop="description" />
        <el-table-column min-width="150" label="Muc khau tru" prop="salary">
          <template #default="{ row }: { row: EmployeeDiscipline }">
            {{ moneyFormat(row.salary) }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          label="Ngay ap dung"
          prop="start_date"
        />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import { useDisciplineStore, useRewardStore } from '~/store'
import { moneyFormat } from '~/utils'
import type { EmployeeDiscipline } from '~/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const rewardStore = useRewardStore()
const { rewards } = storeToRefs(rewardStore)

const disciplineStore = useDisciplineStore()
const { disciplines } = storeToRefs(disciplineStore)

const search = ref('')

const filterTableDisciplines = computed(
  () =>
    disciplines.value?.filter(
      (reward) =>
        !search.value ||
        reward.name.toLowerCase().includes(search.value.toLowerCase())
    ) || []
)
</script>
