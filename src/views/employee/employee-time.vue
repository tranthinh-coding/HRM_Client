<template>
  <div class="bg-theme-layout p-4 rounded-xl">
    <div class="mt-4 flex justify-start gap-8">
      <el-statistic :value="98500">
        <template #title>
          <div class="flex items-center">
            Số giờ làm trong tháng
            <el-tooltip
              effect="dark"
              content="Tính từ lần cuối thanh toán lương"
              placement="top"
            >
              <el-icon class="ml-1" :size="12">
                <info-circle-broken />
              </el-icon>
            </el-tooltip>
          </div>
        </template>

        content
      </el-statistic>

      <el-statistic :value="30">
        <template #title>
          <div>Số giờ nghỉ trong tháng</div>
        </template>
      </el-statistic>
    </div>

    <div class="mt-6">
      <el-tabs>
        <el-tab-pane label="Thông tin chấm công" value="1">
          <employee-timekeeping />
        </el-tab-pane>

        <el-tab-pane label="Thông tin nghỉ phép" value="2">
          <employee-timeoff />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EmployeeTimeoff from '~/components/employee/employee-timeoff.vue'
import EmployeeTimekeeping from '~/components/employee/employee-timekeeping.vue'
</script>

<style lang="scss">
.date.is-selected {
  background: getColor(primary);
  color: getColor(light);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
}

.divider {
  background-color: getColor(gray-4);
}

.el-popper {
  overflow: hidden;
}

.el-input,
.el-input__wrapper {
  width: 100% !important;
  height: unset !important;
}
.el-input__wrapper {
  width: 100%;
  padding: 6px 10px;
  background: getColor(gray-2);
  border-radius: 13px;
  border: none !important;
  box-shadow: none !important;

  .el-input__inner {
    transition: all 0.25s ease;
  }
  &.is-focus {
    .el-input__inner {
      padding-left: 4px;
    }
  }
}

.vs-select {
  max-width: unset;
}
</style>
