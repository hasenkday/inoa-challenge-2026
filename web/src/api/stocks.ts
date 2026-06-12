import axios from 'axios'

import { api } from './client'
import type {
  ApiErrorResponse,
  GetStocksParams,
  GetStocksResponse,
  SearchStocksResponse,
} from './types'

function getApiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return fallback
  }

  if (!error.response) {
    return 'Não foi possível conectar à API. Verifique se o servidor está rodando.'
  }

  return error.response.data?.message ?? fallback
}

export async function getStocks(params: GetStocksParams) {
  try {
    const { data } = await api.get<GetStocksResponse>('/api/stocks', {
      params: {
        ...params,
        tickers: params.tickers.join(','),
      },
    })

    return data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Não foi possível buscar o histórico dos ativos.'))
  }
}

export async function searchStocks(query: string) {
  try {
    const { data } = await api.get<SearchStocksResponse>('/api/stocks/search', {
      params: {
        query,
      },
    })

    return data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Não foi possível buscar ativos disponíveis.'))
  }
}
