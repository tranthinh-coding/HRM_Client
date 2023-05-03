import { SalaryPeriod } from '~/types'
import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { cloneDeep } from 'lodash-unified'

type QueryResponse = {
  salary_period: SalaryPeriod[]
}

export const useSalariesStore = defineStore('E_SALARY', () => {
  const { result, refetch, stop, start, restart } = useQuery<QueryResponse>(
    gql`
      query EMPLOYEE_SALARIES {
        salary_period {
          id
          name
          start_date
          end_date

          salaries {
            id
            position
            coefficient_position
            department
            total_amount
            base_salary

            reward
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
        }
      }
    `,
    null,
    {
      pollInterval: 30000,
    }
  )

  const salaryPeriods = computed(() => {
    const res = cloneDeep(result.value?.salary_period || [])

    /**
     * bonus | deduction | working_hours | leave_hours are JSON formatted
     *
     * need to parse before returning
     */
    res.forEach((e) => {
      e.salaries.forEach((x) => {
        x.reward = JSON.parse(JSON.parse(x.reward as any))
        x.bonus = JSON.parse(JSON.parse(x.bonus as any))
        x.deduction = JSON.parse(JSON.parse(x.deduction as any))
        x.workings_hours = JSON.parse(JSON.parse(x.workings_hours as any))
        x.leave_hours = JSON.parse(JSON.parse(x.leave_hours as any))
      })
    })
    return res
  })

  return {
    refetch,
    stop,
    start,
    restart,
    salaryPeriods,
  }
})
