<DefineTableColumn v-slot="{ date, weekday, $slots, ...$attrs }">
  <el-table-column v-bind="$attrs">
    <template #header>
      <header-column :date="date" :weekday="weekday" />
    </template>
    <template #default="{ row }: { row: Employee }">
      <date-column
        :date="date"
        :employee="row"
        :timekeeping="timekeepings[row.employee_id]"
        @open-timekeeping-form="openTimekeepingForm"
        @open-list-timekeeping="openListTimekeeping"
        @open-edit-form="onOpenEditForm"
      />
    </template>
  </el-table-column>
</DefineTableColumn>

<el-table-column align="center" min-width="150" fixed="left">
  <template #default="{ row }: { row: Employee }">
    <vs-tooltip>
      <template #content>
        <div class="flex flex-col items-start gap-1">
          <div class="flex gap-2 items-center">
            <el-icon size="18"><building-outline /></el-icon>
            {{ row.department }}
          </div>
          <div class="flex gap-2 items-center">
            <el-icon size="18"><email /></el-icon>
            {{ row.email }}
          </div>
          <div class="flex gap-2 items-center">
            <el-icon size="18"><people /></el-icon>
            {{ row.employee_id }}
          </div>
          <div class="flex gap-2 items-center">
            <el-icon size="18"><user-octagon-outline /></el-icon>
            {{ row.position }}
          </div>
        </div>
      </template>
      <div class="flex items-center gap-2">
        <vs-avatar>
          {{ row.name }}
        </vs-avatar>
        <span class="whitespace-nowrap">{{ row.name }}</span>
      </div>
    </vs-tooltip>
  </template>
</el-table-column>

<ReuseTableColumn
  min-width="150"
  align="center"
  class-name="bg-gray-3 bg-opacity-11"
  :date="dayjs(date)"
  weekday="CN"
/>
<ReuseTableColumn
  min-width="150"
  align="center"
  :class-name="tableColumnClassName"
  :date="dayjs(date).add(1, 'day')"
  weekday="T2"
/>
<ReuseTableColumn
  min-width="150"
  align="center"
  :class-name="tableColumnClassName"
  :date="dayjs(date).add(2, 'days')"
  weekday="T3"
/>
<ReuseTableColumn
  min-width="150"
  align="center"
  :class-name="tableColumnClassName"
  :date="dayjs(date).add(5, 'days')"
  weekday="T4"
/>
<ReuseTableColumn
  min-width="150"
  align="center"
  :class-name="tableColumnClassName"
  :date="dayjs(date).add(4, 'days')"
  weekday="T5"
/>
<ReuseTableColumn
  min-width="150"
  align="center"
  :class-name="tableColumnClassName"
  :date="dayjs(date).add(5, 'days')"
  weekday="T6"
/>
<ReuseTableColumn
  min-width="150"
  align="center"
  :class-name="tableColumnClassName"
  :date="dayjs(date).add(6, 'days')"
  weekday="T7"
/>
