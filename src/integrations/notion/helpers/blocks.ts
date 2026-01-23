import type { Client } from '@notionhq/client'

import type { HydratedBlock, NotionAnyBlock } from '../notion.types'
import { isFullBlock } from '../notion.types'

export async function listAllChildrenBlocks(
  client: Client,
  blockId: string
): Promise<HydratedBlock[]> {
  const blocks: HydratedBlock[] = []
  let cursor: string | undefined

  while (true) {
    const res = await client.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    })

    const full = (res.results as NotionAnyBlock[]).filter(isFullBlock)
    blocks.push(...full)

    if (!res.has_more) break
    cursor = res.next_cursor ?? undefined
    if (!cursor) break
  }

  return blocks
}

export async function hydrateBlocksTree(
  client: Client,
  blockId: string,
  depth = 0
): Promise<HydratedBlock[]> {
  if (depth > 6) return []

  const blocks = await listAllChildrenBlocks(client, blockId)

  const hydrated = await Promise.all(
    blocks.map(async (b): Promise<HydratedBlock> => {
      if (b.has_children) {
        const children = await hydrateBlocksTree(client, b.id, depth + 1)
        return { ...b, __children: children }
      }
      return b
    })
  )

  return hydrated
}
