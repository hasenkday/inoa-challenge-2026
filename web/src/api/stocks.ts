import { api } from './client'
import type { GetStocksParams, GetStocksResponse, SearchStocksResponse } from './types'

export async function getStocks(params: GetStocksParams) {
  const { data } = await api.get<GetStocksResponse>('/api/stocks', {
    params: {
      ...params,
      tickers: params.tickers.join(','),
    },
  })

  return data
}

export async function searchStocks(query: string) {
  const { data } = await api.get<SearchStocksResponse>('/api/stocks/search', {
    params: {
      query,
    },
  })

  return data
}
