import { EMPLOYE_INFO_CREATE } from '~/config/app'
import { Employee } from '~/types/employee'
import { useAxios } from '~/composables'
import {
  EMPLOYEE_API,
  EMPLOYEE_API_CREATE,
  EMPLOYEE_SEARCH,
  EMPLOYEE_PROFILE,
  EMPLOYEE_SAVE_PROFILE,
  EMPLOYEE_REQUEST_TIMEOFF,
} from '~/config'
import type { SuccessResponse } from '~/types/request'
import type { User } from '~/types/user'

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

export default {
  getAll,
  create,
  infoCreate,
  search,
  getProfile,
  saveProfile,
  requestTimeoff,
  updateRequestTimeoff,
}
