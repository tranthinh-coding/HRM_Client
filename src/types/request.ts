export interface Response {}

export interface ErrorResponse<T extends Object> {
  message: string
  errors?: Partial<Record<keyof T, string[]>>
}
