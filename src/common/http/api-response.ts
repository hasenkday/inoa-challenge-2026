export type ApiSuccessResponse<T> = {
  message: string
  data: T
}

export function successResponse<T>(message: string, data: T): ApiSuccessResponse<T> {
  return {
    message,
    data,
  }
}
