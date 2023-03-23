import { Applicant } from '~/types/applicant'
import { useAxios } from '~/composables'
import {
  APPLICANT,
  APPLICANT_STATUS,
  SEEKERS,
  APPLICANT_APPLY,
  APPLICANT_DOWNLOAD_CV,
  APPLICANT_UPDATE,
  APPLICANT_OFFERED,
} from '~/config'
import { SuccessResponse } from '~/types'
import { UploadUserFile } from 'element-plus'

const getAll = () => useAxios.get<Applicant[], Applicant[]>(APPLICANT)

const getTotalSeekers = () => useAxios.get<number, number>(SEEKERS)

const status = () => useAxios.get<string[], string[]>(APPLICANT_STATUS)

const apply = (cv: {
  job_id: number
  message: string
  cv_upload: UploadUserFile
}) =>
  useAxios.post<SuccessResponse, SuccessResponse>(APPLICANT_APPLY, cv, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

const applicantOffered = () =>
  useAxios.get<Applicant[], Applicant[]>(APPLICANT_OFFERED)

const downloadCv = (id: number) =>
  useAxios.post(
    APPLICANT_DOWNLOAD_CV,
    { id },
    {
      responseType: 'blob',
    }
  )

const update = (applicant: Applicant) =>
  useAxios.patch<SuccessResponse, SuccessResponse>(APPLICANT_UPDATE, applicant)

export const ApplicantServices = {
  getAll,
  status,
  getTotalSeekers,
  apply,
  downloadCv,
  update,
  applicantOffered,
}

export default ApplicantServices
