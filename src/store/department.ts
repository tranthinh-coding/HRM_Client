import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import type { Department } from '~/types'

type QueryResponse = {
  departments: Department[]
}

export const useDepartmentStore = defineStore('Department', () => {
  const { result, refetch } = useQuery<QueryResponse>(
    gql`
      query departments {
        departments {
          id
          name
          description
          created_at
          updated_at
        }
      }
    `,
    null,
    {
      pollInterval: 40000,
    }
  )

  const departments = computed(() => result.value?.departments || [])

  return { departments, refetch }
})
