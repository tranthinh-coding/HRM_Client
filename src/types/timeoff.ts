import type { User } from './user'

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

export interface EmployeeTimeoff {
  /**
   * Ngay nghi phep
   */
  [date: string]: Timeoff | Timeoff[] | undefined
}
