import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { clone, isNil } from 'lodash-unified'

import { useUserStore } from './user'
import type { DateFormat, Salary } from '~/types'

type QueryResponse = {
  employee_salaries: Salary[]
}

type QueryParams = {
  user_id: string
  salary_calculation?: string
  department?: string
  position?: string
  start_date?: DateFormat
  end_date?: DateFormat
}

export const useSalariesStore = defineStore('E_SALARY', () => {
  const user = useUserStore()

  const {
    result,
    refetch: _refetch,
    stop,
    start,
    restart,
  } = useQuery<QueryResponse, QueryParams>(
    gql`
      query EMPLOYEE_SALARIES($user_id: String!) {
        employee_salaries(user_id: $user_id) {
          id
          position
          coefficient_position
          total_amount
          salary_calculation
          base_salary
          bonus
          deduction
          workings_hours
          leave_hours
          start_date
          end_date
          user_id

          user {
            name
            email

            employee_information {
              department
            }
          }
        }
      }
    `,
    () => ({
      user_id: user.user?.user_id || '',
    }),
    {
      pollInterval: 30000,
    }
  )

  const employeeSalaries = computed(() => {
    const e = result.value?.employee_salaries
    if (isNil(e)) {
      return []
    }

    return e.reduce((pre, curr) => {
      const rs = clone(curr)

      rs.bonus = JSON.parse(JSON.parse(curr.bonus as any))
      rs.deduction = JSON.parse(JSON.parse(curr.deduction as any))
      rs.workings_hours = JSON.parse(JSON.parse(curr.workings_hours as any))
      rs.leave_hours = JSON.parse(JSON.parse(curr.leave_hours as any))

      console.log(rs)

      return [...pre, rs]
    }, [] as Salary[])
  })

  const refetch = async (query: Omit<QueryParams, 'user_id'>) => {
    const options = {
      ...query,
      user_id: user.user?.user_id || '',
    }
    await _refetch(options)
  }

  return {
    refetch,
    stop,
    start,
    restart,
    employeeSalaries,
  }
})
