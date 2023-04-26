<template>
  <div class="employee-dashboard">
    <vs-button type="shadow" @click="openCreateEmployeeForm = true">
      {{ t('employee.create') }}
    </vs-button>

    <div class="search-form">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="6" class="search-column">
          <vs-input
            v-model="searchForm.employee_id"
            label="Employee ID"
            label-float
          />
        </el-col>
        <el-col :xs="24" :sm="6" class="search-column">
          <vs-input
            v-model="searchForm.name"
            :label="t('employee.name')"
            label-float
          />
        </el-col>

        <el-col :xs="24" :sm="6">
          <vs-select
            v-model="searchForm.position"
            :label="t('employee.position')"
            label-float
          >
            <vs-option value="" label=" " style="height: 32px" />
            <vs-option
              v-for="(position, index) in positions"
              :key="index"
              :value="position.name"
            />
          </vs-select>
        </el-col>

        <el-col :xs="24" :sm="6" class="search-column">
          <vs-button block @click="employeesStore.refetch(searchForm)">
            {{ t('employee.search') }}
          </vs-button>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="30">
      <el-col
        :sm="12"
        :md="8"
        :lg="6"
        v-for="(employee, index) in employees"
        :key="index"
      >
        <employee-card
          :employee="employee"
          @open-detail="
            $router.push({
              name: 'hr/employee/detail',
              params: { id: employee.employee_id },
            })
          "
        />
      </el-col>
    </el-row>

    <employee-create
      :positions="positions"
      :departments="departments"
      :users="g"
      @update:employee="employeesStore.refetch"
      v-model:open="openCreateEmployeeForm"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePositionStore, useDepartmentStore, useEmployeesStore, useUsersStore } from '~/store'
import employeeCreate from '~/components/hr/employee-create.vue'
import employeeCard from '~/components/hr/employee-card.vue'

const { t } = useI18n()

const positionStore = usePositionStore()
const { positions } = storeToRefs(positionStore)

const departmentStore = useDepartmentStore()
const { departments } = storeToRefs(departmentStore)

const employeesStore = useEmployeesStore()
const { employees } = storeToRefs(employeesStore)

const openCreateEmployeeForm = ref(false)

const searchForm = reactive<{
  employee_id: string
  name: string
  position: string
}>({ employee_id: '', name: '', position: '' })

const usersStore = useUsersStore()

const g = computed(() => usersStore.localFilter({ role: "Guest"}))
</script>

<style scoped lang="scss">
.employee-dashboard {
  margin-top: 10px;
}

.search-form {
  padding: 0 10px 14px;
  margin-top: 25px;
  border-radius: 16px;
  margin-bottom: 25px;
  background-color: getColor(bg-color);

  .vs-input {
    // margin-top: 25px;
    margin: 0 !important;
  }
  .search-column {
    margin-top: 24px;
  }
}
</style>
