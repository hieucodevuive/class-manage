'use client';

import { useState } from 'react';
import { FileSpreadsheet, UserPlus } from 'lucide-react';

import CButton from './CButton';
import { CSelect } from './CSelect';
import { ModuleType } from '@/types';

const times = [
  { label: '30 ngày', value: '1' },
  { label: '90 ngày', value: '2' },
  { label: '1 năm', value: '3' },
];

interface IPageHeader {
  title: string;
  subTitle: string;
  moduleType?: ModuleType;
}

export default function PageHeader({
  title,
  subTitle,
  moduleType,
}: IPageHeader) {
  const [time, setTime] = useState<string | null>('1');

  const handleTimeChange = (value: string | null) => {
    setTime(value);

    if (!value) return;
  };

  return (
    <div className="flex h-18 w-full items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-black">{title}</h2>

        <span className="text-muted-foreground text-sm">{subTitle}</span>
      </div>

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
        {moduleType !== ModuleType.DASHBOARD && (
          <CButton text="Thêm học sinh" icon={<UserPlus />} />
        )}
      </div>
    </div>
  );
}
