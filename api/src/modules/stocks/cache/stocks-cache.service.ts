import { Injectable } from '@nestjs/common'

import { SqliteService } from '@/integrations/sqlite/sqlite.service'

import { StockCatalogRow, StockPriceRow } from './stocks-cache.types'

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

  /**
   * Save stock price row in database.
   */
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

  /**
   * Brings all the stock prices between the selected period.
   */
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

  /**
   * Saves stock catalog items locally.
   */
  saveCatalogItems(items: StockCatalogRow[]): void {
    const statement = this.sqliteService.connection.prepare(`
    INSERT OR REPLACE INTO stocks_catalog (
      ticker,
      name,
      sector,
      is_available,
      updated_at
    )
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
  `)

    const insertMany = this.sqliteService.connection.transaction(
      (catalogItems: StockCatalogRow[]) => {
        for (const item of catalogItems) {
          statement.run(item.ticker, item.name, item.sector, item.is_available)
        }
      }
    )

    insertMany(items)
  }

  /**
   * Finds locally saved stock catalog items by ticker or name.
   */
  findCatalogItems(query: string): StockCatalogRow[] {
    const statement = this.sqliteService.connection.prepare(`
    SELECT *
    FROM stocks_catalog
    WHERE ticker LIKE ?
       OR name LIKE ?
    ORDER BY ticker ASC
    LIMIT 20
  `)

    const searchValue = `%${query}%`

    return statement.all(searchValue, searchValue) as StockCatalogRow[]
  }
}
