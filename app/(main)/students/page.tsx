import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/common/table';
import { ModuleType } from '@/types';

const StudentsPage = () => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <PageHeader
        title="Học sinh"
        subTitle="Quản lý học sinh của trung tâm"
        moduleType={ModuleType.STUDENT}
      />
      <DataTable moduleType={ModuleType.STUDENT} />
    </div>
  );
};

export default StudentsPage;
