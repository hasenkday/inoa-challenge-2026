import { api } from './client'
import type { GetStocksParams, GetStocksResponse } from './types'

export async function getStocks(params: GetStocksParams) {
  const { data } = await api.get<GetStocksResponse>('/api/stocks', {
    params: {
      ...params,
      tickers: params.tickers.join(','),
    },
  })

  return data
}
