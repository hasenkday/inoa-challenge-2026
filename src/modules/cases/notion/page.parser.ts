import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import {
  getDateRange,
  getDateStart,
  getNumber,
  getPlainText,
  pageProps,
} from '@/integrations/notion/helpers/props'

import { CASES_PROPS } from '../cases.props'
import type { CaseCardDto, CaseMeta } from '../cases.types'
import { buildTagline, getFirstFileUrl } from './utils'

export function mapPageToMeta(page: PageObjectResponse): CaseMeta | null {
  const props = pageProps(page)
  const title = getPlainText(props[CASES_PROPS.TITLE])
  const slug = getPlainText(props[CASES_PROPS.SLUG])
  if (!title || !slug) return null

  return {
    slug: slug.trim(),
    title: title.trim(),
    lastUpdate: getDateStart(props[CASES_PROPS.LAST_UPDATE]),
    company: getPlainText(props[CASES_PROPS.COMPANY]) ?? undefined,
    period: getDateRange(props[CASES_PROPS.PERIOD]),
    role: getPlainText(props[CASES_PROPS.ROLE]) ?? undefined,
    caseType: getPlainText(props[CASES_PROPS.CASE_TYPE]) ?? undefined,
    status: getPlainText(props[CASES_PROPS.STATUS]) ?? undefined,
    nextStep: getPlainText(props[CASES_PROPS.NEXT_STEP]) ?? undefined,
  }
}

export function mapPageToCard(page: PageObjectResponse): CaseCardDto | null {
  const props = pageProps(page)
  const title = getPlainText(props[CASES_PROPS.TITLE])
  const slug = getPlainText(props[CASES_PROPS.SLUG])
  if (!title || !slug) return null

  const description = getPlainText(props[CASES_PROPS.DESCRIPTION])
  const thumbnailUrl = getFirstFileUrl(props[CASES_PROPS.THUMBNAIL])
  const status = getPlainText(props[CASES_PROPS.STATUS])
  const caseType = getPlainText(props[CASES_PROPS.CASE_TYPE])

  const comingSoon = Boolean(status && status.toLowerCase().includes('soon'))
  const tagline = buildTagline(status ?? undefined, caseType ?? undefined)
  const position = getNumber(props[CASES_PROPS.POSITION]) ?? 9999

  return {
    slug: slug.trim(),
    title: title.trim(),
    description: description?.trim() || undefined,
    thumbnailUrl,
    position,
    comingSoon,
    tagline,
  }
}
