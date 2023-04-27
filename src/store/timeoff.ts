import { computed, reactive, unref, watch } from 'vue'
import { defineStore } from 'pinia'
import type {
  Timeoff,
  TimeoffType,
  RefetchOptions,
  EmployeeTimeoff,
} from '~/types'
import { lastDayOfTheWeek } from '~/utils'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { MaybeRef } from '@vueuse/core'
import { castArray, isArray } from 'lodash-unified'

type QueryResponse = {
  timeoffs: Timeoff[]
  timeoff_types: TimeoffType[]
}

type QueryParams = {
  day_request?: {
    from?: string
    to?: string
  }
  user_id?: string
}

type TimeoffRefetchOptions = RefetchOptions & {
  date?: MaybeRef<string>
}

export const useEmployeeTimeoffStore = defineStore('TIMEOFF', () => {
  const timeoffsWeekCached = new Set()
  const timeoffsCached = reactive<Map<number, Timeoff>>(new Map())

  const { result, refetch: _refetch } = useQuery<QueryResponse, QueryParams>(
    gql`
      query _etimeoffs($day_request: DateRange, $user_id: String) {
        timeoffs(
          day_request: $day_request
          user_id: $user_id
          orderBy: [{ column: DAY_REQUEST, order: DESC }]
        ) {
          id
          day_request
          time_from
          time_to
          reason
          type_timeoff
          status
          user_id
          coefficient

          user {
            name
            email
            user_id
            status
            role
          }
        }
        timeoff_types {
          id
          name
          coefficient
        }
      }
    `,
    () => ({}),
    {
      pollInterval: 40000,
    }
  )

  const timeoffTypes = computed(() => result.value?.timeoff_types || [])

  const timeoffsArray = computed(() => Array.from(timeoffsCached.values()))

  const timeoffs = computed(() =>
    timeoffsArray.value.reduce<{
      [eid: string]: EmployeeTimeoff
    }>((source, curr) => {
      if (!source[curr.user_id]) {
        source[curr.user_id] = {}
      }

      if (source[curr.user_id][curr.day_request]) {
        if (!isArray(source[curr.user_id][curr.day_request])) {
          source[curr.user_id][curr.day_request] = [
            source[curr.user_id][curr.day_request] as any,
          ]
        }
        ;(source[curr.user_id][curr.day_request] as unknown as Timeoff[]).push(
          curr
        )
      } else {
        source[curr.user_id][curr.day_request] = curr
      }
      return source
    }, {})
  )

  const timeoffsResolved = (eid?: string, date?: string) => {
    let etimeoff = timeoffs.value[eid || 'null']?.[date || 'null']

    if (!etimeoff) return []

    etimeoff = castArray(etimeoff)
    return etimeoff.filter((e) => e?.status === 'Resolved')
  }

  const refetch = async (
    options: TimeoffRefetchOptions = {},
    query?: QueryParams
  ) => {
    const lastDayOfWeek = lastDayOfTheWeek(unref(options.date))
    if (!timeoffsWeekCached.has(lastDayOfWeek) || options.force) {
      timeoffsWeekCached.add(lastDayOfWeek)
      await _refetch(query)
    }
  }

  watch(result, (val) => {
    val?.timeoffs.forEach((timekeeping) => {
      timeoffsCached.set(timekeeping.id, timekeeping)
    })
  })

  return {
    timeoffs,
    timeoffsArray,
    timeoffTypes,
    refetch,
    timeoffsResolved,
  }
})
