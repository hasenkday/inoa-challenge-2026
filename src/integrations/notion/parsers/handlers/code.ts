import { richTextToPlainText } from '../../helpers/rich-text'

export function handleCode(richText: unknown, language?: string): string[] {
  const lang = language ?? ''
  const safeLang = lang === 'plain text' ? 'text' : lang
  const t = richTextToPlainText(richText).trim()
  return [`\`\`\`${safeLang}`, t, '```']
}
