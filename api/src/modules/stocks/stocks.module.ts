import { Module } from '@nestjs/common'

import { BrapiModule } from '@/integrations/brapi/brapi.module'
import { SqliteModule } from '@/integrations/sqlite/sqlite.module'

import { StocksCacheService } from './cache/stocks-cache.service'
import { StocksController } from './stocks.controller'
import { StocksService } from './stocks.service'

@Module({
  imports: [BrapiModule, SqliteModule],
  controllers: [StocksController],
  providers: [StocksService, StocksCacheService],
})
export class StocksModule {}
