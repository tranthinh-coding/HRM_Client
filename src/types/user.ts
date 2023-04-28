import { Employee } from '~/types/employee'
export interface User {
  id: number
  name: string
  email: string
  user_id: string
  join_date: string
  status: string
  role: string
  avatar?: string
  email_verified_at?: string
  created_at: string
  updated_at: string
  employee_information: Employee
}

export type UserStatus = {
  name: string
}

export type ProfileInformation = {
  date_of_birth?: string
  gender?: string
  address?: string
  country?: string
  phone_number?: string
  nationality?: string
  citizen_id_card?: string
}
