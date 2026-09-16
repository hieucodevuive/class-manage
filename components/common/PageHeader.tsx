'use client';

import { useState } from 'react';
import {
  FileSpreadsheet,
  UserPlus,
  CircleDollarSign,
  Plus,
} from 'lucide-react';

import CButton from './CButton';
import { CSelect } from './CSelect';
import { ModuleType } from '@/types';
import { redirect } from 'next/navigation';

const times = [
  { label: '30 ngày', value: '1' },
  { label: '90 ngày', value: '2' },
  { label: '1 năm', value: '3' },
];

interface IPageHeader {
  title: string;
  subTitle: string;
  moduleType?: ModuleType;
  noActions?: boolean;
}

const moduleActions = {
  [ModuleType.STUDENT]: {
    label: 'Thêm học sinh',
    icon: <UserPlus />,
    onClick: () => {
      redirect('/students/create');
    },
  },
  [ModuleType.CLASS]: {
    label: 'Thêm lớp học',
    icon: <Plus />,
    onClick: () => {
      redirect('/classes/create');
    },
  },
  [ModuleType.PAYMENT]: {
    label: 'Tạo thanh toán',
    icon: <CircleDollarSign />,
    onClick: () => {
      redirect('/payments/create');
    },
  },
} as const;

export default function PageHeader({
  title,
  subTitle,
  moduleType,
  noActions,
}: IPageHeader) {
  const [time, setTime] = useState<string | null>('1');

  const handleTimeChange = (value: string | null) => {
    setTime(value);

    if (!value) return;
  };

  return (
    <div className="mt-2 mb-4 flex w-full flex-col justify-between gap-4 lg:mt-0 lg:mb-0 lg:h-18 lg:flex-row lg:items-center">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-black">{title}</h2>

        <span className="text-muted-foreground text-sm">{subTitle}</span>
      </div>

      {!noActions && (
        <div className="flex items-center gap-2">
          {moduleType === ModuleType.DASHBOARD && (
            <CSelect
              items={times}
              value={time ?? ''}
              onValueChange={handleTimeChange}
              className="w-32"
            />
          )}
          <CButton text="Tạo file Excel" icon={<FileSpreadsheet />} />
          {moduleType && moduleType !== ModuleType.DASHBOARD && (
            <CButton
              text={moduleActions[moduleType].label}
              icon={moduleActions[moduleType].icon}
              onClick={moduleActions[moduleType].onClick}
            />
          )}
        </div>
      )}
    </div>
  );
}
