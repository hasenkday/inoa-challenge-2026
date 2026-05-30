import type { StockChartData } from '@/api/types'

export function exportStocksToCsv(data: StockChartData[], tickers: string[]) {
  const headers = ['date', ...tickers]
  const rows = data.map((item) => headers.map((header) => item[header] ?? '').join(','))

  const csv = [headers.join(','), ...rows].join('\n')
  const file = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(file)

  const link = document.createElement('a')
  link.href = url
  link.download = 'b3-stock-viewer.csv'
  link.click()

  URL.revokeObjectURL(url)
}
