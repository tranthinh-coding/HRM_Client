<template>
  <div class="card box">
    <div class="card__title">
      <div class="employee__avatar">
        <vs-avatar>
          <template #text>
            {{ employee.name }}
          </template>
        </vs-avatar>
      </div>
      <div class="employee__info">
        <p>{{ employee.name }}</p>
        <p>{{ employee.employee_id }}</p>
      </div>
      <div class="more-info">
        <el-icon size="20" @click="openEmployeeDetails">
          <category />
        </el-icon>
      </div>
    </div>

    <div class="card__content">
      <p @click="copyInfo(employee.email)">
        <el-icon style="flex-shrink: 0" size="20"><email /></el-icon>
        {{ employee.email }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isString, useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { Employee } from '~/types'

const props = defineProps<{
  employee: Employee
}>()

const emit = defineEmits({
  openDetail: (id: string) => isString(id),
})

const { copy, isSupported } = useClipboard()

const openEmployeeDetails = () => {
  emit('openDetail', props.employee.employee_id)
}

const copyInfo = (text?: string | number) => {
  if (isSupported.value && text) {
    copy(`${text}`)

    ElMessage({
      message: 'Copied~',
      type: 'success',
      duration: 1500,
    })
  }
}
</script>

<style scoped lang="scss">
.card {
  padding: 14px 20px;
  border-radius: 16px;
  // background: getColor(bg-color);

  &__title {
    padding-bottom: 18px;
    border-bottom: 2px solid #f0f0f08d;

    display: flex;
    gap: 20px;
    align-items: center;

    .employee__avatar {
      img {
        border: none;
      }
    }
    .more-info {
      margin-left: auto;
      cursor: pointer;
    }
  }

  &__content {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 14px;

    p {
      display: flex;
      align-items: center;
      gap: 14px;
      cursor: pointer;
    }
  }
}
</style>
