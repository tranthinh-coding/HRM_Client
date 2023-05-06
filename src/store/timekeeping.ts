import { computed, reactive, unref, watch } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import type { Timekeeping, RefetchOptions, EmployeeTimekeepings } from '~/types'
import { lastDayOfTheWeek } from '~/utils'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { MaybeRef } from '@vueuse/core'
import { isArray } from 'lodash-unified'
import { useUserStore } from './user'
import { isHR } from '~/config'

type QueryResponse = {
  timekeepings: Timekeeping[]
}

type QueryParams = {
  from?: string
  to?: string
  user_id?: string
}

type TimekeepingRefetchOptions = RefetchOptions & {
  date?: MaybeRef<string>
}

export const useEmployeeTimekeepingStore = defineStore('TIMEKEEPING', () => {
  const timekeepingsWeekCached = new Set()
  const timekeepingsCached = reactive<Map<number, Timekeeping>>(new Map())

  const user = useUserStore()

  const {
    result,
    refetch: _refetch,
    restart,
    stop: _stop,
    start,
  } = useQuery<QueryResponse, QueryParams>(
    gql`
      query TIMEKEEPINGS($from: Date!, $to: Date!, $user_id: String) {
        timekeepings(date: { from: $from, to: $to }, user_id: $user_id) {
          id
          name
          date
          type_of_time
          time_from
          time_to
          coefficient
          user_id

          user {
            id
            user_id
            email
          }

          histories {
            id
            message
            time_from
            time_to
            type_of_time
            coefficient

            user {
              id
              name
            }
          }
        }
      }
    `,
    () => ({
      from: lastDayOfTheWeek(),
      to: dayjs(lastDayOfTheWeek()).add(6, 'days').format('YYYY-MM-DD'),
      user_id: isHR(user.user?.role) ? undefined : user.user?.user_id,
    }),
    {
      pollInterval: 40000,
    }
  )

  const timekeepingsArray = computed(() =>
    Array.from(timekeepingsCached.values())
  )

  const timekeepings = computed(() =>
    timekeepingsArray.value.reduce<{
      [eid: string]: EmployeeTimekeepings
    }>((source, curr) => {
      if (!source[curr.user_id]) {
        source[curr.user_id] = {}
      }

      if (source[curr.user_id][curr.date]) {
        if (!isArray(source[curr.user_id][curr.date])) {
          source[curr.user_id][curr.date] = [
            source[curr.user_id][curr.date] as any,
          ]
        }
        ;(source[curr.user_id][curr.date] as unknown as Timekeeping[]).push(
          curr
        )
      } else {
        source[curr.user_id][curr.date] = curr
      }
      return source
    }, {})
  )

  const timekeepingHistories = computed(
    () => (timekeepingID: string | number) => {
      return timekeepingsArray.value.find(
        (timekeeping) => timekeeping.id === timekeepingID
      )?.histories
    }
  )

  const refetch = async (
    options: TimekeepingRefetchOptions,
    query?: QueryParams
  ) => {
    const lastDayOfWeek = lastDayOfTheWeek(unref(options.date))
    if (!timekeepingsWeekCached.has(lastDayOfWeek) || options.force) {
      timekeepingsWeekCached.add(lastDayOfWeek)
      await _refetch(query)
    }
  }

  watch(result, (val) => {
    val?.timekeepings.forEach((timekeeping) => {
      timekeepingsCached.set(timekeeping.id, timekeeping)
    })
  })

  const stop = () => {
    _stop()
    timekeepingsWeekCached.clear()
    timekeepingsCached.clear()
  }

  return {
    timekeepings,
    timekeepingsArray,
    timekeepingHistories,
    refetch,
    stop,
    restart,
    start,
  }
})
