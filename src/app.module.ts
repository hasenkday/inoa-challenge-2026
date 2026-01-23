import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'

import { NotionModule } from './integrations/notion/notion.module'
import { HealthModule } from './modules/health/health.module'
import { ContactModule } from './modules/contact/contact.module'
import { CasesModule } from './modules/cases/cases.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }]),
    NotionModule,
    HealthModule,
    ContactModule,
    CasesModule,
  ],
})
export class AppModule {}
