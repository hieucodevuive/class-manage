import PageHeader from '@/components/common/PageHeader';
import { ModuleType } from '@/types';
import ClassForm from '../ClassForm';

export default function CreateClassPage() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <PageHeader
        title="Thêm lớp học"
        subTitle="Tạo lớp học mới cho trung tâm"
        moduleType={ModuleType.CLASS}
        noActions={true}
      />

      <ClassForm mode="create" />
    </div>
  );
}
