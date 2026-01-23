type PlainTextLike = { plain_text?: string }

function isPlainTextLikeArray(value: unknown): value is PlainTextLike[] {
  return (
    Array.isArray(value) &&
    value.every((x) => x !== null && typeof x === 'object' && 'plain_text' in (x as object))
  )
}

export function richTextToPlainText(richText?: unknown) {
  if (!isPlainTextLikeArray(richText) || richText.length === 0) return ''
  return richText.map((t) => t.plain_text ?? '').join('')
}
