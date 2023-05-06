export interface Response {}

export interface ErrorResponse<T extends Object> {
  message: string
  errors?: T[]
}

export interface SuccessResponse {
  message: string
}
