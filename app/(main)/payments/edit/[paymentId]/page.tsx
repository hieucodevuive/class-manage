'use client';
import PageHeader from '@/components/common/PageHeader';
import { ModuleType } from '@/types';
import { useParams } from 'next/navigation';
import PaymentForm from '../../PaymentForm';

export default function EditPaymentPage() {
  const { paymentId } = useParams();

  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <PageHeader
        title="Sửa thông tin khoản thanh toán"
        subTitle="Lớp học 10A1 - Ngữ văn"
        moduleType={ModuleType.PAYMENT}
        noActions={true}
      />

      <PaymentForm mode="edit" paymentId={String(paymentId)} />
    </div>
  );
}
