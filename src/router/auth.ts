import { notification } from 'vuesax-old'
import { useUserStore } from '~/store'
import AuthLayout from '~/layouts/auth-layout.vue'
import { Component } from 'vue'
import { ACCESS_TOKEN } from '~/config/app'
import { removeToken } from '~/utils/auth'

export const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('~/views/auth/login-view.vue'),
    meta: {
      requireAuth: false,
      title: 'Login',
      layout: AuthLayout as Component,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('~/views/auth/register-view.vue'),
    meta: {
      requireAuth: false,
      title: 'Register',
      layout: AuthLayout as Component,
    },
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: async () => {
      const user = useUserStore()
      user.reset()

      // TODO: clear all stored sessions

      notification({
        text: "You're logged out~",
        border: 'success',
        duration: 3000,
        position: 'top-center',
        progress: true,
      })

      removeToken(ACCESS_TOKEN)
      return { name: 'login' }
    },
  },
]
