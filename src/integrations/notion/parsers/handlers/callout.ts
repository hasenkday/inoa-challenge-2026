import { richTextToPlainText } from '../../helpers/rich-text'

export function handleCallout(richText: unknown, caption: unknown): string[] {
  const t = richTextToPlainText(richText).trim()
  const c = richTextToPlainText(caption).trim()

  const out: string[] = []
  if (t) out.push(`> ${t}`)
  if (c) out.push(`> ${c}`)
  return out
}
