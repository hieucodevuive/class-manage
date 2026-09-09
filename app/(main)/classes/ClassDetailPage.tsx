'use client';

import { useEffect, useState } from 'react';
import { Users, CalendarDays, Banknote, Pencil, Trash2 } from 'lucide-react';
import { ModuleType } from '@/types';
import { useAppStore } from '@/stores';
import PanelLink from '@/components/common/PanelLink';

interface IClassStudent {
  id: string;
  name: string;
  school: string;
  grade: number;
  status: 'ACTIVE' | 'INACTIVE';
}

interface IClassDetail {
  id: string;
  name: string;
  pricePerSession: number;
  schedule: string;
  students: IClassStudent[];
}

interface IClassDetailPanelProps {
  itemId: string;
}

export default function ClassDetailPanel({ itemId }: IClassDetailPanelProps) {
  const { openPanel } = useAppStore();
  const [classDetail, setClassDetail] = useState<IClassDetail | null>(null);

  useEffect(() => {
    // TODO: replace bằng API
    const data: IClassDetail = {
      id: itemId,
      name: 'Lớp Văn 12A',
      pricePerSession: 150000,
      schedule: 'Thứ 2, 4, 6 - 19:00',
      students: [
        {
          id: 'ST001',
          name: 'Nguyễn Minh Anh',
          school: 'THPT Phủ Thông',
          grade: 10,
          status: 'ACTIVE',
        },
        {
          id: 'ST002',
          name: 'Trần Hoàng Nam',
          school: 'THPT Phủ Thông',
          grade: 10,
          status: 'ACTIVE',
        },
        {
          id: 'ST003',
          name: 'Lê Thu Hà',
          school: 'THPT Phủ Thông',
          grade: 11,
          status: 'ACTIVE',
        },
        {
          id: 'ST004',
          name: 'Phạm Đức Anh',
          school: 'THPT Phủ Thông',
          grade: 11,
          status: 'INACTIVE',
        },
        {
          id: 'ST005',
          name: 'Đỗ Ngọc Lan',
          school: 'THPT Bắc Kạn',
          grade: 12,
          status: 'ACTIVE',
        },
      ],
    };

    setClassDetail(data);
  }, [itemId]);

  if (!classDetail) {
    return (
      <div className="text-muted-foreground flex h-40 items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Class overview */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">{classDetail.name}</h2>
          <p className="text-muted-foreground text-sm">Thông tin lớp học</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border p-3">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Banknote className="size-4" />
              Giá / buổi
            </div>

            <p className="mt-1 font-medium">
              {classDetail.pricePerSession.toLocaleString('vi-VN')}đ
            </p>
          </div>

          <div className="rounded-lg border p-3">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Users className="size-4" />
              Học sinh
            </div>

            <p className="mt-1 font-medium">
              {classDetail.students.length} học sinh
            </p>
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <CalendarDays className="size-4" />
            Lịch học
          </div>

          <p className="mt-1 font-medium">{classDetail.schedule}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
          <Pencil className="size-4" />
          Chỉnh sửa
        </button>

        <button className="text-destructive flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
          <Trash2 className="size-4" />
          Xóa lớp
        </button>
      </div>

      {/* Students */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Danh sách học sinh</h3>

          <span className="text-muted-foreground text-sm">
            {classDetail.students.length} học sinh
          </span>
        </div>

        <div className="divide-y rounded-lg border">
          {classDetail.students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between gap-3 p-3"
            >
              <div className="min-w-0">
                <PanelLink moduleType={ModuleType.STUDENT} id={student.id}>
                  {student.name}
                </PanelLink>

                <p className="text-muted-foreground truncate text-xs">
                  {student.school} · Khối {student.grade}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                {student.status === 'ACTIVE' ? 'Đang học' : 'Đã nghỉ'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
