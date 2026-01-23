import type {
  DatePropertyItemObjectResponse,
  PageObjectResponse,
  PropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

import { richTextToPlainText } from './rich-text'

export type NotionProps = Record<string, PropertyItemObjectResponse>

export function pageProps(page: PageObjectResponse): NotionProps {
  return page.properties as unknown as NotionProps
}

function isTitleProp(
  p: PropertyItemObjectResponse | undefined
): p is TitlePropertyItemObjectResponse {
  return p?.type === 'title'
}

function isRichTextProp(
  p: PropertyItemObjectResponse | undefined
): p is RichTextPropertyItemObjectResponse {
  return p?.type === 'rich_text'
}

function isDateProp(
  p: PropertyItemObjectResponse | undefined
): p is DatePropertyItemObjectResponse {
  return p?.type === 'date'
}

export function getPlainText(prop: PropertyItemObjectResponse | undefined): string | undefined {
  if (!prop) return undefined
  if (isTitleProp(prop)) return richTextToPlainText(prop.title) || undefined
  if (isRichTextProp(prop)) return richTextToPlainText(prop.rich_text) || undefined
  return undefined
}

export function getNumber(prop: PropertyItemObjectResponse | undefined): number | undefined {
  if (!prop || prop.type !== 'number') return undefined
  return prop.number ?? undefined
}

export function getDateStart(prop: PropertyItemObjectResponse | undefined): string | undefined {
  if (!isDateProp(prop)) return undefined
  return prop.date?.start ?? undefined
}

export function getDateRange(
  prop: PropertyItemObjectResponse | undefined
): { start?: string; end?: string } | undefined {
  if (!isDateProp(prop)) return undefined
  const start = prop.date?.start ?? undefined
  const end = prop.date?.end ?? undefined
  if (!start && !end) return undefined
  return { start, end }
}
