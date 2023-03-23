import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import { ApplicantServices } from '~/services/applicant-services'
import { Applicant } from '~/types/applicant'

const applicants = ref<Applicant[]>([])

export const useApplicant = () => {
  const refetch = async () => {
    try {
      applicants.value = await ApplicantServices.getAll()
    } catch (e) {
      ElMessage({
        message: `${(e as any).message}`,
        duration: 3000,
        type: 'error',
      })
      applicants.value = []
    }
  }

  return {
    applicants,
    refetch,
  }
}
