import { User } from './user'

export interface Employee {
  name: string
  email: string
  employee_id: string
  position: string
  department: string
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

// export type EmployeeDiscipline = {
//   id: number
//   name: string
//   description: string
//   salary: number
//   start_date: string
//   user_id: string
//   created_at: string

//   user: User
// }
