import { computed, reactive, unref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Timeoff, RefetchOptions, EmployeeTimeoff } from '~/types'
import { lastDayOfTheWeek } from '~/utils'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { MaybeRef } from '@vueuse/core'
import { isArray } from 'lodash-unified'

type QueryResponse = {
  timeoffs: Timeoff[]
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

          user {
            name
            email
            user_id
            status
            role
          }
        }
      }
    `
  )

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
    refetch,
  }
})
