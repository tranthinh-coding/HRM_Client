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

export const useEmployeesStore = defineStore('EMPLOYEES', () => {
  const { result, refetch, stop, restart, start } = useQuery<QueryResponse>(
    gql`
      query EMPLOYEES($employee_id: String, $position: String, $name: String) {
        employees(employee_id: $employee_id, position: $position, name: $name) {
          data {
            name
            email
            employee_id
            position
            department
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

  return {
    employees,
    refetch,
    stop,
    restart,
    start,
  }
})
