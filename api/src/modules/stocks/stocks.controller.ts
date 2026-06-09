import { Controller, Get, NotFoundException, Query } from '@nestjs/common'

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

    const result = await this.stocksService.getStocks({
      tickers,
      startDate: query.startDate,
      endDate: query.endDate,
    })

    if (!result.data.length) {
      throw new NotFoundException(messages.stocks.empty)
    }

    return successResponse(
      result.warnings.length ? messages.stocks.partiallyRetrieved : messages.stocks.retrieved,
      result.data,
      result.warnings
    )
  }
}
