<template>
  <vs-dialog v-model="showDialog">
    <template #header>
      <h4 v-html="t('job.create')"></h4>
    </template>

    <vs-input
      v-model="department"
      :placeholder="t('departments.create-input-placeholder')"
    >
      <template #icon>
        <el-icon size="26"> <home-five /> </el-icon>
      </template>

      <template #message-danger v-if="error">
        {{ error }}
      </template>
    </vs-input>

    <template #footer>
      <vs-button block @click="addNewDepartment">
        {{ t('actions.create') }}
      </vs-button>
    </template>
  </vs-dialog>
</template>

<script setup lang="ts">
import { isBoolean, isString } from '@vueuse/core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  error?: string
  /**
   * Department model
   */
  department: string
  modelValue: boolean
}>()

const emit = defineEmits({
  create: () => true,
  'update:department': (value: string) => isString(value),
  'update:modelValue': (value: boolean) => isBoolean(value),
})

const department = computed({
  get: () => props.department,
  set: (value: string) => emit('update:department', value),
})

const showDialog = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const addNewDepartment = () => emit('create')
</script>

<style scoped></style>
