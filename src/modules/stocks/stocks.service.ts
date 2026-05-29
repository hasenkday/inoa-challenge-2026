import { Injectable } from '@nestjs/common'

@Injectable()
export class StocksService {
  getPriceHistory(): Promise<any> {
    return Promise.resolve('something')
  }
}
