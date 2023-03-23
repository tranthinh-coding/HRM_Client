import { useAxios } from '~/composables'
import { PAYROLL_GET_MONEY_FORMAT } from '~/config'

const getAll = () => useAxios.get<string[], string[]>(PAYROLL_GET_MONEY_FORMAT)

export const PayrollServices = { getAll }

export default PayrollServices
