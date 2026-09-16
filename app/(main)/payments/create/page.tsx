import PageHeader from '@/components/common/PageHeader';
import { ModuleType } from '@/types';
import PaymentForm from '../PaymentForm';

export default function CreatePaymentPage() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <PageHeader
        title="Thêm thanh toán"
        subTitle="Tạo thanh toán mới cho học sinh"
        moduleType={ModuleType.PAYMENT}
        noActions={true}
      />

      <PaymentForm mode="create" />
    </div>
  );
}
