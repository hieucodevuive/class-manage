'use client';

import {
  CalendarDays,
  GraduationCap,
  History,
  MoreHorizontal,
  Pencil,
  Phone,
  School,
  Trash2,
  UserRound,
  Wallet,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { students } from './page';

interface IStudentDetailPanel {
  itemId: string;
}

const paymentHistory = [
  {
    id: 'payment-001',
    date: '05/09/2026',
    className: 'Lớp Văn 10A',
    amount: 800000,
    sessions: 8,
    status: 'PAID',
  },
  {
    id: 'payment-002',
    date: '05/08/2026',
    className: 'Lớp Văn 10A',
    amount: 800000,
    sessions: 8,
    status: 'PAID',
  },
  {
    id: 'payment-003',
    date: '05/07/2026',
    className: 'Lớp Văn 10A',
    amount: 700000,
    sessions: 7,
    status: 'PAID',
  },
];

export default function StudentDetailPanel({ itemId }: IStudentDetailPanel) {
  const student = students.find((item) => item.id === itemId);

  if (!student) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Không tìm thấy học sinh.
        </p>
      </div>
    );
  }

  const totalPaid = paymentHistory.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Student profile */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full">
            <UserRound className="size-6" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold">{student.name}</h2>

            <p className="text-muted-foreground mt-0.5 text-xs">{student.id}</p>
          </div>
        </div>

        <Badge
          variant={student.status === 'ACTIVE' ? 'default' : 'secondary'}
          className="shrink-0"
        >
          {student.status === 'ACTIVE' ? 'Đang học' : 'Đã nghỉ'}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="default" size="sm" className="flex-1">
          <Pencil className="mr-2 size-4" />
          Chỉnh sửa
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="mr-2 size-4" />
          Xóa
        </Button>
      </div>

      <Separator />

      {/* Basic information */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-muted flex size-8 items-center justify-center rounded-lg">
            <GraduationCap className="text-muted-foreground size-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">Thông tin học sinh</h3>

            <p className="text-muted-foreground text-xs">
              Thông tin học tập tại trường
            </p>
          </div>
        </div>

        <div className="bg-muted/30 grid grid-cols-2 gap-px overflow-hidden rounded-xl border">
          <InfoItem
            icon={<School className="size-4" />}
            label="Trường"
            value={student.school}
          />

          <InfoItem
            icon={<GraduationCap className="size-4" />}
            label="Khối"
            value={`Khối ${student.grade}`}
          />

          <InfoItem
            icon={<CalendarDays className="size-4" />}
            label="Lớp trung tâm"
            value={student.classId}
          />

          <InfoItem
            icon={<UserRound className="size-4" />}
            label="Mã học sinh"
            value={student.id}
          />
        </div>
      </section>

      {/* Parent information */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-muted flex size-8 items-center justify-center rounded-lg">
            <UserRound className="text-muted-foreground size-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">Thông tin phụ huynh</h3>

            <p className="text-muted-foreground text-xs">Thông tin liên hệ</p>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground text-sm">Họ tên</span>

            <span className="text-right text-sm font-medium">
              {student.parentName}
            </span>
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground flex items-center gap-2 text-sm">
              <Phone className="size-4" />
              Số điện thoại
            </span>

            <span className="text-sm font-medium">{student.phone}</span>
          </div>
        </div>
      </section>

      {/* Payment summary */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-muted flex size-8 items-center justify-center rounded-lg">
            <Wallet className="text-muted-foreground size-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">Thanh toán</h3>

            <p className="text-muted-foreground text-xs">
              Tổng quan lịch sử đóng học phí
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border p-4">
            <p className="text-muted-foreground text-xs">Đã thanh toán</p>

            <p className="mt-1 text-lg font-semibold">
              {totalPaid.toLocaleString('vi-VN')}đ
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-muted-foreground text-xs">Số lần đóng</p>

            <p className="mt-1 text-lg font-semibold">
              {paymentHistory.length}
            </p>
          </div>
        </div>
      </section>

      {/* Payment history */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-muted flex size-8 items-center justify-center rounded-lg">
              <History className="text-muted-foreground size-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold">Lịch sử thanh toán</h3>

              <p className="text-muted-foreground text-xs">
                Các lần đóng học phí gần đây
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="hover:bg-muted/30 rounded-xl border p-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{payment.className}</p>

                  <p className="text-muted-foreground mt-1 text-xs">
                    {payment.date} · {payment.sessions} buổi
                  </p>
                </div>

                <Badge variant="secondary" className="shrink-0 text-xs">
                  Đã đóng
                </Badge>
              </div>

              <Separator className="my-3" />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">Số tiền</span>

                <span className="text-sm font-semibold">
                  {payment.amount.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="bg-background min-w-0 p-4">
      <div className="text-muted-foreground flex items-center gap-2 text-xs">
        {icon}
        {label}
      </div>

      <p className="mt-1 truncate text-sm font-medium">{value}</p>
    </div>
  );
}
