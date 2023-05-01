import { useAxios } from '~/composables'
import { SALARY_PERIOD } from '~/config'

export const deletePeriod = (periodId: string | number) =>
  useAxios.delete(SALARY_PERIOD, {
    params: {
      id: periodId,
    },
  })

export const SalaryServices = {
  deletePeriod,
}

export default SalaryServices
