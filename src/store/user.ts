import { User } from '~/types/user'
import { defineStore } from 'pinia'
import { ACCESS_TOKEN } from '~/config/app'
import { setToken } from '~/utils/auth'

export const useUser = defineStore('USER', {
  state: (): User & { isLoggedIn: boolean } => ({
    name: '',
    email: '',
    role_name: '',
    isLoggedIn: false,
  }),
  actions: {
    saveUser({ name, email, role_name, token }: User) {
      this.name = name
      this.email = email
      this.role_name = role_name
      this.isLoggedIn = !!token
      setToken(ACCESS_TOKEN, token)
    },
  },
  getters: {
    userInfo: (state) => state,
    getLoginStatus: (state): boolean | undefined => state.isLoggedIn,
  },
})
