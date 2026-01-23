import { Module } from '@nestjs/common'

import { NotionModule } from '@/integrations/notion/notion.module'

import { ContactController } from './contact.controller'
import { ContactService } from './contact.service'

@Module({
  imports: [NotionModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
