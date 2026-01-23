import { applyDecorators, Header } from '@nestjs/common'
import { cacheControlPublicSWR } from '../http-cache'

export function CacheSWR(sMaxAgeSeconds: number, swrSeconds: number) {
  return applyDecorators(
    Header('Cache-Control', cacheControlPublicSWR({ sMaxAgeSeconds, swrSeconds }))
  )
}
