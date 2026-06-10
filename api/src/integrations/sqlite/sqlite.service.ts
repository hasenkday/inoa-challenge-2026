import { Injectable, OnModuleInit } from '@nestjs/common'
import Database, { type Database as SqliteDatabase } from 'better-sqlite3'
import { mkdirSync } from 'fs'
import { dirname, join } from 'path'

/**
 * Handles the local SQLite database connection.
 */
@Injectable()
export class SqliteService implements OnModuleInit {
  private db!: SqliteDatabase

  onModuleInit() {
    const dbPath = join(process.cwd(), 'storage', 'b3-stock-viewer.sqlite')
    mkdirSync(dirname(dbPath), { recursive: true })

    this.db = new Database(dbPath)
    this.db.pragma('journal_mode = WAL')
    this.createTables()
  }

  get connection(): SqliteDatabase {
    return this.db
  }

  private createTables() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS stock_prices (
        ticker TEXT NOT NULL,
        date TEXT NOT NULL,
        close REAL NOT NULL,
        saved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (ticker, date)
      );

      CREATE TABLE IF NOT EXISTS stock_cached_months (
        ticker TEXT NOT NULL,
        month TEXT NOT NULL,
        saved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (ticker, month)
      );

      CREATE TABLE IF NOT EXISTS stocks_catalog (
        ticker TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        sector TEXT,
        is_available INTEGER NOT NULL DEFAULT 1,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)
  }
}
