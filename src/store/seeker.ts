import { ref } from 'vue'
import ApplicantServices from '~/services/applicant-services'

export const seekders = ref<number>(0)

export const refetch = async () => {
  try {
    seekders.value = await ApplicantServices.getTotalSeekers()
  } catch (error) {
    seekders.value = 0
  }
}
