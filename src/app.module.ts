import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'

import { HealthModule } from './modules/health/health.module'
import { StocksModule } from './modules/stocks/stocks.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }]),
    HealthModule,
    StocksModule,
  ],
})
export class AppModule {}
