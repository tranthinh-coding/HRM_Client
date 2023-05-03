import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import type { Employee } from '~/types/employee'
import { trim } from 'lodash-unified'

type QueryResponse = {
  employees: {
    data: Employee[]
  }
}

export type EmployeeQuery = {
  employee_id?: string
  position?: string
  name?: string
  department?: string
}

export const useEmployeesStore = defineStore('EMPLOYEES', () => {
  const { result, refetch, stop, restart, start } = useQuery<QueryResponse>(
    gql`
      query EMPLOYEES {
        employees {
          data {
            id
            name
            email
            employee_id
            position {
              id
              name
            }
            department {
              id
              name
            }
          }
        }
      }
    `,
    null,
    {
      pollInterval: 40000,
    }
  )

  const employees = computed(() => result.value?.employees.data || [])

  const localSearch = computed(
    () =>
      ({ employee_id, position, department, name }: EmployeeQuery) => {
        const eid = trim(employee_id)
        const _position = trim(position)
        const _department = trim(department)
        const _name = trim(name)
        return employees.value.filter((e) => {
          if (!eid && !position && !department && !name) return true

          if (eid && !e.employee_id.toLowerCase().includes(eid.toLowerCase()))
            return false
          if (
            _position &&
            !e.position.name.toLowerCase().includes(_position.toLowerCase())
          )
            return false
          if (
            _department &&
            !e.department.name.toLowerCase().includes(_department.toLowerCase())
          )
            return false
          if (_name && !e.name.toLowerCase().includes(_name.toLowerCase()))
            return false

          return true
        })
      }
  )

  return {
    employees,
    refetch,
    stop,
    restart,
    start,
    localSearch,
  }
})
