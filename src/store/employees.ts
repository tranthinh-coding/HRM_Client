import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { includes } from 'lodash-unified'
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
            includes(e.employee_id.toLowerCase(), employee_id.toLowerCase())
          )
            return true
          if (
            position &&
            includes(e.position.name.toLowerCase(), position.toLowerCase())
          )
            return true
          if (
            department &&
            includes(e.department.name.toLowerCase(), department.toLowerCase())
          )
            return true
          if (name && includes(e.name.toLowerCase(), name.toLowerCase()))
            return true
          return false
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
