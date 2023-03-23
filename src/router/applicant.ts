import { RouteRecordRaw } from 'vue-router'

export const applicantRoutes: RouteRecordRaw[] = [
  {
    name: 'applicant',
    path: '/applicant',
    component: () => import('~/views/applicant-dashboard.vue'),
  },
]
