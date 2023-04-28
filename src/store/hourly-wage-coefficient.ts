import { computed } from 'vue'
import { defineStore } from 'pinia'
import { HourlyWageCoefficient } from '~/types'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useHourlyWageCoefficientsStore = defineStore(
  'HourlyWageCoefficients',
  () => {
    const { result, refetch, stop, restart, start } = useQuery<{
      hourly_wage_coefficients: HourlyWageCoefficient[]
    }>(
      gql`
        query HourlyWageCoefficients {
          hourly_wage_coefficients {
            id
            type_of_time
            coefficient
          }
        }
      `,
      null,
      {
        pollInterval: 40000,
      }
    )

    const hourlyWageCoefficients = computed<HourlyWageCoefficient[]>(
      () => result.value?.hourly_wage_coefficients || []
    )

    return {
      hourlyWageCoefficients,
      refetch,
      stop,
      restart,
      start,
    }
  }
)
