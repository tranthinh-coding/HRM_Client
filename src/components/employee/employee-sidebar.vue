<template>
  <menu class="menu">
    <h2 class="menu-title">Filter</h2>
    <div class="option filter-salary">
      <h3 class="option-title">{{ t('hr.salary') }}</h3>
      <el-slider
        v-model="value"
        range
        :marks="marks"
        :min="min"
        :max="max"
        :label="'salary'"
      />
    </div>

    <div class="option working-from">
      <h3 class="option-title">{{ t('hr.working-from') }}</h3>
      <div class="list">
        <vs-checkbox label="Remote" />
        <vs-checkbox label="Fulltime" />
        <vs-checkbox label="Parttime" />
        <vs-checkbox label="Urgent" />
      </div>
    </div>

    <div class="option working-from">
      <h3 class="option-title">{{ t('hr.position') }}</h3>
      <div class="list">
        <vs-checkbox label="UI Designer" />
        <vs-checkbox label="UX Designer" />
        <vs-checkbox label="Web Developer" />
        <vs-checkbox label="Marketing" />
        <vs-checkbox label="Saler" />
      </div>
    </div>
  </menu>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Mark {
  style: CSSProperties
  label: string
}

type Marks = Record<number, Mark | string>

const min = ref(300)
const max = ref(5000)
const value = ref([300, 300])
const marks = reactive<Marks>({
  300: '$300',
  5000: '$5000',
})
</script>

<style scoped lang="scss">
// @use "element-plus/theme-chalk/src/mixins/function.scss";
.menu {
  padding: 20px;
  padding-bottom: 40px;
  // background: #fff;
  border-radius: 14px;

  &-title {
    font-weight: 600;
    font-size: 20px;
  }
}
.filter-salary {
  padding: 0 10px;
  padding-bottom: 20px;
}
.el-slider {
  --el-slider-main-bg-color: #070606;
  --el-color-info: var(--el-color-info-light-3);
}
.el-slider__marks-text {
  opacity: 0.7;
  font-weight: 600;
}

.option {
  margin: 40px 0;

  &-title {
    font-size: 18px;
  }
}

.working-from {
  .list {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
}
</style>
