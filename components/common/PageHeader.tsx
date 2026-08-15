'use client';

import { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';

import CButton from './CButton';
import { CSelect } from './CSelect';

const times = [
  { label: '30 ngày', value: '1' },
  { label: '90 ngày', value: '2' },
  { label: '1 năm', value: '3' },
];

export default function PageHeader() {
  const [time, setTime] = useState<string | null>('1');

  const handleTimeChange = (value: string | null) => {
    setTime(value);

    if (!value) return;
  };

  return (
    <div className="flex h-18 w-full items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-black">Thống kê</h2>

        <span className="text-muted-foreground text-sm">
          Chào mừng bạn trở lại, hãy xem số liệu ngày hôm nay!
        </span>
      </div>

      <div className="flex items-center gap-2">
        <CSelect
          items={times}
          value={time}
          onValueChange={handleTimeChange}
          className="w-32"
        />

        <CButton text="Tạo file Excel" icon={<FileSpreadsheet />} />
      </div>
    </div>
  );
}
