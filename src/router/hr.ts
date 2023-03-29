import { HR } from '~/config/role'
import { RouteRecordRaw } from 'vue-router'

import DashboardLayout from '~/layouts/app-dashboard.vue'

export const hrRoutes: RouteRecordRaw = {
  path: '/hr',
  meta: {
    requireAuth: true,
    requireRole: HR,
    layout: DashboardLayout,
  },
  redirect: {
    name: 'hr/dashboard',
  },
  children: [
    {
      path: 'dashboard',
      name: 'hr/dashboard',
      component: () => import('~/views/hr/hr-dashboard.vue'),
    },
    {
      path: 'recruitment',
      name: 'hr/recruitment',
      component: () => import('~/views/hr/hr-recruitment.vue'),
    },
    {
      path: 'department',
      name: 'hr/department',
      component: () => import('~/views/hr/hr-department.vue'),
    },
    {
      path: 'employee',
      name: 'hr/employee',
      component: () => import('~/views/hr/hr-employee.vue'),
    },
    {
      path: 'employee/detail/:id',
      name: 'hr/employee/detail',
      component: () => import('~/views/hr/employee-detail.vue'),
      props: (route) => ({ id: route.params.id }),
    },
    {
      path: 'report',
      name: 'hr/report',
      component: () => import('~/views/hr/report.vue'),
    },
    {
      path: 'project',
      name: 'hr/project',
      component: () => import('~/views/hr/project.vue'),
    },
    {
      path: 'employee-salary',
      name: 'hr/employee-salary',
      component: () => import('~/views/hr/employee-salary.vue'),
    },
    {
      path: 'timekeeping',
      name: 'hr/timekeeping',
      component: () => import('~/views/hr/hr-timekeeping.vue'),
    },
  ],
}
