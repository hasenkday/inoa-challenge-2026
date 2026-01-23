import { hydrateBlocksTree } from '@/integrations/notion/helpers/blocks'
import type { NotionClient } from '@/integrations/notion/notion.client'
import { notionBlocksToMarkdownLines, toMarkdown } from '@/integrations/notion/parsers'

import type { CaseDetailDto } from '../cases.types'
import { normalizeCaseContent } from './content.parser'

export async function buildCaseDetail(
  notion: NotionClient,
  pageId: string,
  item: Omit<CaseDetailDto, 'contentMarkdown'>
): Promise<CaseDetailDto> {
  const tree = await hydrateBlocksTree(notion.client, pageId)
  const lines = notionBlocksToMarkdownLines(tree, { includeToggles: true })
  const contentMarkdown = normalizeCaseContent(toMarkdown(lines))

  return { ...item, contentMarkdown }
}
