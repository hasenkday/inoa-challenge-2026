import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import type { StockChartData } from '@/api/types'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

type DailyClosingChartProps = {
  data: StockChartData[]
  tickers: string[]
}

const chartColors: Record<string, string> = {
  PETR4: 'var(--color-chart-yellow)',
  VALE3: 'var(--color-chart-green)',
}

const chartConfig = {
  PETR4: {
    label: 'PETR4',
    color: chartColors.PETR4,
  },
  VALE3: {
    label: 'VALE3',
    color: chartColors.VALE3,
  },
} satisfies ChartConfig

export function DailyClosingChart({ data, tickers }: DailyClosingChartProps) {
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
            stroke={chartColors[ticker] ?? 'var(--color-primary)'}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  )
}
