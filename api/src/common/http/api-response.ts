export type ApiSuccessResponse<T> = {
  message: string
  data: T
  warnings?: string[]
}

export function successResponse<T>(
  message: string,
  data: T,
  warnings?: string[]
): ApiSuccessResponse<T> {
  return {
    message,
    data,
    ...(warnings?.length ? { warnings } : {}),
  }
}
