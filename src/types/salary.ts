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
export type SalaryReward = {
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

export interface SalaryPeriod {
  id: number
  name: string
  start_date: DateFormat
  end_date: DateFormat
  salaries: Salary[]
}

export interface Salary {
  id: number

  salary_period_id: number

  salary_period: SalaryPeriod

  base_salary: number

  bonus: SalaryBonus[]

  deduction: SalaryDeduction[]
  reward: SalaryDeduction[]

  workings_hours: SalaryWorkingHours[]

  leave_hours: SalaryLeaveHours[]

  start_date: DateFormat

  end_date: DateFormat

  department: string

  position: string

  coefficient_position: string

  total_amount: number

  user_id: string

  user: User

  created_at: Date
  updated_at: Date
}
