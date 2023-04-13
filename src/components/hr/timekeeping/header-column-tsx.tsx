import { isCurrentDate } from '~/utils'
import type { Dayjs } from 'dayjs'

export const HeaderColumn: SetupFC<{
  date: Dayjs
  weekday: string
}> = () => {
  const props = defineProps<{
    date: Dayjs
    weekday: string
  }>()

  defineRender(() => (
    <>
      {isCurrentDate(props.date) && (
        <vs-tooltip type="shadow">
          {{
            content: () => 'Ngày hôm nay',
            default: () => (
              <el-icon color="#ff4c89">
                <star />
              </el-icon>
            ),
          }}
        </vs-tooltip>
      )}
      {props.weekday} {props.date.format('DD-MM')}
    </>
  ))
}

export default HeaderColumn
