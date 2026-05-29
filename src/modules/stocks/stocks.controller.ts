import { Controller, Get, Query } from '@nestjs/common'

import { GetStocksDto } from './dto/get-stocks.dto'
import { StocksService } from './stocks.service'

/**
 * Handles HTTP requests related to stock price queries.
 */
@Controller('api/stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  /**
   * Get historical stock prices for one or more tickers.
   */
  @Get()
  async getStocks(@Query() query: GetStocksDto) {
    const tickers = query.tickers
      .split(',')
      .map((ticker) => ticker.trim().toUpperCase())
      .filter(Boolean)

    // calls service
    const data = await this.stocksService.getStocks({
      tickers,
      startDate: query.startDate,
      endDate: query.endDate,
    })

    return { message: 'Stocks retrieved successfully.', data }
    // TODO: create response pattern "successResponse " at "api-response"
  }
}
