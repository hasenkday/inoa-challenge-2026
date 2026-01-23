import type { HydratedBlock } from '@/integrations/notion/notion.types'

import { handleCallout } from './handlers/callout'
import { handleCode } from './handlers/code'
import { handleDivider } from './handlers/divider'
import { handleHeading } from './handlers/heading'
import { handleImage } from './handlers/image'
import { handleBulletedList, handleNumberedList } from './handlers/list'
import { handleParagraph } from './handlers/paragraph'
import { handleQuote } from './handlers/quote'
import { handleTodo } from './handlers/todo'
import { handleToggle } from './handlers/toggle'

export type BlocksToTextOptions = { includeToggles?: boolean }

function getBlockContent<T extends Record<string, unknown>>(block: HydratedBlock): T | undefined {
  const type = block.type
  const content = (block as Record<string, unknown>)[type]
  return content as T | undefined
}

export function notionBlocksToMarkdownLines(
  blocks: HydratedBlock[],
  options: BlocksToTextOptions = {}
): string[] {
  const lines: string[] = []

  for (const block of blocks) {
    const type = block.type
    const content = getBlockContent<Record<string, unknown>>(block)

    switch (type) {
      case 'paragraph':
        lines.push(...handleParagraph(content?.rich_text))
        break
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
        lines.push(...handleHeading(type, content?.rich_text))
        break
      case 'bulleted_list_item':
        lines.push(...handleBulletedList(content?.rich_text))
        break
      case 'numbered_list_item':
        lines.push(...handleNumberedList(content?.rich_text))
        break
      case 'to_do':
        lines.push(...handleTodo(content?.rich_text, content?.checked as boolean | undefined))
        break
      case 'quote':
        lines.push(...handleQuote(content?.rich_text))
        break
      case 'callout':
        lines.push(...handleCallout(content?.rich_text, content?.caption))
        break

      case 'code':
        lines.push(...handleCode(content?.rich_text, content?.language as string | undefined))
        break
      case 'divider':
        lines.push(...handleDivider())
        break
      case 'image':
        lines.push(...handleImage((content?.image as { url?: string })?.url, content?.caption))
        break
      case 'toggle':
        lines.push(...handleToggle(block, options.includeToggles ?? false))
        break
      default:
        if (content?.rich_text) {
          lines.push(...handleParagraph(content.rich_text))
        }
        break
    }
  }

  return lines
}

export function toMarkdown(lines: string[]) {
  return lines
    .join('\n')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
