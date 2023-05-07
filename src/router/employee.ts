import { RouteRecordRaw } from 'vue-router'
import { EMPLOYEE } from '~/config'
import DashboardLayout from '~/layouts/app-dashboard.vue'

export const employeeRoutes: RouteRecordRaw = {
  path: '/employee',
  name: 'employee',
  component: () => import('~/views/employee-dashboard.vue'),
  meta: {
    requireAuth: true,
    requireRole: EMPLOYEE,
    title: 'Employee',
    layout: DashboardLayout,
  },
  children: [
    {
      path: 'dashboard',
      name: 'employee/dashboard',
      component: () => import('~/views/employee/employee-dashboard.vue'),
    },
    {
      path: 'salary',
      name: 'employee-salary',
      component: () => import('~/views/employee/employee-salary.vue'),
    },
    {
      path: 'employee-salary/period/:id',
      name: 'employee-salary/period',
      component: () => import('~/views/employee/salary-period.vue'),
      props: (route) => ({ id: route.params.id }),
    },
    {
      path: 'time',
      name: 'employee/timeoff',
      component: () => import('~/views/employee/employee-time.vue'),
    },
    {
      path: 'reward-discipline',
      name: 'employee/reward-discipline',
      component: () =>
        import('~/views/employee/employee-reward-discipline.vue'),
    },
    {
      path: 'profile',
      name: 'employee/profile-detail',
      component: () => import('~/views/employee/employee-profile.vue'),
    },
  ],
}
