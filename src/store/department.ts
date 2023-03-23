import { ref } from 'vue'
import type { Department } from '~/types'
import departmentServices from '~/services/department-services'

const departments = ref<Department[]>([])

export const useDepartment = () => {
  const refetch = async () => {
    try {
      const response = await departmentServices.departments()

      departments.value = response
    } catch {
      departments.value = []
    }
  }

  return { departments, refetch }
}
