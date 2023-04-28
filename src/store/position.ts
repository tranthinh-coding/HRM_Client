import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import type { JobPosition } from '~/types'

type QueryResponse = {
  positions: JobPosition[]
}

export const usePositionStore = defineStore('POSITIONS', () => {
  const { result, refetch, stop, restart, start } = useQuery<QueryResponse>(
    gql`
      query POSITIONS {
        positions {
          name
        }
      }
    `,
    null,
    {
      pollInterval: 40000,
    }
  )

  const positions = computed(() => result.value?.positions || [])

  return { positions, refetch, stop, restart, start }
})
