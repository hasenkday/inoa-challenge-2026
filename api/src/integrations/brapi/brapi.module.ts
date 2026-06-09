import { Module } from '@nestjs/common'

import { BrapiService } from './brapi.service'

@Module({
  providers: [BrapiService],
  exports: [BrapiService],
})
export class BrapiModule {}
