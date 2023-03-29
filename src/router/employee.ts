import { RouteRecordRaw } from 'vue-router'
import { EMPLOYEE } from '~/config'
import DashboardLayout from '~/layouts/app-dashboard.vue'

export const employeeRoutes: RouteRecordRaw = {
  path: '/',
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
      path: '',
      name: 'employee/dashboard',
      component: () => import('~/views/employee/employee-dashboard.vue'),
    },
    {
      path: '',
      name: 'employee/salary',
      component: () => import('~/views/employee/employee-salary.vue'),
    },
    {
      path: '',
      name: 'employee/timeoff',
      component: () => import('~/views/employee/employee-timeoff.vue'),
    },
  ],
}
