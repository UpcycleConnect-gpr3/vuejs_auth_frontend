export interface ApiResponse<T> {
  success: boolean
  data: T
}

export interface ApiValidationError {
  field: string
  message: string
}

export interface ApiError {
  message: string
  status: string
  errors?: ApiValidationError[]
}
