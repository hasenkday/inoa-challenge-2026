import { Injectable } from '@nestjs/common'

import type { ChartPoint, GetStocksParams } from './stocks.types'

/**
 * Handles stock market data business rules.
 */
@Injectable()
export class StocksService {
  /**
   * Service to get historical stock prices.
   */
  async getStocks(params: GetStocksParams): Promise<ChartPoint[]> {
    const { tickers, startDate, endDate } = params

    console.log({ tickers, startDate, endDate })

    // TODO: check cache, if none, get from Brapi api

    return [
      {
        date: '2026-01-01',
        PETR4: 40.5,
        VALE3: 75.6,
      },
    ]
  }
}
