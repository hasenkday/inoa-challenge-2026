import { Injectable } from '@nestjs/common'

import { mapBrapiToChartData } from '@/integrations/brapi/brapi.mapper'
import { BrapiService } from '@/integrations/brapi/brapi.service'

import type { ChartPoint, GetStocksParams } from './stocks.types'

/**
 * Handles stock market data business rules.
 */
@Injectable()
export class StocksService {
  constructor(private readonly brapiService: BrapiService) {}

  /**
   * Service to get historical stock prices.
   */
  async getStocks(params: GetStocksParams): Promise<ChartPoint[]> {
    // TODO: check cache

    // if none, get from Brapi api
    const brapiResponse = await this.brapiService.getHistoricalPrices(params)

    console.log({ ...brapiResponse })

    return mapBrapiToChartData(brapiResponse.results)
  }
}
