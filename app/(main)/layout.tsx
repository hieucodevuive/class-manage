import { CBreadCrumb } from '@/components/common/layout/CBreadCrumb';
import Header from '@/components/common/layout/Header';
import MainNav from '@/components/common/layout/MainNav';
import { SidebarProvider } from '@/components/ui/sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-full w-auto">
      <SidebarProvider>
        <MainNav />
        <div className="w-full">
          <Header />
          <CBreadCrumb />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
