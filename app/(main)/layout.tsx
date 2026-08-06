import MainNav from '@/components/common/layout/MainNav';
import { SidebarProvider } from '@/components/ui/sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-full w-auto">
      <SidebarProvider>
        <MainNav />
        {children}
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
