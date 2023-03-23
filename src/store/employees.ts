import { Employee } from '~/types/employee'
import { ref } from 'vue'
import EmployeeServices from '~/services/employee-services'

export const employees = ref<Employee[]>([])

export const refetch = async () => {
  try {
    employees.value = await EmployeeServices.getAll()
  } catch (error) {
    employees.value = []
  }
}
