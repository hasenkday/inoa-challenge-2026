import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

/**
 * Defines and validates the required query parameters.
 * The parameters can't be empty.
 */
export class GetStocksDto {
  /**
   * Stock tickers (Exemple: "PETR4, VALE3").
   */
  @IsString()
  @IsNotEmpty()
  tickers!: string

  /**
   * Initial date of the historical search period.
   */
  @IsDateString()
  @IsNotEmpty()
  startDate!: string

  /**
   * Final date of the historical search period.
   */
  @IsDateString()
  @IsNotEmpty()
  endDate!: string
}
