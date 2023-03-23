import { setToken } from '~/utils/auth'
import { useUser } from '~/store/user'
import {
  ACCESS_TOKEN,
  LOGIN_API,
  LOGOUT_API,
  REGISTER_API,
  USER_INFO,
  USER_UPDATE,
  USERS_API,
} from '~/config/app'
import { useAxios } from '~/composables'

import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import type { User } from '~/types/user'

export const login = async <D = any>(form: D): Promise<User> => {
  const user = await useAxios.post<User, User & { token: string }, D>(
    LOGIN_API,
    form
  )
  useUser().saveUser(user)
  setToken(ACCESS_TOKEN, user.token)
  return user
}

export const logout = async () => {
  return useAxios.post(LOGOUT_API)
}

export const register = async <D = any>(form: D): Promise<User> => {
  const user = await useAxios.post<User, User & { token: string }, D>(
    REGISTER_API,
    form
  )
  useUser().saveUser(user)

  setToken(ACCESS_TOKEN, user.token)
  return user
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

export const getAll = () => useAxios.get<User[], User[]>(USERS_API)

export const UserService = {
  login,
  logout,
  register,
  getInfo,
  updateProfile,
  getAll,
}

export default UserService
