'use client';
import { ModuleType } from '@/types';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useAppStore } from '@/stores';
import StudentDetailPanel from '@/app/(main)/students/StudentDetailPage';

export default function DetailPanel() {
  const { moduleType, isOpenDetail, itemId, closePanel } = useAppStore();

  const renderContent = () => {
    if (!moduleType || !itemId) {
      return null;
    }

    switch (moduleType) {
      case ModuleType.STUDENT:
        return <StudentDetailPanel itemId={itemId} />;

      case ModuleType.CLASS:
        return <div>Class ID: {itemId}</div>;

      case ModuleType.PAYMENT:
        return <div>Payment ID: {itemId}</div>;

      default:
        return null;
    }
  };

  return (
    <Sheet open={isOpenDetail} onOpenChange={(open) => !open && closePanel()}>
      <SheetContent side="right" className="w-full p-0 sm:max-w-xl">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle>
            {moduleType === ModuleType.STUDENT && 'Thông tin học sinh'}
            {moduleType === ModuleType.CLASS && 'Thông tin lớp học'}
            {moduleType === ModuleType.PAYMENT && 'Thông tin thanh toán'}
          </SheetTitle>
        </SheetHeader>

        <div className="h-[calc(100vh-73px)] overflow-y-auto px-5 py-4">
          {renderContent()}
        </div>
      </SheetContent>
    </Sheet>
  );
}
