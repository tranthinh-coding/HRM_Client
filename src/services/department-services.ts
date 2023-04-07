import { DEPARTMENTS_API } from '~/config/app'
import { Department, DepartmentResponse } from '~/types/department'
import { useAxios } from '~/composables/axios'

export const departments = () =>
  useAxios.get<Department[], Department[]>(DEPARTMENTS_API)

export const create = (form: Pick<Department, 'name'>) =>
  useAxios.post<DepartmentResponse, DepartmentResponse>(DEPARTMENTS_API, form)

export const update = (form: Pick<Department, 'name' | 'id'>) =>
  useAxios.patch<DepartmentResponse, DepartmentResponse>(DEPARTMENTS_API, form)

export const remove = (form: Department) =>
  useAxios.delete<DepartmentResponse, DepartmentResponse>(DEPARTMENTS_API, {
    data: {
      id: form.id,
    },
  })

export const departmentServices = { departments, create, update, remove }

export default departmentServices
