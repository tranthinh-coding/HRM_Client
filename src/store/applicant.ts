import { useQuery } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import gql from 'graphql-tag'
import { Applicant } from '~/types'

type QueryResponse = {
  applicants: Applicant[]
}

export const useApplicantsStore = defineStore('APPLICANTS', () => {
  const { result, refetch, stop, restart, start } = useQuery<QueryResponse>(
    gql`
      query APPLICANTS {
        applicants {
          id
          user_id
          job_id
          message
          status

          user {
            id
            name
            user_id
            email
          }

          job {
            id
            title
            description
          }
        }
      }
    `,
    null,
    {
      pollInterval: 40000,
    }
  )

  const applicants = computed(() => result.value?.applicants || [])

  return {
    applicants,
    refetch,
    stop,
    restart,
    start,
  }
})
