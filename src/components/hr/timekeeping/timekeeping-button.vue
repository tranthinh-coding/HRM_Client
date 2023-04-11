<template>
  <button
    class="w-full relative cursor-default rounded-xl py4 px5 flex items-center flex-col justify-center border-dashed border-2 group"
  >
    <p class="whitespace-nowrap">{{ timekeeping.type_of_time }}</p>
    <p class="whitespace-nowrap text-xs">
      {{ timekeeping.time_from }} - {{ timekeeping.time_to }}
    </p>

    <div
      class="transition-all flex gap-10px scale-80 transform absolute opacity0 group-hover:scale-100 group-hover:opacity100 group-hover:visible"
    >
      <vs-tooltip v-if="!isNested">
        <template #content>Thêm</template>
        <vs-button
          color="danger"
          icon
          type="floating"
          @click="openTimekeepingForm"
        >
          <el-icon size="14">
            <add />
          </el-icon>
        </vs-button>
      </vs-tooltip>
      <vs-tooltip>
        <template #content>Sửa</template>
        <vs-button color="danger" icon type="floating" @click="openEditForm">
          <el-icon size="14">
            <edit />
          </el-icon>
        </vs-button>
      </vs-tooltip>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { Employee, Timekeeping } from '~/types'
import { Dayjs } from 'dayjs'

const props = defineProps({
  employee: {
    type: Object as PropType<Employee>,
    required: true,
  },
  date: {
    type: Object as PropType<Dayjs>,
    required: true,
  },
  timekeeping: {
    type: Object as PropType<Timekeeping>,
    required: true,
  },
  isNested: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (event: 'openEditForm', timekeeping: Timekeeping): void
  (event: 'openTimekeepingForm', employee: Employee, date: Dayjs): void
}>()

const openEditForm = () => {
  emit('openEditForm', props.timekeeping)
}

const openTimekeepingForm = () => {
  emit('openTimekeepingForm', props.employee, props.date)
}
</script>
