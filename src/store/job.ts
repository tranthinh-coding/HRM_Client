import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { JobsService } from '~/services/jobs-service'

import { Job, JobFilter } from '~/types/job'

const jobs = ref<Job[]>([])

export const useJob = () => {
  const refetch = async () => {
    try {
      jobs.value = await JobsService.getAll()
    } catch (e) {
      ElMessage({
        message: `${(e as any).message}`,
        duration: 3000,
        type: 'error',
      })
      jobs.value = []
    }
  }

  const filter = async (filter: JobFilter) => {
    try {
      jobs.value = await JobsService.filter(filter)
    } catch (error) {
      jobs.value = []
    }
  }

  return {
    jobs,
    refetch,
    filter,
  }
}
