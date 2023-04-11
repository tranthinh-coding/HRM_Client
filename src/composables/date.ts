import { computed } from 'vue'
// import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

export const useDate = (date?: string | number | Date | Dayjs) => {
  const lastDayOfWeek = computed(
    () =>
      // dayjs(date).endOf('w').add(-6, 'day').format('YYYY-MM-DD')

      date
  )

  return {
    lastDayOfWeek,
  }
}
