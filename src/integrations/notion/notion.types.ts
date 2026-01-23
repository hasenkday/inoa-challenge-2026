import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type NotionAnyBlock = BlockObjectResponse | PartialBlockObjectResponse
export type NotionBlock = BlockObjectResponse
export type NotionPartialBlock = PartialBlockObjectResponse
export type NotionRichText = RichTextItemResponse

export function isFullBlock(block: NotionAnyBlock): block is NotionBlock {
  return 'type' in block
}

export type HydratedBlock = NotionBlock & {
  __children?: HydratedBlock[]
}

export function hasChildren(block: NotionAnyBlock): block is NotionBlock & { has_children: true } {
  return isFullBlock(block) && block.has_children === true
}
