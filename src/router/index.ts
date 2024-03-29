import { storeToRefs } from 'pinia'
import DashboardLayout from '~/layouts/app-dashboard.vue'
import { applicantRoutes } from './applicant'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ACCESS_TOKEN } from '~/config/app'
import UserService from '~/services/user-service'
import { useUserStore } from '~/store'
import { getToken, removeToken } from '~/utils'
import { authRoutes } from './auth'
import { hrRoutes } from './hr'
import NOOP_COMPONENT from '~/components/NOOP_COMPONENT.vue'
import { employeeRoutes } from './employee'

export const routerAuthUser: string[] | Symbol[] = ['login', 'register']
export const routerExceptedAuth = [...routerAuthUser]

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '',
    component: NOOP_COMPONENT,
    meta: {
      layout: DashboardLayout,
      requireAuth: true,
    },
  },
  ...authRoutes,
  ...applicantRoutes,
  hrRoutes,
  employeeRoutes,

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: {
      name: 'home',
    },
  },
] as any

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _, savedPosition) {
    let scrollTo: number | string = 0
    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.top
    }
    return { y: scrollTo, behavior: 'smooth' }
  },
})

router.beforeResolve(async (to, _, next) => {
  if (to.name === 'logout') return next()

  const { user, isLoggedIn } = storeToRefs(useUserStore())

  if (!isLoggedIn.value) {
    // user was not logged in
    const hasToken = getToken(ACCESS_TOKEN)
    if (hasToken) {
      try {
        await UserService.login({
          [ACCESS_TOKEN]: hasToken,
        })

        if (!routerAuthUser.includes(to.name as string)) {
          if (to.meta.requireRole) {
            if (to.meta.requireRole === user.value?.role) return next()

            return next({ name: 'home' })
          }
          return next()
        }
        return next({ name: 'home' })
      } catch (error) {
        removeToken(ACCESS_TOKEN)
      }
    }
    if (!to.meta.requireAuth || routerExceptedAuth.includes(to.name as string))
      return next()
    return next({ name: 'login' })
  }

  // is logged in. ignore auth routes
  if (routerAuthUser.includes(to.name as string)) return next({ name: 'home' })

  if (to.meta.requireRole) {
    if (to.meta.requireRole === user.value?.role) return next()

    return next({ name: 'home' })
  }
  return next()
})
export default router
