import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import type { Employee } from '~/types/employee'

type QueryResponse = {
  employees: {
    data: Employee[]
  }
}

export type EmployeeQuery = {
  employee_id?: string
  position?: string
  name?: string
  department?: string
}

export const useEmployeesStore = defineStore('EMPLOYEES', () => {
  const { result, refetch, stop, restart, start } = useQuery<QueryResponse>(
    gql`
      query EMPLOYEES($employee_id: String, $name: String) {
        employees(employee_id: $employee_id, name: $name) {
          data {
            name
            email
            employee_id
            position {
              id
              name
            }
            department {
              id
              name
            }
          }
        }
      }
    `,
    () => ({ employee_id: '', name: '', position: '' }),
    {
      pollInterval: 40000,
    }
  )

  const employees = computed(() => result.value?.employees.data || [])

  const localSearch = computed(
    () =>
      ({ employee_id, position, department, name }: EmployeeQuery) => {
        return employees.value.filter((e) => {
          if (!employee_id && !position && !department && !name) return true

          if (
            employee_id &&
            !e.employee_id.toLowerCase().includes(employee_id.toLowerCase())
          )
            return false
          if (
            position &&
            !e.position.name.toLowerCase().includes(position.toLowerCase())
          )
            return false
          if (
            department &&
            !e.department.name.toLowerCase().includes(department.toLowerCase())
          )
            return false
          if (name && !e.name.toLowerCase().includes(name.toLowerCase()))
            return false

          return true
        })
      }
  )

  return {
    employees,
    refetch,
    stop,
    restart,
    start,
    localSearch,
  }
})
