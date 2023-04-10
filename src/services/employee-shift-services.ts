import { Timekeeping } from '~/types'
import { useAxios } from '~/composables'
import {
  EMPLOYEE_CREATE_TIMEKEEPING,
  EMPLOYEE_UPDATE_TIMEKEEPING,
} from '~/config'

export const createShift = (form: Omit<Timekeeping, 'id'>) =>
  useAxios.post<Timekeeping, Timekeeping>(EMPLOYEE_CREATE_TIMEKEEPING, form)

export const updateShift = (form: Timekeeping) =>
  useAxios.patch<Timekeeping, Timekeeping>(EMPLOYEE_UPDATE_TIMEKEEPING, form)

export const EmployeeShiftServices = {
  createShift,
  updateShift,
}

export default EmployeeShiftServices
