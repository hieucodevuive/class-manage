import PageHeader from '@/components/common/PageHeader';
import { ModuleType } from '@/types';
import StudentForm from '../StudentForm';

export default function CreateStudentPage() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <PageHeader
        title="Thêm học sinh"
        subTitle="Tạo học sinh mới cho trung tâm"
        moduleType={ModuleType.STUDENT}
        noActions={true}
      />

      <StudentForm mode="create" />
    </div>
  );
}
