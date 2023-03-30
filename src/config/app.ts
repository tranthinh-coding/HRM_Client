export const APP_NAME = 'HR Managerment'

export const REPO_NAME = 'HRM_Client'
export const REPO_BRANCH = 'dev'
export const REPO = 'https://github.com/tranthinh-coding'
export const REPO_LINK = REPO + '/' + REPO_NAME

export const ACCESS_TOKEN = 'token'
export const REMEMBER_TOKEN = 'remember_token'

export const CREATE_API = 'create'
export const DELETE_API = 'delete'
export const UPDATE_API = 'update'

export const API_V1 = import.meta.env.VITE_APP_API_V1
export const USERS_API = 'users'
export const REGISTER_API = 'register'
export const LOGIN_API = 'login'
export const LOGOUT_API = 'logout'
export const USER_INFO = 'profile'
export const USER_UPDATE = 'profile'

export const JOB_API = 'jobs'
export const JOB_API_GET_ALL = JOB_API
export const JOB_API_UPDATE = JOB_API + '/update'
export const JOB_API_CREATE = `${JOB_API}/${CREATE_API}`
export const JOB_API_TYPE_JOB = JOB_API + '/types'
export const JOB_API_POSITION_JOB = JOB_API + '/positions'
export const JOB_API_ARCHIVE = JOB_API + '/archive'
export const JOB_API_FILTER = JOB_API + '/filter-job'

export const DEPARTMENTS_API = 'departments'

export const PAYROLL = 'payroll'
export const PAYROLL_SAVE_SETTING = PAYROLL + '/save-setting'
export const PAYROLL_GET_MONEY_FORMAT = PAYROLL + '/money-format'

export const PAYMENT = 'payment'
export const PAYMENT_SAVE = 'payment/save'

export const SEEKERS = 'seekers'
export const APPLICANT = 'applicants'
export const APPLICANT_OFFERED = APPLICANT + '/applicants-offered'
export const APPLICANT_UPDATE = 'applicants' + '/update'
export const APPLICANT_DOWNLOAD_CV = APPLICANT + '/download-cv'
export const APPLICANT_APPLY = APPLICANT + '/apply'
export const APPLICANT_STATUS = 'applicants/status'

export const EMPLOYEE_API = 'employees'
export const EMPLOYEE_PROFILE = EMPLOYEE_API + '/profile'
export const EMPLOYEE_SAVE_PROFILE = EMPLOYEE_API + '/save-profile'
export const EMPLOYEE_SEARCH = EMPLOYEE_API + '/search'
export const EMPLOYE_INFO_CREATE = 'employees' + '/info-create'
export const EMPLOYEE_API_CREATE = EMPLOYEE_API + '/create'
