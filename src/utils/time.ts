export function pluralize(time: number, label: string): string {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time: number): string {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  }
  if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  }
  return pluralize(~~(between / 86400), ' day')
}

export function parseTime(
  time = {
    getFullYear: Function,
    getMonth: Function,
    getDate: Function,
    getHours: Function,
    getMinutes: Function,
    getSeconds: Function,
    getDay: Function,
  } as string | object | number,
  cFormat: string = '{y}-{m}-{d} {h}:{i}:{s}'
): string | null {
  if (arguments.length === 0) {
    return null
  }

  const format = cFormat
  let date: any
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time) * 1000
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }

    date = new Date(time)
  }
  const formatObj: {
    y: number
    m: number
    d: number
    h: number
    i: number
    s: number
    a: number
  } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  return format.replace(
    /{(y|m|d|h|i|s|a)+}/g,
    (result: string, key: 'y' | 'm' | 'd' | 'h' | 'i' | 's' | 'a'): string => {
      const value: number = formatObj[key]

      if (key === 'a') {
        return [
          'Sunday', // Note: getDay() returns 0 on Sunday
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][value]
      }
      if (result.length > 0 && value < 10) return '0' + value
      return `${value}`
    }
  )
}

export function formatTime(
  time: string | number,
  option: string = '{y}-{m}-{d}'
) {
  time = +time
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d.getTime()) / 1000

  if (diff < 30) {
    return 'Just now'
  }
  if (diff < 3600) {
    // less 1 hour
    return pluralize(Math.ceil(diff / 60), ' minute') + ' ago'
  }
  if (diff < 3600 * 24) {
    return pluralize(Math.ceil(diff / 3600), ' hour') + ' ago'
  }
  if (diff < 3600 * 24 * 2) {
    return '1 day ago'
  }
  if (option) {
    return parseTime(time, option)
  }

  return (
    pluralize(d.getMonth() + 1, ' month') +
    ' ' +
    pluralize(d.getDate(), ' day') +
    ' ' +
    pluralize(d.getHours(), ' hour') +
    ' ' +
    pluralize(d.getMinutes(), ' minute')
  )
}
