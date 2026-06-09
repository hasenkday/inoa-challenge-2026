import { Injectable } from '@nestjs/common'

import { SqliteService } from '@/integrations/sqlite/sqlite.service'

import { StockPriceRow } from './stocks-cache.types'

/**
 * Handles stock cache persistence.
 */
@Injectable()
export class StocksCacheService {
  constructor(private readonly sqliteService: SqliteService) {}

  /**
   * Checks whether a ticker month has already been cached.
   */
  isMonthCached(ticker: string, month: string): boolean {
    const statement = this.sqliteService.connection.prepare(`
        SELECT 1
        FROM stock_cached_months
        WHERE ticker = ?
          AND month = ?
        LIMIT 1
      `)

    const result = statement.get(ticker, month)
    return Boolean(result)
  }

  /**
   * Marks a ticker month as cached.
   */
  markMonthAsCached(ticker: string, month: string): void {
    const statement = this.sqliteService.connection.prepare(`
        INSERT OR IGNORE INTO stock_cached_months (
          ticker,
          month
        )
        VALUES (?, ?)
      `)

    statement.run(ticker, month)
  }

  savePrices(prices: StockPriceRow[]): void {
    const statement = this.sqliteService.connection.prepare(`
    INSERT OR IGNORE INTO stock_prices (
      ticker,
      date,
      close
    )
    VALUES (?, ?, ?)
  `)

    const insertMany = this.sqliteService.connection.transaction((items: StockPriceRow[]) => {
      for (const item of items) {
        statement.run(item.ticker, item.date, item.close)
      }
    })

    insertMany(prices)
  }

  findPricesByPeriod(params: {
    tickers: string[]
    startDate: string
    endDate: string
  }): StockPriceRow[] {
    const placeholders = params.tickers.map(() => '?').join(',')

    const statement = this.sqliteService.connection.prepare(`
    SELECT ticker, date, close
    FROM stock_prices
    WHERE ticker IN (${placeholders})
      AND date BETWEEN ? AND ?
    ORDER BY date ASC
  `)

    return statement.all(...params.tickers, params.startDate, params.endDate) as StockPriceRow[]
  }
}
