import {
  PAYROLL_GET_MONEY_FORMAT,
  PAYMENT_SAVE,
  PAYROLL_SAVE_SETTING,
} from '~/config'
import { useAxios } from '~/composables'
import { SuccessResponse } from '~/types/request'

const moneyFormats = () =>
  useAxios.get<string[], string[]>(PAYROLL_GET_MONEY_FORMAT)

const saveEmployeePayment = (form: any) =>
  useAxios.post<SuccessResponse, SuccessResponse>(PAYMENT_SAVE, form)

const savePayrollSetting = (form: any) =>
  useAxios.post<SuccessResponse, SuccessResponse>(PAYROLL_SAVE_SETTING, form)

export const PayrollService = {
  moneyFormats,
  saveEmployeePayment,
  savePayrollSetting,
}

export default PayrollService
