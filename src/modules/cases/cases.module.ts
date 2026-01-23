import { Module } from '@nestjs/common'
import { NotionModule } from '@/integrations/notion/notion.module'
import { CasesController } from './cases.controller'
import { CasesService } from './cases.service'

@Module({
  imports: [NotionModule],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
