import type { User } from './user'

export const dateFormat = /^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/

export type DateFormat = typeof dateFormat

export interface Timeoff {
  id: number
  day_request: string
  reason: string
  status: string
  time_from: string
  time_to: string
  type_timeoff: string
  user_id: number
  user: User
}

export interface HourlyWageCoefficient {
  id: number
  type_of_time: string
  coefficient: number
}
