import { User } from '~/types/user'
import { defineStore } from 'pinia'
import { isNil } from 'lodash-unified'

export const useUser = defineStore('USER', {
  state: (): User & { isLoggedIn: boolean } => ({
    id: 0,
    user_id: '',
    name: '',
    email: '',
    role: '',
    isLoggedIn: false,
    join_date: '',
    status: '',
    created_at: '',
    updated_at: '',
  }),
  actions: {
    saveUser({ id, user_id, name, email, role }: User) {
      this.name = name
      this.email = email
      this.role = role
      this.id = id
      this.user_id = user_id
      this.isLoggedIn = !isNil(role) && role !== ''
    },
  },
  getters: {
    userInfo: (state) => state,
    getLoginStatus: (state): boolean | undefined => state.isLoggedIn,
  },
})
