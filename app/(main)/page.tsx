import PageHeader from '@/components/common/PageHeader';
import QuickAction from '@/components/common/QuickAction';
import { ModuleType } from '@/types';
import { BookOpen, CreditCard, UserPlus } from 'lucide-react';

const quickActions = [
  {
    href: '/dashboard/students',
    text: 'Thêm học sinh',
    icon: <UserPlus className="h-5 w-5" />,
    moduleType: ModuleType.STUDENT,
  },
  {
    href: '/dashboard/classes',
    text: 'Thêm lớp học',
    icon: <BookOpen className="h-5 w-5" />,
    moduleType: ModuleType.CLASS,
  },
  {
    href: '/dashboard/payments',
    text: 'Thêm thanh toán',
    icon: <CreditCard className="h-5 w-5" />,
    moduleType: ModuleType.PAYMENT,
  },
];

const MainPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader />

      <div className="flex flex-wrap gap-4">
        {quickActions.map((action) => (
          <QuickAction key={action.href} {...action} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
