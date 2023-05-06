import { gql } from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { computed } from 'vue'

import type { Job } from '~/types'

type QueryResponse = {
  jobs: Job[]
}

type QueryParams = {
  position?: string
  type?: string
  salary_to?: {
    from: number
    to: number
  }
}

export const useJobsStore = defineStore('JOBS', () => {
  const {
    result,
    refetch: _refetch,
    stop,
    restart,
    start,
  } = useQuery<QueryResponse, QueryParams>(
    gql`
      query JOBS {
        jobs {
          id
          title
          expired_date
          description
          count
          position
          no_of_vacancies
          experience
          age
          salary_from
          salary_to
          type
          status
          published
          start_date
          created_at
          updated_at
        }
      }
    `,
    () => ({}),
    {
      pollInterval: 40000,
    }
  )

  const jobs = computed(() => result.value?.jobs || [])

  const refetch = async (filter?: QueryParams) => {
    await _refetch(filter)
  }

  return {
    jobs,
    refetch,
    stop,
    restart,
    start,
  }
})
