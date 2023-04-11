import { Timekeeping } from '~/types'
import { useAxios } from '~/composables'
import {
  EMPLOYEE_CREATE_TIMEKEEPING,
  EMPLOYEE_UPDATE_TIMEKEEPING,
} from '~/config'

export const createTimekeeping = (form: Omit<Timekeeping, 'id'>) =>
  useAxios.post<Timekeeping, Timekeeping>(EMPLOYEE_CREATE_TIMEKEEPING, form)

export const updateTimekeeping = (form: Timekeeping) =>
  useAxios.patch<Timekeeping, Timekeeping>(EMPLOYEE_UPDATE_TIMEKEEPING, form)

// export const getAllTimekeeping = (form: Timekeeping) =>

export const EmployeeTimekeepingServices = {
  createTimekeeping,
  updateTimekeeping,
}

export default EmployeeTimekeepingServices
