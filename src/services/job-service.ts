import { JOB_API } from '~/config/app'
import { useAxios } from '~/composables'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export const create = <T = any, R = AxiosResponse<T>, D = any>(
  form: D,
  config?: AxiosRequestConfig<D>
) => useAxios.post<T, R, D>(JOB_API, form, config)
