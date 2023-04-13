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
  const { result, refetch: _refetch } = useQuery<QueryResponse, QueryParams>(
    gql`
      query JOBS {
        jobs {
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
          start_date
          created_at
          updated_at
        }
      }
    `
  )

  const jobs = computed(() => result.value?.jobs || [])

  const refetch = async (filter?: QueryParams) => {
    await _refetch(filter)
  }

  return {
    jobs,
    refetch,
  }
})
