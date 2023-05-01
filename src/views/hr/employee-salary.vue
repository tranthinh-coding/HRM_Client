<template>
  <vs-button type="gradient" color="danger" @click="openform = !openform">
    Tao bang luong
  </vs-button>

  <el-collapse-transition>
    <div class="box rounded-xl my-20px" v-show="openform">
      <div class="flex flex-col gap-18px p20px">
        <vs-input :model-value="'hi'" />
        <vs-input :model-value="'hi'" />
        <vs-input :model-value="'hi'" />
      </div>
    </div>
  </el-collapse-transition>

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
            <vs-button
              @click="deleteSalaryPeriod(row)"
              type="transparent"
              icon
              color="dribbble"
            >
              <el-icon size="20"> <trash /> </el-icon>
            </vs-button>
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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSalariesStore } from '~/store/salaries'
import { useI18n } from 'vue-i18n'

import type { SalaryPeriod } from '~/types'
import { useRouter } from 'vue-router'
import { getResponseError } from '~/composables'
import { notification } from 'vuesax-old'
import SalaryServices from '~/services/salary-services'

const router = useRouter()
const { t } = useI18n()

const employeeSalariesStore = useSalariesStore()
const { salaryPeriods } = storeToRefs(employeeSalariesStore)

const openform = ref(false)

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

const deleteSalaryPeriod = async (ePeriod: SalaryPeriod) => {
  try {
    await SalaryServices.deletePeriod(ePeriod.id)
    notification({
      text: 'Deleted successfully',
      duration: 3000,
      position: 'top-center',
      border: 'success',
    })
  } catch (error) {
    const e = getResponseError(error)
    notification({
      text: e.message || 'Khong xoa duoc ky tinh luong nay',
      duration: 3000,
      position: 'top-center',
      border: 'danger',
    })
  }
}
</script>

<style scoped lang="scss">
.box {
  background: getColor(theme-layout);
}
</style>
