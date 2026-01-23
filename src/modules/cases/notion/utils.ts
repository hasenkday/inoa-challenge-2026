import type {
  PropertyItemObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

export function getFirstFileUrl(prop: PropertyItemObjectResponse | undefined): string | undefined {
  if (!prop || prop.type !== 'files') return undefined
  const first = prop.files?.[0]
  if (!first) return undefined

  if (first.type === 'external') return first.external?.url ?? undefined
  if (first.type === 'file') return first.file?.url ?? undefined

  return undefined
}

export function buildTagline(status?: string, caseType?: string) {
  const s = status?.trim()
  const ct = caseType?.trim()

  const parts: string[] = []
  if (s && s.toLowerCase().includes('soon')) parts.push('Soon')
  if (ct) parts.push(ct)
  if (s) parts.push(s)

  return [...new Set(parts)].join(' · ')
}

export function isFullPage(page: unknown): page is PageObjectResponse {
  return Boolean(page && typeof page === 'object' && 'properties' in page)
}
