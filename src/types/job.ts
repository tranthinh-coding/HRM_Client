type DateResponse = string

export interface Job {
  id: number
  title: string
  department: string
  position: string // leader, employee, PM
  no_of_vacancies: number // so luong tuyen
  experience: string // kinh nghiem
  age: number // tuoi
  salary_from: number
  salary_to: number
  type: string // remote, fulltime
  status: string
  start_date: DateResponse
  expired_date: DateResponse
  description: string
  count: number
  created_at: string
  updated_at: string
}

export type JobCreate = Required<
  Pick<
    Job,
    | 'title'
    | 'department'
    | 'position'
    | 'no_of_vacancies'
    | 'experience'
    | 'age'
    | 'salary_from'
    | 'salary_to'
    | 'type'
    | 'start_date'
    | 'expired_date'
    | 'description'
  >
>

export type JobTypes = {
  name: string
}

export type JobPosition = {
  name: string
}

export type JobFilter = {
  salaryRange?: { min: number; max: number }
  position?: string
  type?: string
}
