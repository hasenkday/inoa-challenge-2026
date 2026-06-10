import { Injectable } from '@nestjs/common'

import { messages } from '@/common/constants/messages'
import { getMonthDateRange, getMonthsBetween } from '@/common/functions/date-handlers'
import { mapBrapiToChartData } from '@/integrations/brapi/brapi.mapper'
import { BrapiService } from '@/integrations/brapi/brapi.service'
import { mapCachedRowsToChartData } from '@/modules/stocks/mappers/chart-data.mapper'

import { StocksCacheService } from './cache/stocks-cache.service'
import type { StockCatalogRow } from './cache/stocks-cache.types'
import {
  buildStockComparison,
  buildStockSimulation,
  findBestPerformance,
  findWorstPerformance,
  formatPeriodLabel,
} from './mappers/stock-analysis.mapper'
import type { GetStocksParams, GetStocksResult } from './stocks.types'

/**
 * Handles stock market data business rules.
 */
@Injectable()
export class StocksService {
  constructor(
    private readonly brapiService: BrapiService,
    private readonly stocksCacheService: StocksCacheService
  ) {}

  /**
   * Service to get historical stock prices
   * and maps them to the expected chart format.
   */
  async getStocks(params: GetStocksParams): Promise<GetStocksResult> {
    const warnings = await this.populateMissingCache(params)

    const cachedRows = this.stocksCacheService.findPricesByPeriod(params)

    const chartData = mapCachedRowsToChartData(cachedRows)
    const comparison = buildStockComparison(chartData, params.tickers)

    const periodLabel = formatPeriodLabel(params.startDate, params.endDate)
    const bestPerformance = findBestPerformance(comparison)
    const worstPerformance = findWorstPerformance(comparison)
    const simulation = {
      best: bestPerformance ? buildStockSimulation(chartData, bestPerformance.ticker) : null,
      worst: worstPerformance ? buildStockSimulation(chartData, worstPerformance.ticker) : null,
    }

    return {
      chartData,
      comparison,
      summary: {
        periodLabel,
        bestPerformance,
        worstPerformance,
        simulation,
      },
      warnings,
    }
  }

  /**
   * Ensures all requested ticker/month combinations are cached.
   */
  private async populateMissingCache(params: GetStocksParams): Promise<string[]> {
    const warnings: string[] = []
    const months = getMonthsBetween(params.startDate, params.endDate)

    for (const ticker of params.tickers) {
      try {
        for (const month of months) {
          await this.cacheMonthIfNeeded(ticker, month)
        }
      } catch {
        warnings.push(messages.stocks.notFound(ticker))
      }
    }

    return warnings
  }

  /**
   * Fetches and stores a month when it is not cached yet.
   */
  private async cacheMonthIfNeeded(ticker: string, month: string): Promise<void> {
    const isCached = this.stocksCacheService.isMonthCached(ticker, month)

    if (isCached) return

    const monthRange = getMonthDateRange(month)

    const brapiResponse = await this.brapiService.getHistoricalPrices({
      tickers: [ticker],
      startDate: monthRange.startDate,
      endDate: monthRange.endDate,
    })

    const chartData = mapBrapiToChartData(brapiResponse.results)

    const prices = chartData
      .filter((point) => typeof point[ticker] === 'number')
      .map((point) => ({
        ticker,
        date: point.date,
        close: point[ticker] as number,
      }))

    this.stocksCacheService.savePrices(prices)
    this.stocksCacheService.markMonthAsCached(ticker, month)
  }

  /**
   * Searches stocks by ticker or name using the local catalog first.
   */
  async searchStocks(query: string): Promise<StockCatalogRow[]> {
    const normalizedQuery = query.trim().toUpperCase()

    const cachedItems = this.stocksCacheService.findCatalogItems(normalizedQuery)

    if (cachedItems.length) {
      return cachedItems
    }

    const brapiItems = await this.brapiService.searchStocks(normalizedQuery)

    if (brapiItems.length) {
      this.stocksCacheService.saveCatalogItems(brapiItems)
    }

    return brapiItems
  }
}
