<template>
  <div class="jobs">
    <el-row :gutter="20">
      <el-col :xs="24" :md="12" v-for="(job, index) in jobs" :key="index">
        <div class="job">
          <div class="job-heading">
            <h3 class="job-title" @click="seeJobDetail(job)">
              {{ job.title }}
            </h3>
          </div>
          <div class="job-department">{{ job.department }}</div>
          <div class="job-footer">
            <div class="job-info">
              <el-tag>{{ job.position }}</el-tag>
              <el-tag> Đến {{ formatCurrencyInWords(job.salary_to) }} </el-tag>
              <el-tag>{{ job.type }}</el-tag>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Job } from '~/types/job'
import { formatCurrencyInWords } from '~/utils'

defineProps<{
  jobs: Job[]
}>()

const emit = defineEmits({
  openDetail: (job: Job) => job,
})

const seeJobDetail = (job: Job) => {
  emit('openDetail', job)
}
</script>

<style scoped lang="scss">
.jobs {
  margin-top: 20px;
  width: 100%;
}
.job {
  border-radius: 16px;
  background-color: getColor(bg-color);
  padding: 30px 30px;
  margin-bottom: 20px;

  &-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .job-title {
      cursor: pointer;
      // font-weight: 600;
      font-size: 18px;
      // text-overflow: ellipsis;

      // /* Needed to make it work */
      // overflow: hidden;
      // white-space: nowrap;
    }
    .bookmark {
      color: getColor(fill-color, darker);
    }
  }

  &-department {
    font-size: 14px;
    opacity: 0.7;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-info {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>
