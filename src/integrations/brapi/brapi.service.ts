import { Injectable } from '@nestjs/common'

import { env } from '@/config/env'

import type { BrapiQuoteResponse } from './brapi.types'

/**
 * Handles communication with the external Brapi API.
 */
@Injectable()
export class BrapiService {
  async getHistoricalPrices(params: {
    tickers: string[]
    startDate: string
    endDate: string
  }): Promise<BrapiQuoteResponse> {
    const results: BrapiQuoteResponse['results'] = []

    // Upgrade to promise.all and use try.catchs
    for (const ticker of params.tickers) {
      const url = new URL(`${env.BRAPI_BASE_URL}/quote/${ticker}`)

      url.searchParams.set('interval', '1d')
      url.searchParams.set('startDate', params.startDate)
      url.searchParams.set('endDate', params.endDate)

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${env.BRAPI_TOKEN}`,
        },
      })

      if (!response.ok) {
        const errorBody = await response.text()

        console.error('BRAPI ERROR:', {
          ticker,
          status: response.status,
          body: errorBody,
        })

        throw new Error('BRAPI_REQUEST_FAILED')
      }

      const data = (await response.json()) as BrapiQuoteResponse

      results.push(...data.results)
    }

    return { results }
  }
}
