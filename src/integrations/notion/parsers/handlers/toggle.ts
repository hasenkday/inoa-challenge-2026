import type { HydratedBlock } from '../../notion.types'
import { richTextToPlainText } from '../../helpers/rich-text'
import { notionBlocksToMarkdownLines } from '../index'

export function handleToggle(block: HydratedBlock, includeToggles: boolean): string[] {
  if (!includeToggles) return []

  const type = block.type as keyof HydratedBlock
  const content = (block as Record<string, unknown>)[type] as { rich_text?: unknown }

  const title = richTextToPlainText(content?.rich_text).trim()
  const lines: string[] = []

  lines.push('<details>')
  lines.push(`<summary>${title}</summary>`)
  lines.push('')

  const children = block.__children ?? []
  if (children.length > 0) {
    const childLines = notionBlocksToMarkdownLines(children, { includeToggles })
    lines.push(...childLines, '')
  }

  lines.push('</details>')
  return lines
}
