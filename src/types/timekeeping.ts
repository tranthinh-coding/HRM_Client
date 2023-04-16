import { User } from './user'

export type TimekeepingHistory = {
  id: number
  message: string
  time_from: string
  time_to: string
  type_of_time: string
  coefficient: string
  /** ID nguoi tao cap nhat */
  user_id: string
  /** thong tin nguoi tao cap nhat */
  user: User

  timekeeping_id: string

  timekeeping: Timekeeping
}

export type Timekeeping = {
  /**
   * Unique ID
   */
  id: number
  /**
   * Employee ID
   *
   * Format: KH_xxxxx
   */
  user_id: string
  /**
   * Employee name
   */
  name: string
  /**
   * Date of timekeeping
   */
  date: string
  /**
   * Start time
   */
  time_from: string
  /**
   * End time
   */
  time_to: string
  /**
   * Type of timekeeping, Hanh chinh, ngoai gio, ngay nghi ...
   */
  type_of_time: string
  /**
   * Coefficient: he so luong
   */
  coefficient: number

  histories: TimekeepingHistory[]
}

export type EmployeeTimekeepings = {
  /**
   * Ngay cham cong
   */
  [date: string]: Timekeeping | Timekeeping[] | undefined
}
