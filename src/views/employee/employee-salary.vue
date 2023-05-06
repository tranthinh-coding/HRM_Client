<template>
  <div>
    <div class="box p20px rounded-xl my-20px">
      <el-table :data="filterTableSalaryPeriods" lazy>
        <el-table-column label="#" prop="id" />
        <el-table-column label="Ky tinh luong" prop="name" />

        <el-table-column
          width="200"
          :label="t('page.action')"
          class-name="table-operations"
        >
          <template #header>
            <vs-input v-model="search" :placeholder="t('page.search')">
              <template #icon>
                <el-icon><search-normal /></el-icon>
              </template>
            </vs-input>
          </template>

          <template #default="{ row }: { row: SalaryPeriod }">
            <div class="flex items-center justify-center">
              <vs-button @click="seeDetail(row)" type="transparent" icon>
                <el-icon size="20"> <info-circle /> </el-icon>
              </vs-button>
            </div>
          </template>
        </el-table-column>

        <template #empty>
          <el-empty />
        </template>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useSalariesStore } from '~/store'

import type { SalaryPeriod } from '~/types'

const router = useRouter()
const { t } = useI18n()

const employeeSalariesStore = useSalariesStore()
const { salaryPeriods } = storeToRefs(employeeSalariesStore)

const search = ref('')

const filterTableSalaryPeriods = computed(
  () =>
    salaryPeriods.value?.filter(
      (salaryPeriod) =>
        !search.value ||
        salaryPeriod.name.toLowerCase().includes(search.value.toLowerCase())
    ) || []
)

const seeDetail = (ePeriod: SalaryPeriod) => {
  router.push({
    name: 'hr/employee-salary/period',
    params: {
      id: ePeriod.id,
    },
  })
}
</script>
