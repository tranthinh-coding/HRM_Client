import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import { useUserStore } from './user'

import type { Employee } from '~/types'
import { computed } from 'vue'

export type QueryResponse = {
  employee: Employee
}

export const useEmployeeDetail = defineStore('EMPLOYEE_DETAIL', () => {
  const user = useUserStore()

  const { result, stop, start, refetch, restart } = useQuery<QueryResponse>(
    gql`
      query EMPLOYEE_DETAILT($eid: String!) {
        employee(employee_id: $eid) {
          id
          name
          email
          employee_id
          position_id
          department_id

          position {
            id
            name
            coefficient
          }

          department {
            id
            name
            description
          }
        }
      }
    `,
    () => ({
      eid: user.user?.user_id,
    })
  )

  const employee = computed(() => result.value?.employee)

  return { employee, stop, start, refetch, restart }
})
