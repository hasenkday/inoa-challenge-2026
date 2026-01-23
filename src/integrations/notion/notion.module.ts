import { Module } from '@nestjs/common'
import { NotionClient } from './notion.client'

@Module({
  providers: [NotionClient],
  exports: [NotionClient],
})
export class NotionModule {}
