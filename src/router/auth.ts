import { useUser } from '~/store/user'
import { views } from '~/utils'
import AuthLayout from '~/layouts/auth-layout.vue'
import { Component } from 'vue'
import { logout } from '~/services/user-service'
import { ACCESS_TOKEN } from '~/config/app'
import { removeToken } from '~/utils/auth'

export const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: views('auth/login-view'),
    meta: {
      requireAuth: false,
      title: 'Login',
      layout: AuthLayout as Component,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: views('auth/register-view'),
    meta: {
      requireAuth: false,
      title: 'Register',
      layout: AuthLayout as Component,
    },
  },
  {
    path: '/logout',
    name: 'logout',
    async beforeEnter() {
      const user = useUser()
      try {
        await logout()
        user.$reset()
      } catch {
        return { name: 'login' }
      }
      removeToken(ACCESS_TOKEN)
      return { name: 'login' }
    },
    // meta: {
    // requireAuth: true,
    // },
  },
]
