import type { Job, User } from '~/types'

export type Applicant = {
  id: number
  message: string
  created_at: string
  updated_at: string
  status: string
  user: User
  job: Job
}
