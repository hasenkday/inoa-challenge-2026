import { richTextToPlainText } from '../../helpers/rich-text'

export function handleTodo(richText: unknown, checked?: boolean): string[] {
  const t = richTextToPlainText(richText).trim()
  const box = checked ? '[x]' : '[ ]'
  return t ? [`- ${box} ${t}`] : [`- ${box}`]
}
