import { Controller, Get, Param } from '@nestjs/common'

import { CacheSWR } from '@/common/decorators/cache-swr'

import { CasesService } from './cases.service'
import type { CaseCardDto, CaseMeta } from './cases.types'

@Controller('api/cases')
export class CasesController {
  constructor(private readonly cases: CasesService) {}

  @Get()
  @CacheSWR(600, 86400)
  async list(): Promise<CaseCardDto[]> {
    return this.cases.listCards()
  }

  @Get(':slug')
  @CacheSWR(600, 86400)
  async getBySlug(@Param('slug') slug: string): Promise<CaseMeta & { contentMarkdown: string }> {
    return this.cases.getCaseDetail(slug)
  }
}
