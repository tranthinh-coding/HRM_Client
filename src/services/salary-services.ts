import { useAxios } from '~/composables'
import { SALARY_PERIOD } from '~/config'

export const deletePeriod = (periodId: string | number) =>
  useAxios.delete(SALARY_PERIOD, {
    params: {
      id: periodId,
    },
  })

export type SalaryPeriodCreateRequest = {
  employees: string[]
  salary_period: string
  start_date: string
  end_date: string
}

export const createSalaryPeriod = (form: SalaryPeriodCreateRequest) =>
  useAxios.post(SALARY_PERIOD, form)

export const SalaryServices = {
  deletePeriod,
  createSalaryPeriod,
}

export default SalaryServices
