<template>
  <div>
    <el-table :data="rewards">
      <el-table-column label="#" prop="id" />
      <el-table-column label="Ten khen thuong" prop="name" />
      <el-table-column label="Loi nhan" prop="description" />
      <el-table-column label="Muc khen thuong" prop="salary" />
      <el-table-column label="Ngay tao" prop="created_at" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRewardStore } from '~/store'

const rewardStore = useRewardStore()
const { rewards } = storeToRefs(rewardStore)
</script>
