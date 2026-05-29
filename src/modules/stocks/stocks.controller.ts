import { Controller, Get, Query } from '@nestjs/common'

import { messages } from '@/common/constants/messages'
import { successResponse } from '@/common/http/api-response'

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

    // Calls service
    const data = await this.stocksService.getStocks({
      tickers,
      startDate: query.startDate,
      endDate: query.endDate,
    })

    return successResponse(data.length ? messages.stocks.retrieved : messages.stocks.empty, data)
  }
}
