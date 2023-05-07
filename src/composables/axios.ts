import axios, { AxiosResponse } from 'axios'
import { getToken } from '~/utils/auth'
import { ACCESS_TOKEN, API_V1 } from '~/config/app'
import { ErrorResponse } from '~/types/request'

import nProgress from 'nprogress'

nProgress.done()

export const useAxios = axios.create({
  baseURL: API_V1,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
  responseEncoding: 'utf8',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  onUploadProgress: function ({
    loaded,
    total,
    progress,
    bytes,
    estimated,
    rate,
    upload = true,
  }) {
    progress && nProgress.set(progress)
  },

  onDownloadProgress: function ({
    loaded,
    total,
    progress,
    bytes,
    estimated,
    rate,
    download = true,
  }) {
    // Do whatever you want with the Axios progress event
    progress && nProgress.set(progress)
  },
})

// always refesh token before send request
useAxios.interceptors.request.use((config) => {
  const token = getToken(ACCESS_TOKEN)
  const lang = document.querySelector('html')?.getAttribute('lang') || 'en'
  // @ts-ignore
  Object.assign(config.headers, {
    Authorization: `Bearer ${token}`,
    'Accept-Language': lang,
  })
  return config
})

useAxios.interceptors.response.use(
  (response) => response.data,
  (error) =>
    Promise.reject(
      error.response?.data || {
        message: 'Server not responding',
        __ERROR__: error,
      }
    )
)

export const getResponseData = <T extends any, R extends any>(
  response: AxiosResponse<T, R>
): T => response.data

export const getResponseError = <T extends Object>(
  error: any
): ErrorResponse<T> => error as any
