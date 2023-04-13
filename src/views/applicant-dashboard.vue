<template>
  <vs-input
    style="width: 200px"
    v-model="search"
    :placeholder="t('job.findAJob')"
  >
    <template #icon>
      <i class="bx bx-user"></i>
    </template>
  </vs-input>
  <div class="job-container">
    <job-list :jobs="filterJobs" @open-detail="handleOpenJob" />

    <transition name="fade" appear>
      <job-detail v-if="job" :job="job" @close="handleCloseJob" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import JobDetail from '~/components/applicant/job-detail.vue'
import JobList from '~/components/applicant/job-list.vue'
import { useJobsStore } from '~/store/job'
import { Job } from '~/types'

const { t } = useI18n()
const search = ref('')

const job = ref<Job | null>(null)

const jobsStore = useJobsStore()
const { jobs } = storeToRefs(jobsStore)

const handleOpenJob = (_job: Job) => {
  job.value = _job
}

const handleCloseJob = () => {
  job.value = null
}

const filterJobs = computed(
  () =>
    jobs.value?.filter(
      (job) =>
        !search.value ||
        job.title.toLowerCase().includes(search.value.toLowerCase())
    ) || []
)
</script>

<style scoped lang="scss">
.job-container {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}
</style>
