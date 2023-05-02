import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'

import { useUserStore } from './user'
import type { EmployeeDiscipline } from '~/types'

type Response = {
  disciplines: EmployeeDiscipline[]
}

export const useDisciplineStore = defineStore('DISCIPLINE', () => {
  const userStore = useUserStore()

  const { result, stop, restart, start, refetch } = useQuery<Response>(
    gql`
      query DISCIPLINE($user_id: String!) {
        disciplines(user_id: $user_id) {
          id
          name
          description
          salary
          start_date
          user_id
          created_at

          user {
            user_id
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
    `,
    () => ({ user_id: userStore.user?.user_id }),
    {
      pollInterval: 40000,
    }
  )

  const disciplines = computed(() => result.value?.disciplines || [])

  return {
    disciplines,
    stop,
    restart,
    start,
    refetch,
  }
})
