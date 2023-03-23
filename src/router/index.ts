import DashboardLayout from '~/layouts/app-dashboard.vue'
import { applicantRoutes } from './applicant'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ACCESS_TOKEN } from '~/config/app'
import UserService from '~/services/user-service'
import { useUser } from '~/store/user'
import { getToken, removeToken } from '~/utils'
import { authRoutes } from './auth'
import { hrRoutes } from './hr'
import NOOP_COMPONENT from '~/components/NOOP_COMPONENT.vue'

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

  const user = useUser()

  if (!user.user_id) {
    // user was not logged in
    const hasToken = getToken(ACCESS_TOKEN)
    if (hasToken) {
      try {
        await UserService.login({
          [ACCESS_TOKEN]: hasToken,
        })

        if (!routerAuthUser.includes(to.name as string)) {
          if (to.meta.requireRole) {
            if (to.meta.requireRole === user.role) return next()

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
    if (to.meta.requireRole === user.role) return next()

    return next({ name: 'home' })
  }
  return next()
})
export default router
