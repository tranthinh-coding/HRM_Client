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
  const { result, refetch } = useQuery<QueryResponse>(
    gql`
      query EMPLOYEES {
        employees {
          data {
            name
            email
            employee_id
            position
            department
          }
        }
      }
    `
  )

  const employees = computed(() => result.value?.employees.data || [])

  return {
    employees,
    refetch,
  }
})
