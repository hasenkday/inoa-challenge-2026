import { BadGatewayException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { messages } from '@/common/constants/messages'
import { env } from '@/config/env'
import type { StockCatalogRow } from '@/modules/stocks/cache/stocks-cache.types'

import type { BrapiQuoteResponse } from './brapi.types'
import type { BrapiStockListResponse } from './brapi.types'

/**
 * Handles communication with the external brapi API.
 * This service uses parallel requests to enhance response time.
 */
@Injectable()
export class BrapiService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Searches available stocks using Brapi quote list.
   */
  async searchStocks(query: string): Promise<StockCatalogRow[]> {
    try {
      const url = new URL(`${env.BRAPI_BASE_URL}/quote/list`)

      url.searchParams.set('search', query)
      url.searchParams.set('limit', '20')
      url.searchParams.set('sortBy', 'name')
      url.searchParams.set('sortOrder', 'asc')

      const token = this.configService.get<string>('BRAPI_TOKEN')

      if (token) {
        url.searchParams.set('token', token)
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('BRAPI_STOCK_LIST_REQUEST_FAILED')
      }

      const data = (await response.json()) as BrapiStockListResponse

      // Traz todos exceto os fracionários.
      const stocks = (data.stocks ?? []).filter((stock) => !stock.stock.endsWith('F'))

      return stocks.map((stock) => ({
        ticker: stock.stock.toUpperCase(),
        name: stock.name ?? stock.stock,
        sector: stock.sector ?? null,
        is_available: 1,
        updated_at: new Date().toISOString(),
      }))
    } catch (error) {
      console.error('Brapi stock search error:', error)

      throw new BadGatewayException(messages.brapi.searchFailed)
    }
  }

  /**
   * Get historical stock prices from brapi.
   */
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
