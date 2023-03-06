import { ErrorResponse } from './../types/request'
import axios, { AxiosResponse } from 'axios'
import { getToken } from '~/utils/auth'
import { ACCESS_TOKEN, API_V1 } from '~/config/app'

// import nProgress from 'nprogress'

export const useAxios = axios.create({
  baseURL: API_V1,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language':
      document.querySelector('html')?.getAttribute('lang') || 'enUS',
    Authorization: `Bearer ${getToken(ACCESS_TOKEN)}`,
  },
  responseType: 'json',
  responseEncoding: 'utf8',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  // onUploadProgress: function (
  //   {
  // loaded,
  // total,
  // progress,
  // bytes,
  // estimated,
  // rate,
  // upload = true,
  //   }
  // ) {
  // Do whatever you want with the Axios progress event
  // progress && nProgress.set(progress)
  // },

  // onDownloadProgress: function ({
  //   loaded,
  //   total,
  //   progress,
  //   bytes,
  //   estimated,
  //   rate,
  //   download = true,
  // }) {
  //   // Do whatever you want with the Axios progress event
  // },

  transformResponse: [(data) => JSON.parse(data)],
})

useAxios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response.data)
  }
)

export const getResponseData = <T extends any, R extends any>(
  response: AxiosResponse<T, R>
): T => response.data

export const getResponseError = <T extends Object>(
  error: any
): ErrorResponse<T> => error as any
