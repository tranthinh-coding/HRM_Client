import { Department } from './department'
import { JobPosition } from './job'
import { User } from './user'

export interface Employee {
  name: string
  email: string
  employee_id: string

  department_id: number
  position_id: number

  position: JobPosition

  department: Department
}

export type EmployeeReward = {
  id: number
  name: string
  description: string
  salary: number
  start_date: string
  user_id: string
  created_at: string

  user: User
}

export type EmployeeDiscipline = EmployeeReward
