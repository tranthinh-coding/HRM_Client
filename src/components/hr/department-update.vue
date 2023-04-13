<template>
  <vs-dialog v-model="modelValue">
    <template #header>
      <h4 v-html="t('departments.update')"></h4>
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
        {{ t('actions.update') }}
      </vs-button>
    </template>
  </vs-dialog>
</template>

<script setup lang="ts">
import { isBoolean, isString, useVModel } from '@vueuse/core'
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
  update: () => true,
  'update:department': (value: string) => isString(value),
  'update:modelValue': (value: boolean) => isBoolean(value),
})

const department = useVModel(props, 'department')

const modelValue = useVModel(props, 'modelValue')

const addNewDepartment = () => emit('update')
</script>

<style scoped></style>
