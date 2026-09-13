'use client';
import PageHeader from '@/components/common/PageHeader';
import { ModuleType } from '@/types';
import ClassForm from '../../ClassForm';
import { useParams } from 'next/navigation';

export default function EditClassPage() {
  const { classId } = useParams();

  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <PageHeader
        title="Sửa thông tin lớp học"
        subTitle="Lớp học 10A1 - Ngữ văn"
        moduleType={ModuleType.CLASS}
        noActions={true}
      />

      <ClassForm mode="edit" classId={String(classId)} />
    </div>
  );
}
