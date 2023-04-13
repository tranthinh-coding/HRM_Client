<template>
  <menu class="menu">
    <h2 class="menu-title">Filter</h2>
    <div class="option">
      <vs-select
        allow-create
        label-float
        v-model="filterSalary"
        label="Chọn mức lương"
        style="margin-top: 30px"
      >
        <vs-option :value="{ from: 0, to: 0 }" label="Chọn mức lương" />
        <vs-option
          v-for="(sl, index) in rangeSalary"
          :key="index"
          :value="{ from: sl.from, to: sl.to }"
          :label="sl.label"
        />
      </vs-select>
    </div>

    <div class="option">
      <vs-select
        allow-create
        label-float
        :label="t('hr.working-from')"
        v-model="filterJobType"
        style="margin-top: 30px"
      >
        <vs-option :value="' '" :label="t('hr.working-from')" />
        <vs-option
          v-for="(type, index) in jobTypes"
          :key="index"
          :value="type.name"
        />
      </vs-select>
    </div>

    <div class="option">
      <vs-select
        allow-create
        label-float
        :label="t('hr.position')"
        v-model="filterPosition"
        style="margin-top: 30px"
      >
        <vs-option :value="' '" :label="t('hr.position')" />
        <vs-option
          v-for="(position, index) in positions"
          :key="index"
          :value="position.name"
        />
      </vs-select>
    </div>
  </menu>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import JobsServices from '~/services/jobs-service'
import { useJobsStore } from '~/store'
import type { JobTypes, JobPosition } from '~/types/job'

const { t } = useI18n()

const { refetch } = useJobsStore()

const rangeSalary = [
  { from: 0, to: 3000000, label: 'Dưới 3 triệu' },
  { from: 3000000, to: 5000000, label: '3 - 10 triệu' },
  { from: 10000000, to: 25000000, label: '10 - 25 triệu' },
  { from: 25000000, to: 0, label: 'Trên 25 triệu' },
]

const filterSalary = ref<{ from: number; to: number }>()
const filterJobType = ref<string>()
const filterPosition = ref<string>()

const jobTypes = ref<JobTypes[]>([])
const positions = ref<JobPosition[]>()

watchEffect(() => {
  refetch({
    salary_to: filterSalary.value,
    position: filterPosition.value,
    type: filterJobType.value,
  })
})

const getJobTypes = async () => {
  try {
    jobTypes.value = await JobsServices.types()
  } catch (error) {
    jobTypes.value = []
  }
}

const getJobPositions = async () => {
  try {
    positions.value = await JobsServices.positions()
  } catch (error) {
    positions.value = []
  }
}

getJobTypes()
getJobPositions()
</script>

<style scoped lang="scss">
.menu {
  padding: 20px;
  padding-bottom: 40px;
  // background: #fff;
  border-radius: 14px;

  &-title {
    font-weight: 600;
    font-size: 20px;
  }
}
.el-slider {
  --el-slider-main-bg-color: #070606;
  --el-color-info: var(--el-color-info-light-3);
}
.el-slider__marks-text {
  opacity: 0.7;
  font-weight: 600;
}

.vs-checkbox {
  justify-content: flex-start;
}
.option {
  margin: 40px 0;

  &-title {
    font-size: 18px;
  }
}
</style>
