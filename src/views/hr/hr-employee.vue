<template>
  <div class="employee-dashboard">
    <vs-button type="shadow" @click="openCreateEmployeeForm = true">
      {{ t('employee.create') }}
    </vs-button>

    <div class="search-form">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="6" class="search-column">
          <vs-input v-model="searchForm.id" label="Employee ID" label-float />
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
              :value="position.position"
            />
          </vs-select>
        </el-col>

        <el-col :xs="24" :sm="6" class="search-column">
          <vs-button block @click="searchEmployees">
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
        :xl="4"
        v-for="employee in employees"
        :key="employee.id"
      >
        <employee-card
          :employee="employee"
          @open-detail="
            $router.push({
              name: 'hr/employee/detail',
              params: { id: employee.user_id },
            })
          "
        />
      </el-col>
    </el-row>

    <employee-create
      :positions="positions"
      v-model:open="openCreateEmployeeForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onBeforeMount, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getResponseError } from '~/composables'
import EmployeeServices from '~/services/employee-services'
import JobsService from '~/services/jobs-service'
import { employees, refetch as refetchEmployees } from '~/store/employees'
import { JobPosition } from '~/types'
import employeeCreate from '~/components/hr/employee-create.vue'
import employeeCard from '~/components/hr/employee-card.vue'

const { t } = useI18n()
const openCreateEmployeeForm = ref(false)

const searchForm = reactive<{
  id: string
  name: string
  position: string
}>({ id: '', name: '', position: '' })

const positions = ref<JobPosition[]>([])

const searchEmployees = async () => {
  try {
    employees.value = await EmployeeServices.search(searchForm)
  } catch (error) {
    const _e = getResponseError(error)
    ElMessage({
      message: _e.message,
      type: 'error',
      duration: 3000,
    })
  }
}
const fetchPositions = async () => {
  try {
    positions.value = await JobsService.positions()
  } catch (error) {
    positions.value = []
  }
}

onBeforeMount(() => {
  Promise.all([refetchEmployees(), fetchPositions()])
})
</script>

<style scoped lang="scss">
@use 'vuesax-alpha/theme-chalk/src/mixins/function.scss' as *;

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
