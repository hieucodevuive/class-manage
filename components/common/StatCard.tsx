import React from 'react';
import { cn } from '@/lib/utils';
import { ModuleType } from '@/types';
import { mainColor } from '@/configs';
import CardItem from './CardItem';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  moduleType?: ModuleType;
  description?: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  moduleType = ModuleType.STUDENT,
  description,
  trend,
  className,
}: StatCardProps) {
  const color = mainColor[moduleType];

  return (
    <CardItem className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm font-medium">{title}</p>

        <div
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg',
            color.background,
            color.text,
          )}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold tracking-tight">{value}</p>

        {(trend || description) && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={cn(
                  'rounded-md px-2 py-1 font-medium',
                  trend.positive
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-600',
                )}
              >
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>
            )}

            {description && (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </div>
    </CardItem>
  );
}
