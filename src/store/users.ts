import { useQuery } from '@vue/apollo-composable'
import { isGuest } from './../config/role'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { User } from '~/types'
import gql from 'graphql-tag'

type QueryResponse = {
  users: {
    data: User[]
  }
}

type FilterOptions = {
  role?: string
}

export const useUsersStore = defineStore('USERS', () => {
  const { result, refetch } = useQuery<QueryResponse>(
    gql`
      query USERS {
        users {
          data {
            id
            name
            email
            user_id
            join_date
            status
            role
            avatar
            email_verified_at
            created_at
            updated_at

            profile_information {
              date_of_birth
              gender
              address
              country
              phone_number
              nationality
              citizen_id_card
            }
          }
        }
      }
    `,
    null,
    {
      pollInterval: 40000,
    }
  )

  const seekers = computed(() => users.value.filter((e) => isGuest(e.role)))

  const users = computed(() => result.value?.users.data || [])

  const localFilter = computed<(options: FilterOptions) => User[]>(
    () => (options: FilterOptions) => {
      let keys = Object.keys(options)

      return users.value.filter((e) => {
        // @ts-ignore
        let acceptedKeys = keys.filter((key) => e[key] === options[key])
        return acceptedKeys.length === keys.length
      })
    }
  )

  return {
    users,
    seekers,
    refetch,
    localFilter,
  }
})
