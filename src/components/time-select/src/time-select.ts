import { CloseCircle } from '@vuesax-alpha/icons-vue'

import type { Component, ExtractPropTypes, PropType } from 'vue'
import type TimeSelect from './time-select.vue'

export const timeSelectProps = {
  format: {
    type: String,
    default: 'HH:mm',
  },
  modelValue: String,
  disabled: Boolean,
  editable: {
    type: Boolean,
    default: true,
  },
  effect: {
    type: String as PropType<'light' | 'dark' | string>,
    default: null,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  placeholder: String,
  start: {
    type: String,
    default: '09:00',
  },
  end: {
    type: String,
    default: '18:00',
  },
  step: {
    type: String,
    default: '00:30',
  },
  minTime: String,
  maxTime: String,
  name: String,
  // prefixIcon: {
  //   type: [String, Object] as PropType<string | Component>
  //   default: () => Clock,
  // },
  clearIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: () => CloseCircle,
  },
  disabledItems: {
    type: Array as PropType<Array<string>>,
    default: () => [],
  },
}

export type TimeSelectProps = ExtractPropTypes<typeof timeSelectProps>

export type TimeSelectInstance = InstanceType<typeof TimeSelect>
