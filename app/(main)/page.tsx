import RevenueChart from '@/components/common/dashboard/RevenueChart';
import StudentsByClassChart from '@/components/common/dashboard/StudentsByClassChart';
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

const revenueData = [
  { month: 'Tháng 1', revenue: 18500000 },
  { month: 'Tháng 2', revenue: 22000000 },
  { month: 'Tháng 3', revenue: 19800000 },
  { month: 'Tháng 4', revenue: 26500000 },
  { month: 'Tháng 5', revenue: 28900000 },
  { month: 'Tháng 6', revenue: 31500000 },
  { month: 'Tháng 7', revenue: 30200000 },
  { month: 'Tháng 8', revenue: 34800000 },
  { month: 'Tháng 9', revenue: 34800000 },
  { month: 'Tháng 10', revenue: 34800000 },
  { month: 'Tháng 11', revenue: 34800000 },
  { month: 'Tháng 12', revenue: 34800000 },
];

const studentsByClassData = [
  { className: '10A1', students: 28 },
  { className: '10A2', students: 24 },
  { className: '11A1', students: 22 },
  { className: '11A2', students: 26 },
  { className: '12A1', students: 30 },
  { className: '12A2', students: 25 },
];

const MainPage = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <PageHeader
        title="Thống kê"
        subTitle="Chào mừng bạn trở lại, hãy xem số liệu ngày hôm nay!"
        moduleType={ModuleType.DASHBOARD}
      />

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

      <RevenueChart data={revenueData} />
      <StudentsByClassChart data={studentsByClassData} />
    </div>
  );
};

export default MainPage;
