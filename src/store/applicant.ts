import { useQuery } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import gql from 'graphql-tag'
import { Applicant } from '~/types'

type QueryResponse = {
  applicants: Applicant[]
}

export const useApplicantsStore = defineStore('APPLICANTS', () => {
  const { result, refetch } = useQuery<QueryResponse>(
    gql`
      query APPLICANTS {
        applicants {
          user_id
          job_id
          message
          status

          user {
            name
            user_id
            email
          }

          job {
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
  }
})
