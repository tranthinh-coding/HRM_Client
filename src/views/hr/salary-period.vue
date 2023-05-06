<template>
  <div class="wrapper">
    <div class="back-button" @click="back">
      <el-icon size="17"> <arrow-left /> </el-icon>
    </div>
    <h1 class="page-title">
      Salary period
      <template v-if="salaryPeriod">
        -
        <el-tag size="large">
          <span class="text-lg">{{ salaryPeriod.name }}</span>
        </el-tag>
      </template>
    </h1>

    <!-- <div class="mt-4">
      <vs-button color="dribbble" type="flat">
        <div class="flex items-center gap-1">
          <el-icon>
            <export />
          </el-icon>
          Xuat xlsx
        </div>
      </vs-button>
    </div> -->
    <div class="box my-8">
      <el-table :data="salaryPeriod?.salaries">
        <el-table-column fixed type="expand">
          <template #default="{ row }: { row: Salary }">
            <div class="pl-8">
              <!-- <vs-button color="dribbble" type="flat">
                <div class="flex items-center gap-1 text-lg">
                  <el-icon>
                    <export />
                  </el-icon>
                  Xuat xlsx
                </div>
              </vs-button> -->

              <div class="flex gap-50px items-start justify-between">
                <div class="my-4 max-w-300px">
                  <h2 class="text-lg my-2">Khoan tro cap:</h2>
                  <el-table
                    :data="row.bonus"
                    :fit="false"
                    max-height="200"
                    show-summary
                    :summary-method="
                      (param) =>
                        getSummaries(param, {
                          first: 'Tong',
                          cb: [moneyFormat],
                        })
                    "
                  >
                    <el-table-column
                      width="150"
                      label="Ten khoan tro cap"
                      prop="name"
                    />
                    <el-table-column width="150" label="Muc tien" prop="amount">
                      <template #default="{ row }: { row: SalaryBonus }">
                        {{ moneyFormat(row.amount) }}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="my-4 max-w-390px">
                  <h2 class="text-lg my-2">Khau tru:</h2>
                  <el-table
                    :data="row.deduction"
                    max-height="200"
                    show-summary
                    :summary-method="
                      (param) =>
                        getSummaries(param, {
                          first: 'Tong',
                          cb: [moneyFormat],
                        })
                    "
                  >
                    <el-table-column
                      width="150"
                      label="Ten"
                      prop="name"
                      :fit="false"
                    />
                    <el-table-column width="120" label="Muc tien" prop="amount">
                      <template #default="{ row }: { row: SalaryDeduction }">
                        {{ moneyFormat(row.amount) }}
                      </template>
                    </el-table-column>
                    <el-table-column width="120" label="Ngay" prop="date" />
                  </el-table>
                </div>
                <div class="my-4 max-w-390px">
                  <h2 class="text-lg my-2">Khen thuong:</h2>
                  <el-table
                    :data="row.reward"
                    max-height="200"
                    show-summary
                    :summary-method="
                      (param) =>
                        getSummaries(param, {
                          first: 'Tong',
                          cb: [moneyFormat],
                        })
                    "
                  >
                    <el-table-column
                      width="150"
                      label="Ten"
                      prop="name"
                      :fit="false"
                    />
                    <el-table-column width="120" label="Muc tien" prop="amount">
                      <template #default="{ row }: { row: SalaryReward }">
                        {{ moneyFormat(row.amount) }}
                      </template>
                    </el-table-column>
                    <el-table-column width="120" label="Ngay" prop="date" />
                  </el-table>
                </div>
              </div>
              <div class="flex gap-50px">
                <div class="my-4 max-w-600px">
                  <h2 class="text-lg my-2">Khoang thoi gian lam viec:</h2>
                  <el-table
                    :data="row.workings_hours"
                    :fit="false"
                    max-height="300"
                    show-summary
                    :summary-method="
                      (param) =>
                        getSummaries(param, {
                          first: 'Tong',
                          cb: [(val) => `${val} tieng`, false, moneyFormat],
                        })
                    "
                  >
                    <el-table-column
                      width="150"
                      label="Loai gio lam"
                      prop="type_of_time"
                    />
                    <el-table-column
                      width="150"
                      label="Thoi gian"
                      prop="total_hours"
                    >
                      <template #default="{ row }: { row: SalaryWorkingHours }">
                        {{ row.total_hours }} tieng
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="150"
                      label="He so luong"
                      prop="coefficient"
                    />
                    <el-table-column width="150" label="Muc tien" prop="amount">
                      <template #default="{ row }: { row: SalaryWorkingHours }">
                        {{ moneyFormat(row.amount) }}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="my-4 max-w-600px">
                  <h2 class="text-lg my-2">Khoang thoi gian nghi:</h2>
                  <el-table
                    :data="row.leave_hours"
                    :fit="false"
                    max-height="300"
                    show-summary
                    :summary-method="
                      (param) =>
                        getSummaries(param, {
                          first: 'Tong',
                          cb: [(val) => `${val} tieng`, false, moneyFormat],
                        })
                    "
                  >
                    <el-table-column
                      width="150"
                      label="Ngay nghi"
                      prop="day_request"
                    />
                    <el-table-column
                      width="150"
                      label="Thoi gian"
                      prop="total_hours"
                    />
                    <el-table-column
                      width="150"
                      label="Tra luong"
                      prop="coefficient"
                    >
                      <template #default="{ row }: { row: SalaryLeaveHours }">
                        {{
                          row.coefficient == 0
                            ? 'Nghi khong luong'
                            : 'Nghi tieu chuan'
                        }}
                      </template>
                    </el-table-column>
                    <el-table-column width="150" label="Muc tien" prop="amount">
                      <template #default="{ row }: { row: SalaryLeaveHours }">
                        {{ moneyFormat(row.amount) }}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" width="140" fixed="left">
          <template #default="{ row }: { row: SalaryReduced }">
            <vs-tooltip :show-after="400" :hide-after="1000">
              <template #content>
                <div class="flex flex-col items-start gap-1">
                  <div class="flex gap-2 items-center">
                    <el-icon size="18"><building-outline /></el-icon>
                    {{ row.user.name }}
                  </div>
                  <div class="flex gap-2 items-center">
                    <el-icon size="18">
                      <email />
                    </el-icon>
                    {{ row.user.email }}
                  </div>
                  <div class="flex gap-2 items-center">
                    <el-icon size="18">
                      <people />
                    </el-icon>
                    {{ row.user.user_id }}
                  </div>
                  <div class="flex gap-2 items-center">
                    <el-icon size="18"><user-octagon-outline /></el-icon>
                    {{ row.position }}
                  </div>
                </div>
              </template>
              <div class="flex items-center gap-2">
                <vs-avatar>
                  <template #text>
                    {{ row.user.name }}
                  </template>
                </vs-avatar>
                <span class="whitespace-nowrap">{{ row.user.name }}</span>
              </div>
            </vs-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="Luong co ban" min-width="110">
          <template #default="{ row }: { row: SalaryReduced }">
            {{ moneyFormat(row.base_salary) }} / gio
          </template>
        </el-table-column>

        <el-table-column label="Tro cap" min-width="110">
          <template #default="{ row }: { row: SalaryReduced }">
            {{ moneyFormat(row.__total_bonus__) }}
          </template>
        </el-table-column>

        <el-table-column label="Khau tru" min-width="110">
          <template #default="{ row }: { row: SalaryReduced }">
            {{ moneyFormat(row.__total_deduction__) }}
          </template>
        </el-table-column>

        <el-table-column label="Tong nhan" min-width="110">
          <template #default="{ row }: { row: SalaryReduced }">
            {{ moneyFormat(row.total_amount) }}
          </template>
        </el-table-column>

        <el-table-column label="Thoi gian nghi" min-width="120">
          <template #default="{ row }: { row: SalaryReduced }">
            {{ row.__total_leave_time__ }} tieng
          </template>
        </el-table-column>

        <el-table-column label="Thoi gian lam" min-width="118">
          <template #default="{ row }: { row: SalaryReduced }">
            {{ row.__total_working_time__ }} tieng
          </template>
        </el-table-column>

        <el-table-column min-width="130" label="Chuc vu">
          <template #default="{ row }: { row: SalaryReduced }">
            <el-tag>{{ row.position }}</el-tag>
            <!--  -<el-tag effect="plain">{{ row.coefficient_position }}</el-tag> -->
          </template>
        </el-table-column>

        <el-table-column width="100" label="Phong ban" :tree-props="{}">
          <template #default="{ row }: { row: SalaryReduced }">
            <el-tag type="warning">{{ row.department }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column width="100" label="Tu ngay" prop="start_date" />
        <el-table-column width="100" label="Den ngay" prop="end_date" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { cloneDeep } from 'lodash-unified'

import { useSalariesStore } from '~/store/salaries'
import { moneyFormat } from '~/utils'

import type {
  Salary,
  SalaryBonus,
  SalaryDeduction,
  SalaryLeaveHours,
  SalaryPeriod,
  SalaryReward,
  SalaryWorkingHours,
} from '~/types'
import type { TableColumnCtx } from 'element-plus'

interface SummaryMethodProps<T> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

interface SalaryReduced extends Salary {
  __total_bonus__: number
  __total_deduction__: number
  __total_leave_time__: number
  __total_working_time__: number
}

interface SalaryPeriodReduced extends SalaryPeriod {
  salaries: SalaryReduced[]
}

const props = defineProps<{
  id: number | string
}>()

const router = useRouter()

const salaryPeriodStore = useSalariesStore()
const { salaryPeriods } = storeToRefs(salaryPeriodStore)

/**
 * {
 *    bonus: [ { time: 10, name: 'thuong' }, { time: 9 } ]
 *
 * }
 * =>
 * {
 *    _total_bonus: 19
 *    bonus: [ { time: 10, name: 'thuong' }, { time: 9 } ]
 * }
 */
const salaryPeriod = computed<SalaryPeriodReduced | undefined>(() => {
  const salaryPeriodsExist = salaryPeriods.value.find((e) => e.id == props.id)
  if (!salaryPeriodsExist) return undefined

  const salaryPeriodCustom: SalaryPeriodReduced = {
    ...salaryPeriodsExist,

    salaries: salaryPeriodsExist.salaries.map<SalaryReduced>((salary) => {
      const __salary__: SalaryReduced = cloneDeep({
        ...salary,
        __total_bonus__: 0,
        __total_deduction__: 0,
        __total_leave_time__: 0,
        __total_working_time__: 0,
      })

      __salary__.__total_bonus__ = salary.bonus.reduce(
        (prev, curr) => prev + curr.amount,
        0
      )
      __salary__.__total_deduction__ = salary.deduction.reduce(
        (prev, curr) => prev + curr.amount,
        0
      )
      __salary__.__total_leave_time__ = salary.leave_hours.reduce(
        (prev, curr) => prev + curr.total_hours,
        0
      )
      __salary__.__total_working_time__ = salary.workings_hours.reduce(
        (prev, curr) => prev + curr.total_hours,
        0
      )

      return __salary__
    }),
  }
  return salaryPeriodCustom
})

const back = () => {
  router.push({ name: 'hr/employee-salary' })
}

/**
 * Docs:
 * @param param
 * @param col.cb Array<null | false | (val: number) => string>
 *
 * @returns string[]
 */
const getSummaries = <T extends Record<any, any> = Record<any, any>>(
  param: SummaryMethodProps<T>,
  col: {
    first: string
    cb: Array<((val: number) => string) | null | false>
  } = {
    first: 'Total',
    cb: [(val: number) => `${val}`],
  }
) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = col.first
      return
    }
    const values = data.map((item) => Number(item[column.property]))

    const callback =
      index < columns.length
        ? col.cb[index - 1] !== null
          ? col.cb[index - 1]!
          : (val: number) => `${val}`
        : (val: number) => `${val}`

    if (callback == false) {
      return (sums[index] = '')
    }

    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = callback(
        values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!Number.isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)
      )
    } else {
      sums[index] = ''
    }
  })

  return sums
}
</script>

<style lang="scss" scoped>
.wrapper {
  border-radius: 20px;
  position: relative;
}

.page-title {
  font-size: 24px;
  padding-top: 6px;
  margin-left: 60px;
}

.back-button {
  position: absolute;
  top: 6px;
  left: 0;
  height: 36px;
  width: 40px;
  border-radius: 40px 18px 18px 18px;
  background-color: getColor(bg-color);
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 32px 1px rgba(0, 0, 0, getCssVar(shadow-opacity));
  }
}
</style>
