export type CaseCardDto = {
  slug: string
  title: string
  description?: string
  thumbnailUrl?: string

  position: number
  comingSoon?: boolean
  tagline?: string
}

export type CaseDetailDto = {
  slug: string
  title: string
  lastUpdate?: string

  company?: string
  period?: { start?: string; end?: string }
  role?: string
  caseType?: string
  status?: string
  nextStep?: string

  contentMarkdown: string
}

export type CaseMeta = {
  slug: string
  title: string
  lastUpdate?: string
  company?: string
  period?: { start?: string; end?: string }
  role?: string
  caseType?: string
  status?: string
  nextStep?: string
}

export type CaseRow = { pageId: string; item: CaseMeta }
