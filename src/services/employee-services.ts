import { EMPLOYE_INFO_CREATE } from '~/config/app'
import { useAxios } from '~/composables'
import {
  EMPLOYEE_API,
  EMPLOYEE_API_CREATE,
  EMPLOYEE_SEARCH,
  EMPLOYEE_PROFILE,
  EMPLOYEE_SAVE_PROFILE,
  EMPLOYEE_REQUEST_TIMEOFF,
  EMPLOYEE_REWARD,
  EMPLOYEE_DISCIPLINE,
} from '~/config'
import type { Employee, EmployeeReward, User, SuccessResponse } from '~/types'

export const getAll = () => useAxios.get<Employee[], Employee[]>(EMPLOYEE_API)

export const create = (form: any) =>
  useAxios.post<SuccessResponse, SuccessResponse>(EMPLOYEE_API_CREATE, form)

export const infoCreate = () =>
  useAxios.get<User[], User[]>(EMPLOYE_INFO_CREATE)

export const search = (form: any) =>
  useAxios.post<Employee[], Employee[]>(EMPLOYEE_SEARCH, form)

export const getProfile = (id: string) =>
  useAxios.post(EMPLOYEE_PROFILE, { user_id: id })

export const saveProfile = (form: any) =>
  useAxios.post<SuccessResponse, SuccessResponse>(EMPLOYEE_SAVE_PROFILE, form)

export const requestTimeoff = (form: any) =>
  useAxios.post<SuccessResponse, SuccessResponse>(
    EMPLOYEE_REQUEST_TIMEOFF,
    form
  )

export const updateRequestTimeoff = (form: any) =>
  useAxios.patch<SuccessResponse, SuccessResponse>(
    EMPLOYEE_REQUEST_TIMEOFF,
    form
  )

export const createReward = (
  form: Omit<EmployeeReward, 'user' | 'created_at' | 'id'>
) => useAxios.post(EMPLOYEE_REWARD, form)

export const removeEmployeeReward = (id: number) =>
  useAxios.delete<SuccessResponse, SuccessResponse>(EMPLOYEE_REWARD, {
    data: { id },
  })

export const createDiscipline = (form: any) =>
  useAxios.post(EMPLOYEE_DISCIPLINE, form)

export const removeEmployeeDiscipline = (id: number) =>
  useAxios.delete<SuccessResponse, SuccessResponse>(EMPLOYEE_DISCIPLINE, {
    data: { id },
  })

export default {
  getAll,
  create,
  infoCreate,
  search,
  getProfile,
  saveProfile,
  requestTimeoff,
  updateRequestTimeoff,
  createReward,
  removeEmployeeReward,
  createDiscipline,
  removeEmployeeDiscipline,
}
