export const dateFormat =
  /^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/

// export type DateFormat = `${string}-${string}-${string}`
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type Year = `${Digit}${Digit}${Digit}${Digit}`
export type Month = `${Digit}${Digit}`
export type Day = Month

// export type DateFormat = `${Year}-${Month}-${Day}`
export type DateFormat = `${string}-${string}-${string}`

export type TwoDigit = `${Digit}${Digit}`

export type Time = `${TwoDigit}:${TwoDigit}`
