'use client';
import PageHeader from '@/components/common/PageHeader';
import { ModuleType } from '@/types';
import { useParams } from 'next/navigation';
import StudentForm from '../../StudentForm';

export default function EditStudentPage() {
  const { studentId } = useParams();

  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <PageHeader
        title="Sửa thông tin học sinh"
        subTitle="Học sinh 10A1 - Nguyễn Văn A"
        moduleType={ModuleType.STUDENT}
        noActions={true}
      />

      <StudentForm mode="edit" studentId={String(studentId)} />
    </div>
  );
}
