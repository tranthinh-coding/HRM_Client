import {
  LOGIN_API,
  LOGOUT_API,
  REGISTER_API,
  USER_INFO,
  USER_UPDATE,
} from '~/config/app'
import { useAxios } from '~/composables'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'

export const login = <T = any, R = AxiosResponse<T>, D = any>(
  form: D,
  config?: AxiosRequestConfig<D>
) => {
  return useAxios.post<T, R, D>(LOGIN_API, form, config)
}

export const logout = () => {
  return useAxios.post(LOGOUT_API)
}

export const register = <T = any, R = AxiosResponse<T>, D = any>(
  form: D,
  config?: AxiosRequestConfig<D>
) => {
  return useAxios.post<T, R, D>(REGISTER_API, form, config)
}

export const getInfo = () => {
  return useAxios.get(USER_INFO)
}

export const updateProfile = <T = any, R = AxiosResponse<T>, D = any>(
  form: D,
  config?: AxiosRequestConfig<D>
) => {
  return useAxios.patch<T, R, D>(USER_UPDATE, form, config)
}

export const UserService = { login, logout, register, getInfo, updateProfile }

export default UserService
