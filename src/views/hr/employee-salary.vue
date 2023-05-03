<template>
  <vs-button type="gradient" color="danger" @click="openForm = true">
    Tao bang luong
  </vs-button>

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

  <vs-dialog v-model="openForm">
    <template #header>
      <h3 class="text-lg">Tao ky tinh luong moi</h3>
    </template>
    <div class="flex flex-col gap-4">
      <vs-input
        v-model="createSalaryPeriodForm.salary_period"
        label="Ky tinh luong"
        label-float
      />

      <div class="relative mt-3">
        <h4
          class="absolute l0 z10 transition-all duration-250"
          :class="
            createSalaryPeriodForm.employees.length
              ? 'top-0 -translate-y-100% ml-12px text-xs'
              : 'top-50% -translate-y-50% ml-14px text-sm opacity-40'
          "
        >
          Nhan vien
        </h4>
        <el-tree-select
          v-model="createSalaryPeriodForm.employees"
          :data="employeesTreeSelect"
          :render-after-expand="false"
          multiple
          show-checkbox
          filterable
          :filter-node-method="filterNodeMethod"
          check-on-click-node
          collapse-tags
          collapse-tags-tooltip
          tag-type="success"
          placeholder=" "
          class="w-full"
          clearable
        />
      </div>
      <div>
        <h4 class="relative ml-12px text-xs">Ngay bat dau</h4>
        <el-date-picker
          v-model="createSalaryPeriodForm.start_date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :default-value="new Date()"
        />
      </div>
      <div>
        <h4 class="relative ml-12px text-xs">Ngay ket thuc</h4>
        <el-date-picker
          v-model="createSalaryPeriodForm.end_date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :default-value="new Date()"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex w-full justify-end items-center gap-2">
        <vs-button @click="acceptCreate" type="transparent">
          Xác nhận
        </vs-button>
        <vs-button @click="cancleCreate" type="transparent" color="google-plus">
          Huỷ
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { notification } from 'vuesax-old'

import { getResponseError } from '~/composables'
import SalaryServices, {
  SalaryPeriodCreateRequest,
} from '~/services/salary-services'
import { useEmployeesStore, useSalariesStore } from '~/store'

import type { SalaryPeriod } from '~/types'

const router = useRouter()
const { t } = useI18n()

const employeeStore = useEmployeesStore()
const { employees } = storeToRefs(employeeStore)

const employeeSalariesStore = useSalariesStore()
const { salaryPeriods } = storeToRefs(employeeSalariesStore)

const createSalaryPeriodForm = reactive<SalaryPeriodCreateRequest>({
  employees: [],
  salary_period: dayjs().format('YYYY-MM-DD'),
  start_date: dayjs().format('YYYY-MM-DD'),
  end_date: dayjs().format('YYYY-MM-DD'),
})

const openForm = ref<boolean>(false)

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

const acceptCreate = async () => {
  try {
    await SalaryServices.createSalaryPeriod(createSalaryPeriodForm)

    employeeSalariesStore.refetch()

    notification({
      text: 'Salary period created successfully',
      duration: 3000,
      position: 'top-center',
      border: 'success',
    })
  } catch (e) {
    const err = getResponseError<{ [employee_id: string]: string }>(e)

    notification({
      text: err.message || 'Salary period created failed',
      duration: 3000,
      position: 'top-center',
      border: 'danger',
    })
  }
}

const cancleCreate = () => {
  openForm.value = false
}

const deleteSalaryPeriod = async (ePeriod: SalaryPeriod) => {
  try {
    await SalaryServices.deletePeriod(ePeriod.id)
    employeeSalariesStore.refetch()
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

type TreeSelectContext = {
  value: string
  label: string
  children?: TreeSelectContext[]
}

const filterNodeMethod = (value: string, data: TreeSelectContext) =>
  data.label.includes(value)

const employeesTreeSelect = computed(() => {
  if (employees.value.length === 0) {
    return []
  }

  const _employees = employees.value.reduce((prev, e) => {
    if (!prev.hasOwnProperty(e.department.name)) {
      prev[e.department.name] = {
        value: e.department.name,
        label: e.department.name,
        children: [],
      }
    }

    prev[e.department.name].children!.push({
      value: e.employee_id,
      label: `${e.name} - ${e.employee_id}`,
    })

    return prev
  }, {} as { [x: string]: TreeSelectContext })

  return Object.values(_employees)
})
</script>
