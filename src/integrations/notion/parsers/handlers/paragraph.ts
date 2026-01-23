import { richTextToPlainText } from '../../helpers/rich-text'

export function handleParagraph(richText: unknown): string[] {
  const t = richTextToPlainText(richText).trim()
  return t ? [t] : []
}
