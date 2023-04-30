import { DateFormat } from './time'
import { User } from './user'

export type SalaryBonus = {
  name: string
  amount: number
}

export type SalaryDeduction = {
  date: DateFormat
  name: string
  amount: number
}

export type SalaryWorkingHours = {
  amount: number
  coefficient: number
  total_hours: number
  type_of_time: string
}

export type SalaryLeaveHours = {
  amount: number
  coefficient: number
  day_request: DateFormat
  total_hours: number
}

export type Salary = {
  id: number

  salary_calculation: string

  base_salary: string

  bonus: SalaryBonus[]

  deduction: SalaryDeduction[]

  workings_hours: SalaryWorkingHours[]

  leave_hours: SalaryLeaveHours[]

  start_date: string

  end_date: string

  position: string

  coefficient_position: string

  total_amount: string

  user_id: string

  user: User

  created_at: Date
  updated_at: Date
}
