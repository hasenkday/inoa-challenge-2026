import { richTextToPlainText } from '../../helpers/rich-text'

export function handleImage(url?: string, caption?: unknown): string[] {
  if (!url) return []
  const cap = richTextToPlainText(caption).trim()
  return cap ? [`![](${url})`, `*${cap}*`] : [`![](${url})`]
}
