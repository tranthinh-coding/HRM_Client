import { User } from '~/types/user'
import { defineStore } from 'pinia'
import { isNil } from 'lodash-unified'
import { ref } from 'vue'

export const useUserStore = defineStore('USER', () => {
  const user = ref<User | undefined>()
  const isLoggedIn = ref(false)

  const saveUser = (usr: User) => {
    user.value = usr
    isLoggedIn.value = !isNil(usr.role) && usr.role !== ''
  }

  const reset = () => {
    user.value = undefined
  }

  return {
    user,
    isLoggedIn,
    saveUser,
    reset,
  }
})
