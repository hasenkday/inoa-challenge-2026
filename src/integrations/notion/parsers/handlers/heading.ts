import { richTextToPlainText } from '../../helpers/rich-text'

function headingPrefix(type: string) {
  if (type === 'heading_1') return '## '
  if (type === 'heading_2') return '### '
  return '#### '
}

export function handleHeading(type: string, richText: unknown): string[] {
  const t = richTextToPlainText(richText).trim()
  return t ? [`${headingPrefix(type)}${t}`] : []
}
