import { BadGatewayException, Injectable } from '@nestjs/common'

import { messages } from '@/common/constants/messages'
import { env } from '@/config/env'

import type { BrapiQuoteResponse } from './brapi.types'

/**
 * Handles communication with the external brapi API.
 * This service uses parallel requests to enhance response time.
 */
@Injectable()
export class BrapiService {
  async getHistoricalPrices(params: {
    tickers: string[]
    startDate: string
    endDate: string
  }): Promise<BrapiQuoteResponse> {
    try {
      const responses = await Promise.all(
        params.tickers.map(async (ticker) => {
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

          return response.json() as Promise<BrapiQuoteResponse>
        })
      )

      return {
        results: responses.flatMap((response) => response.results),
      }
    } catch (error) {
      console.error('Falha ao adquirir dados da API do Brapi.', error)
      throw new BadGatewayException(messages.brapi.failed)
    }
  }
}
