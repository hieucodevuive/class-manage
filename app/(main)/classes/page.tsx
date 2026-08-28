import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/common/table';
import { ModuleType } from '@/types';

import { ClassStatus, IClass } from '@/types';

export const classes: IClass[] = [
  {
    id: 'class-001',
    name: 'Ngữ văn 10A',
    code: 'VAN10A',
    description: 'Lớp Ngữ văn khối 10',
    subject: 'Ngữ văn',
    grade: 10,
    schedule: 'Thứ 2, Thứ 4 - 18:00',
    startDate: '2026-09-01',
    endDate: '2027-05-31',
    pricePerSession: 150000,
    maxStudents: 20,
    studentCount: 15,
    status: ClassStatus.ACTIVE,
  },

  {
    id: 'class-002',
    name: 'Ngữ văn 10B',
    code: 'VAN10B',
    description: 'Lớp Ngữ văn khối 10',
    subject: 'Ngữ văn',
    grade: 10,
    schedule: 'Thứ 3, Thứ 5 - 18:00',
    startDate: '2026-09-01',
    endDate: '2027-05-31',
    pricePerSession: 150000,
    maxStudents: 20,
    studentCount: 18,
    status: ClassStatus.ACTIVE,
  },

  {
    id: 'class-003',
    name: 'Ngữ văn 11A',
    code: 'VAN11A',
    description: 'Lớp Ngữ văn khối 11',
    subject: 'Ngữ văn',
    grade: 11,
    schedule: 'Thứ 2, Thứ 6 - 19:30',
    startDate: '2026-09-01',
    endDate: '2027-05-31',
    pricePerSession: 170000,
    maxStudents: 20,
    studentCount: 12,
    status: ClassStatus.ACTIVE,
  },

  {
    id: 'class-004',
    name: 'Ngữ văn 11B',
    code: 'VAN11B',
    description: 'Lớp Ngữ văn khối 11',
    subject: 'Ngữ văn',
    grade: 11,
    schedule: 'Thứ 4, Thứ 7 - 19:30',
    startDate: '2026-09-01',
    endDate: '2027-05-31',
    pricePerSession: 170000,
    maxStudents: 20,
    studentCount: 20,
    status: ClassStatus.ACTIVE,
  },

  {
    id: 'class-005',
    name: 'Ngữ văn 12A',
    code: 'VAN12A',
    description: 'Lớp Ngữ văn luyện thi THPT',
    subject: 'Ngữ văn',
    grade: 12,
    schedule: 'Thứ 3, Thứ 6 - 19:30',
    startDate: '2026-09-01',
    endDate: '2027-05-31',
    pricePerSession: 200000,
    maxStudents: 18,
    studentCount: 16,
    status: ClassStatus.ACTIVE,
  },

  {
    id: 'class-006',
    name: 'Ngữ văn 12B',
    code: 'VAN12B',
    description: 'Lớp Ngữ văn luyện thi THPT',
    subject: 'Ngữ văn',
    grade: 12,
    schedule: 'Thứ 5, Chủ nhật - 19:30',
    startDate: '2026-09-01',
    endDate: '2027-05-31',
    pricePerSession: 200000,
    maxStudents: 18,
    studentCount: 10,
    status: ClassStatus.ACTIVE,
  },

  {
    id: 'class-007',
    name: 'Ngữ văn 10C',
    code: 'VAN10C',
    description: 'Lớp Ngữ văn cơ bản',
    subject: 'Ngữ văn',
    grade: 10,
    schedule: 'Thứ 7, Chủ nhật - 15:00',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    pricePerSession: 140000,
    maxStudents: 15,
    studentCount: 15,
    status: ClassStatus.COMPLETED,
  },
];

const ClassesPage = () => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <PageHeader
        title="Lớp học"
        subTitle="Quản lý các lớp học"
        moduleType={ModuleType.CLASS}
      />
      <DataTable moduleType={ModuleType.CLASS} tableData={classes} />
    </div>
  );
};

export default ClassesPage;
