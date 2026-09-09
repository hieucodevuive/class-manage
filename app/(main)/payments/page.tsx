import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/common/table';

import { IPayment, ModuleType } from '@/types';

export const payments: IPayment[] = [
  {
    id: 'payment-001',
    studentId: 'student-001',
    studentName: 'Nguyễn Minh Anh',
    classId: 'class-001',
    className: 'Ngữ văn 10A',
    pricePerSession: 150000,
    sessionCount: 8,
    paidAmount: 1200000,
    paymentDate: '2026-09-01',
    note: '',
  },

  {
    id: 'payment-002',
    studentId: 'student-002',
    studentName: 'Trần Hoàng Nam',
    classId: 'class-001',
    className: 'Ngữ văn 10A',
    pricePerSession: 150000,
    sessionCount: 8,
    paidAmount: 900000,
    paymentDate: '2026-09-02',
    note: 'Đóng trước một phần',
  },

  {
    id: 'payment-003',
    studentId: 'student-003',
    studentName: 'Lê Khánh Linh',
    classId: 'class-002',
    className: 'Ngữ văn 10B',
    pricePerSession: 150000,
    sessionCount: 8,
    paidAmount: 1200000,
    paymentDate: '2026-09-01',
    note: '',
  },

  {
    id: 'payment-004',
    studentId: 'student-004',
    studentName: 'Phạm Đức Anh',
    classId: 'class-002',
    className: 'Ngữ văn 10B',
    pricePerSession: 150000,
    sessionCount: 6,
    paidAmount: 600000,
    paymentDate: '2026-09-03',
    note: 'Còn thiếu 300.000đ',
  },

  {
    id: 'payment-005',
    studentId: 'student-005',
    studentName: 'Nguyễn Thu Hà',
    classId: 'class-003',
    className: 'Ngữ văn 11A',
    pricePerSession: 170000,
    sessionCount: 8,
    paidAmount: 1360000,
    paymentDate: '2026-09-02',
    note: '',
  },

  {
    id: 'payment-006',
    studentId: 'student-006',
    studentName: 'Đỗ Quang Huy',
    classId: 'class-003',
    className: 'Ngữ văn 11A',
    pricePerSession: 170000,
    sessionCount: 8,
    paidAmount: 850000,
    paymentDate: '2026-09-04',
    note: 'Đóng trước một phần',
  },

  {
    id: 'payment-007',
    studentId: 'student-007',
    studentName: 'Vũ Ngọc Mai',
    classId: 'class-004',
    className: 'Ngữ văn 11B',
    pricePerSession: 170000,
    sessionCount: 8,
    paidAmount: 1360000,
    paymentDate: '2026-09-03',
    note: '',
  },

  {
    id: 'payment-008',
    studentId: 'student-008',
    studentName: 'Hoàng Minh Đức',
    classId: 'class-005',
    className: 'Ngữ văn 12A',
    pricePerSession: 200000,
    sessionCount: 8,
    paidAmount: 1000000,
    paymentDate: '2026-09-05',
    note: 'Đóng trước một phần',
  },

  {
    id: 'payment-009',
    studentId: 'student-009',
    studentName: 'Nguyễn Thảo Vy',
    classId: 'class-005',
    className: 'Ngữ văn 12A',
    pricePerSession: 200000,
    sessionCount: 8,
    paidAmount: 1600000,
    paymentDate: '2026-09-02',
    note: '',
  },

  {
    id: 'payment-010',
    studentId: 'student-010',
    studentName: 'Trần Gia Bảo',
    classId: 'class-006',
    className: 'Ngữ văn 12B',
    pricePerSession: 200000,
    sessionCount: 6,
    paidAmount: 800000,
    paymentDate: '2026-09-06',
    note: 'Còn thiếu 400.000đ',
  },
];

const PaymentsPage = () => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <PageHeader
        title="Thanh toán"
        subTitle="Quản lý các giao dịch thanh toán"
        moduleType={ModuleType.PAYMENT}
      />
      <DataTable moduleType={ModuleType.PAYMENT} tableData={payments} />
    </div>
  );
};

export default PaymentsPage;
