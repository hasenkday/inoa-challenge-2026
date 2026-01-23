import { Injectable, NotFoundException } from '@nestjs/common'
import { NotionClient } from '@/integrations/notion/notion.client'
import { env } from '@/config/env'
import { getPrimaryDataSourceId } from '@/integrations/notion/helpers/data-source'
import { CASES_PROPS } from './cases.props'
import type { CaseCardDto, CaseMeta } from './cases.types'
import { isFullPage } from './notion/utils'
import { mapPageToCard, mapPageToMeta } from './notion/page.parser'
import { buildCaseDetail } from './notion/content.builder'

type QueryArgs = Omit<
  Parameters<NotionClient['client']['dataSources']['query']>[0],
  'data_source_id'
>

@Injectable()
export class CasesService {
  constructor(private readonly notion: NotionClient) {}

  private async query(args: QueryArgs) {
    const dataSourceId = await getPrimaryDataSourceId(this.notion.client, env.NOTION_CASES_DB_ID)
    return this.notion.client.dataSources.query({ data_source_id: dataSourceId, ...args })
  }

  async listCards(): Promise<CaseCardDto[]> {
    const res = await this.query({
      sorts: [{ timestamp: 'created_time', direction: 'descending' }],
      page_size: 100,
    })

    return res.results
      .filter(isFullPage)
      .map(mapPageToCard)
      .filter((x): x is CaseCardDto => Boolean(x))
  }

  async getCaseMeta(slug: string): Promise<CaseMeta> {
    const res = await this.query({
      filter: { property: CASES_PROPS.SLUG, rich_text: { equals: slug } },
      page_size: 1,
    })

    const page = res.results[0]
    if (!isFullPage(page)) throw new NotFoundException('Case not found')

    const meta = mapPageToMeta(page)
    if (!meta) throw new NotFoundException('Case not found')

    return meta
  }

  async getCaseDetail(slug: string): Promise<CaseMeta & { contentMarkdown: string }> {
    const res = await this.query({
      filter: { property: CASES_PROPS.SLUG, rich_text: { equals: slug } },
      page_size: 1,
    })

    const page = res.results[0]
    if (!isFullPage(page)) throw new NotFoundException('Case not found')

    const item = mapPageToMeta(page)
    if (!item) throw new NotFoundException('Case not found')

    return buildCaseDetail(this.notion, page.id, item)
  }
}
