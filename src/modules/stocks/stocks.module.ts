import { Module } from '@nestjs/common'

import { BrapiModule } from '@/integrations/brapi/brapi.module'

import { StocksController } from './stocks.controller'
import { StocksService } from './stocks.service'

@Module({
  imports: [BrapiModule],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
