import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

import { chartData } from './mockapi'

const chartColors = {
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

export function DailyClosingChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full min-h-[280px] w-full">
      <LineChart accessibilityLayer data={chartData}>
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

        <Line
          dataKey="PETR4"
          type="monotone"
          stroke={chartColors.PETR4}
          strokeWidth={2}
          dot={false}
        />

        <Line
          dataKey="VALE3"
          type="monotone"
          stroke={chartColors.VALE3}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
