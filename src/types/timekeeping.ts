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
}

export type EmployeeTimekeepings = {
  /**
   * Ngay cham cong
   */
  [date: string]: Timekeeping | Timekeeping[] | undefined
}
