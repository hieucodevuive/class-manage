'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

import CardItem from '@/components/common/CardItem';

export interface StudentsByClassData {
  className: string;
  students: number;
}

interface StudentsByClassChartProps {
  data: StudentsByClassData[];
}

const chartConfig = {
  students: {
    label: 'Học sinh',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export default function StudentsByClassChart({
  data,
}: StudentsByClassChartProps) {
  return (
    <CardItem className="mb-2 w-full">
      <div className="mb-6">
        <h3 className="text-base font-semibold">Số lượng học sinh theo lớp</h3>
      </div>

      <ChartContainer config={chartConfig} className="h-[270px] w-full">
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{
            left: 6,
            right: 6,
            top: 6,
            bottom: 6,
          }}
        >
          <CartesianGrid horizontal={false} />

          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
          />

          <YAxis
            dataKey="className"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            width={50}
          />

          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          <Bar dataKey="students" fill="var(--color-students)" radius={6} />
        </BarChart>
      </ChartContainer>
    </CardItem>
  );
}
