import { IsString, MinLength } from 'class-validator'

export class SearchStocksDto {
  @IsString()
  @MinLength(1)
  query!: string
}
