import React from 'react';
import { cn } from '@/lib/utils';

interface ICardItem {
  children: React.ReactNode;
  canHover?: boolean;
  className?: string;
}

export default function CardItem({
  children,
  canHover = false,
  className,
}: ICardItem) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4 transition-colors',
        canHover && 'hover:bg-gray-100 dark:hover:bg-gray-800',
        className,
      )}
    >
      {children}
    </div>
  );
}
