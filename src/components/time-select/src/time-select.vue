<template>
  <vs-select
    ref="selectInstance"
    :model-value="value"
    :disabled="disabled"
    :clearable="clearable"
    :clear-icon="clearIcon"
    :effect="effect"
    :placeholder="placeholder"
    default-first-option
    :filterable="editable"
    @update:model-value="(event) => $emit('update:modelValue', event)"
    @change="(event) => $emit('change', event)"
    @blur="(event) => $emit('blur', event)"
    @focus="(event) => $emit('focus', event)"
  >
    <vs-option
      v-for="item in items"
      :key="item.value"
      :label="item.value"
      :value="item.value"
      :disabled="item.disabled"
    />
  </vs-select>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { VsSelect } from 'vuesax-alpha'
import { timeSelectProps } from './time-select'
import { compareTime, formatTime, nextTime, parseTime } from './utils'

import type { SelectInstance } from 'vuesax-alpha'

export default defineComponent({
  name: 'VsTimeSelect',
})
</script>

<script lang="ts" setup>
dayjs.extend(customParseFormat)

defineEmits(['change', 'blur', 'focus', 'update:modelValue'])
const props = defineProps(timeSelectProps)

const selectInstance = ref<SelectInstance>()

const value = computed(() =>
  dayjs(props.modelValue, 'HH:mm').format(props.format)
)
// const value = computed(() =>props.modelValue)
const start = computed(() => {
  const time = parseTime(props.start)
  return time ? formatTime(time) : null
})
const end = computed(() => {
  const time = parseTime(props.end)
  return time ? formatTime(time) : null
})
const step = computed(() => {
  const time = parseTime(props.step)
  return time ? formatTime(time) : null
})
const minTime = computed(() => {
  const time = parseTime(props.minTime || '')
  return time ? formatTime(time) : null
})
const maxTime = computed(() => {
  const time = parseTime(props.maxTime || '')
  return time ? formatTime(time) : null
})
const items = computed(() => {
  const result: { value: string; disabled: boolean }[] = []
  if (props.start && props.end && props.step) {
    let current = start.value
    let currentTime: string
    while (current && end.value && compareTime(current, end.value) <= 0) {
      currentTime = dayjs(current, 'HH:mm').format(props.format)
      result.push({
        value: currentTime,
        disabled:
          props.disabledItems.includes(current) ||
          compareTime(current, minTime.value || '-1:-1') <= 0 ||
          compareTime(current, maxTime.value || '100:100') >= 0,
      })
      current = nextTime(current, step.value!)
    }
  }
  return result
})
</script>

<style lang="scss">
.vs-select__option {
  border-radius: 8px;
  &.is-disabled {
    opacity: 0.6212;
    background: transparent;
    cursor: default;
  }
}
</style>
