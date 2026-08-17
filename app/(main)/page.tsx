import PageHeader from '@/components/common/PageHeader';
import QuickAction from '@/components/common/QuickAction';
import StatCard from '@/components/common/StatCard';
import { ModuleType } from '@/types';
import {
  BookOpen,
  CreditCard,
  GraduationCap,
  UserPlus,
  Wallet,
} from 'lucide-react';

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
    <div className="flex w-full flex-col gap-2">
      <PageHeader />

      <div className="flex flex-wrap gap-4">
        {quickActions.map((action) => (
          <QuickAction key={action.href} {...action} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 justify-items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Tổng học sinh"
          value={128}
          icon={<GraduationCap className="h-5 w-5" />}
          trend={{
            value: '12%',
            positive: true,
          }}
          moduleType={ModuleType.STUDENT}
          description="Từ tháng trước"
        />

        <StatCard
          title="Tổng lớp học"
          value={8}
          icon={<BookOpen className="h-5 w-5" />}
          trend={{
            value: '2',
            positive: true,
          }}
          moduleType={ModuleType.CLASS}
          description="Lớp mới"
        />

        <StatCard
          title="Tổng doanh thu"
          value="32.5M"
          icon={<Wallet className="h-5 w-5" />}
          trend={{
            value: '8.5%',
            positive: true,
          }}
          moduleType={ModuleType.PAYMENT}
          description="Từ tháng trước"
        />
      </div>
    </div>
  );
};

export default MainPage;
