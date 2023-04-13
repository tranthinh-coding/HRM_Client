import { computed } from 'vue'
import { defineStore } from 'pinia'
import { HourlyWageCoefficient } from '~/types'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useHourlyWageCoefficientsStore = defineStore(
  'HourlyWageCoefficients',
  () => {
    const { result, refetch } = useQuery<{
      hourly_wage_coefficients: HourlyWageCoefficient[]
    }>(
      gql`
        query hourlyWageCoefficients {
          hourly_wage_coefficients {
            id
            type_of_time
            coefficient
          }
        }
      `
    )

    const hourlyWageCoefficients = computed<HourlyWageCoefficient[]>(
      () => result.value?.hourly_wage_coefficients || []
    )

    return {
      hourlyWageCoefficients,
      refetch,
    }
  }
)
