import { Job, JobCreate, JobTypes, JobPosition, JobFilter } from '~/types/job'
import {
  JOB_API,
  JOB_API_CREATE,
  JOB_API_UPDATE,
  JOB_API_TYPE_JOB,
  JOB_API_POSITION_JOB,
  JOB_API_ARCHIVE,
  JOB_API_FILTER,
} from '~/config/app'
import { SuccessResponse } from '~/types/request'
import { useAxios } from '~/composables'

export const create = (form: JobCreate) =>
  useAxios.post<SuccessResponse, SuccessResponse>(JOB_API_CREATE, form)

export const getAll = () => useAxios.get<Job[], Job[]>(JOB_API)

export const types = () =>
  useAxios.get<JobTypes[], JobTypes[]>(JOB_API_TYPE_JOB)

export const positions = () =>
  useAxios.get<JobPosition[], JobPosition[]>(JOB_API_POSITION_JOB)

export const updateJob = (job: Job) =>
  useAxios.patch<SuccessResponse, SuccessResponse>(JOB_API_UPDATE, job)

export const archiveJob = ({ id, status }: { id: number; status: string }) =>
  useAxios.patch<SuccessResponse, SuccessResponse>(JOB_API_ARCHIVE, {
    id,
    status,
  })

export const filter = ({ salaryRange, position, type }: JobFilter = {}) =>
  useAxios.post<Job[], Job[]>(JOB_API_FILTER, { salaryRange, position, type })

export const JobsService = {
  create,
  getAll,
  types,
  positions,
  updateJob,
  archiveJob,
  filter,
}

export default JobsService
