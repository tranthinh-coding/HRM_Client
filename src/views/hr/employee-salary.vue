<template>
  <vs-button type="gradient" color="danger" @click="openform = !openform">
    Tao bang luong
  </vs-button>

  <el-collapse-transition>
    <div class="box rounded-xl my-20px" v-show="openform">
      <div class="flex flex-col gap-18px p20px">
        <vs-input :model-value="'hi'" />
        <vs-input :model-value="'hi'" />
        <vs-input :model-value="'hi'" />
      </div>
    </div>
  </el-collapse-transition>

  <div class="box p20px rounded-xl my-20px">
    <el-empty v-if="employeeSalaries.length == 0" />
    <el-table v-else :data="employeeSalaries">
      <el-table-column fixed type="expand">
        <template #default="{ row }: { row: Salary }">
          <el-table :data="row.bonus">
            <el-table-column label="Name" prop="name" />
            <el-table-column label="So tien" prop="amount" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column fixed width="100" label="#" prop="id" />
      <el-table-column label="Dot tinh luong" prop="salary_calculation" />
      <el-table-column label="User" prop="user_id" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSalariesStore } from '~/store/salaries'
import type { Salary } from '~/types'

const employeeSalariesStore = useSalariesStore()
const { employeeSalaries } = storeToRefs(employeeSalariesStore)

const openform = ref(false)

const salaryCalculation = computed(() => {})
</script>

<style scoped lang="scss">
.box {
  background: getColor(theme-layout);
}
</style>
