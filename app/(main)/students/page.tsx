import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/common/table';
import { IStudent, ModuleType } from '@/types';

export const students: IStudent[] = [
  {
    id: 'ST001',
    name: 'Nguyễn Minh Anh',
    classId: 'CLASS001',
    school: 'THPT Phủ Thông',
    grade: 10,
    parentName: 'Nguyễn Văn Hùng',
    phone: '0912345678',
    status: 'ACTIVE',
  },
  {
    id: 'ST002',
    name: 'Trần Hoàng Nam',
    classId: 'CLASS001',
    school: 'THPT Phủ Thông',
    grade: 10,
    parentName: 'Trần Văn Minh',
    phone: '0987654321',
    status: 'ACTIVE',
  },
  {
    id: 'ST003',
    name: 'Lê Thu Hà',
    classId: 'CLASS002',
    school: 'THPT Phủ Thông',
    grade: 11,
    parentName: 'Lê Văn Thành',
    phone: '0901234567',
    status: 'ACTIVE',
  },
  {
    id: 'ST004',
    name: 'Phạm Đức Anh',
    classId: 'CLASS002',
    school: 'THPT Phủ Thông',
    grade: 11,
    parentName: 'Phạm Văn Đức',
    phone: '0934567890',
    status: 'INACTIVE',
  },
  {
    id: 'ST005',
    name: 'Đỗ Ngọc Lan',
    classId: 'CLASS003',
    school: 'THPT Bắc Kạn',
    grade: 12,
    parentName: 'Đỗ Văn Nam',
    phone: '0961234567',
    status: 'ACTIVE',
  },
  {
    id: 'ST006',
    name: 'Vũ Quang Huy',
    classId: 'CLASS003',
    school: 'THPT Bắc Kạn',
    grade: 12,
    parentName: 'Vũ Văn Hoàng',
    phone: '0978123456',
    status: 'ACTIVE',
  },
  {
    id: 'ST007',
    name: 'Nguyễn Thùy Linh',
    classId: 'CLASS001',
    school: 'THPT Phủ Thông',
    grade: 10,
    parentName: 'Nguyễn Văn Long',
    phone: '0908765432',
    status: 'ACTIVE',
  },
  {
    id: 'ST008',
    name: 'Hoàng Gia Bảo',
    classId: 'CLASS002',
    school: 'THPT Phủ Thông',
    grade: 11,
    parentName: 'Hoàng Văn Bình',
    phone: '0918765432',
    status: 'INACTIVE',
  },
  {
    id: 'ST009',
    name: 'Bùi Khánh Linh',
    classId: 'CLASS003',
    school: 'THPT Bắc Kạn',
    grade: 12,
    parentName: 'Bùi Văn Nam',
    phone: '0945678123',
    status: 'ACTIVE',
  },
  {
    id: 'ST010',
    name: 'Phan Đức Minh',
    classId: 'CLASS001',
    school: 'THPT Phủ Thông',
    grade: 10,
    parentName: 'Phan Văn Hùng',
    phone: '0981234567',
    status: 'ACTIVE',
  },
];

const StudentsPage = () => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <PageHeader
        title="Học sinh"
        subTitle="Quản lý học sinh của trung tâm"
        moduleType={ModuleType.STUDENT}
      />
      <DataTable moduleType={ModuleType.STUDENT} tableData={students} />
    </div>
  );
};

export default StudentsPage;
