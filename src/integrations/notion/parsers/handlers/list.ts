import { richTextToPlainText } from '../../helpers/rich-text'

export function handleBulletedList(richText: unknown): string[] {
  const t = richTextToPlainText(richText).trim()
  return t ? [`- ${t}`] : ['-']
}

export function handleNumberedList(richText: unknown): string[] {
  const t = richTextToPlainText(richText).trim()
  return t ? [`1. ${t}`] : ['1.']
}
