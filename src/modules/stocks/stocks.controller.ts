import { Controller, Get } from '@nestjs/common'

import { CacheSWR } from '@/common/decorators/cache-swr'

import { StocksService } from './stocks.service'
import type { StockTypes } from './stocks.types'

@Controller('api/some-endpoint')
export class StocksController {
  constructor(private readonly someThing: StocksService) {}

  // TODO: validar query com DTO
  @Get()
  @CacheSWR(600, 86400)
  async getPriceHistory(): Promise<StockTypes[]> {
    const result = (await this.someThing.getPriceHistory()) as StockTypes[]
    return result
  }
}
