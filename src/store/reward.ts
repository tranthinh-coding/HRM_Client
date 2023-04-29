import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'

import { EmployeeReward } from '~/types'
import { useUserStore } from './user'

export const useRewardStore = defineStore('REWARD', () => {
  const userStore = useUserStore()

  const { result, stop, restart, start, refetch } = useQuery<{
    rewards: EmployeeReward[]
  }>(
    gql`
      query REWARDS($user_id: String!) {
        rewards(user_id: $user_id) {
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
              position
              department
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

  const rewards = computed(() => result.value?.rewards || [])

  return {
    rewards,
    stop,
    restart,
    start,
    refetch,
  }
})
