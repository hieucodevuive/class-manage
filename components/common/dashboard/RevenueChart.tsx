'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

import CardItem from '@/components/common/CardItem';

export interface RevenueData {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

const chartConfig = {
  revenue: {
    label: 'Doanh thu',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

const formatRevenue = (value: number) => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(0)} triệu`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}K`;
  }

  return value.toString();
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
};

export default function RevenueChart({ data }: RevenueChartProps) {
  const averageRevenue = data.length
    ? data.reduce((total, item) => total + item.revenue, 0) / data.length
    : 0;

  return (
    <CardItem className="mt-2 mb-2">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-base font-semibold">Doanh thu hàng tháng</h3>

        <div className="text-right">
          <p className="text-muted-foreground text-xs">Trung bình / tháng</p>

          <p className="text-sm font-semibold">
            {formatCurrency(averageRevenue)}
          </p>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[270px] w-full">
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 6,
            right: 6,
            top: 6,
            bottom: 6,
          }}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tickFormatter={formatRevenue}
          />

          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value) => (
                  <span className="font-medium">
                    {formatCurrency(Number(value))}
                  </span>
                )}
              />
            }
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </CardItem>
  );
}
