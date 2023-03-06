import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ACCESS_TOKEN } from '~/config/app'
import UserService from '~/services/user-service'
import { useUser } from '~/store/user'
import { getToken, removeToken } from '~/utils'
import DashboardLayout from '~/layouts/app-dashboard.vue'
import { authRoutes } from './auth'
import { User } from '~/types'

export const routerAuthUser: string[] | Symbol[] = ['login', 'register']
export const routerExceptedAuth = [...routerAuthUser]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: DashboardLayout,
    meta: {
      requireAuth: true,
      title: 'Home',
      layout: DashboardLayout,
    },
  },
  ...authRoutes,
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

router.beforeEach(async (to, _, next) => {
  if (to.name === 'logout') return next()

  const user = useUser()
  if (!user.getLoginStatus) {
    // user was not logged in
    const hasToken = getToken(ACCESS_TOKEN)
    if (hasToken) {
      try {
        const usr = await UserService.login<User, User>({
          [ACCESS_TOKEN]: hasToken,
        })

        user.saveUser(usr)

        if (!routerAuthUser.includes(to.name as string)) return next()
        return next({ name: 'home' })
      } catch (error) {
        removeToken(ACCESS_TOKEN)
      }
    }
    if (!to.meta.requireAuth || routerExceptedAuth.includes(to.name as string))
      return next()
    return next({ name: 'login' })
  }
  if (routerAuthUser.includes(to.name as string)) return next({ name: 'home' })
  return next()
})
export default router
