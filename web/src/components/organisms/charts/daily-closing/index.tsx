import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import type { StockChartData } from '@/api/types'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { getStockColorVarByTicker } from '@/lib/stock-colors'

type DailyClosingChartProps = {
  data: StockChartData[]
  tickers: string[]
}

export function DailyClosingChart({ data, tickers }: DailyClosingChartProps) {
  const chartConfig = tickers.reduce((config, ticker, index) => {
    config[ticker] = {
      label: ticker,
      color: getStockColorVarByTicker(ticker, tickers),
    }

    return config
  }, {} as ChartConfig)

  return (
    <ChartContainer config={chartConfig} className="h-full min-h-[280px] w-full">
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const date = new Date(value)

            return date.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
            })
          }}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" labelKey="date" />}
        />

        {tickers.map((ticker) => (
          <Line
            key={ticker}
            dataKey={ticker}
            type="monotone"
            stroke={getStockColorVarByTicker(ticker, tickers)}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  )
}
