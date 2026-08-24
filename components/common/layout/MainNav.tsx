'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { sidebarConfig } from '@/configs';
import { BrainCircuit } from 'lucide-react';

const MainNav = () => {
  const pathname = usePathname();

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex flex-row items-center gap-2 overflow-hidden">
          <Button size="icon-lg" aria-label="Submit">
            <BrainCircuit />
          </Button>
          <div className="flex flex-col">
            <h3 className="truncate text-sm font-bold">Quản lý lớp học</h3>
            <span className="text-muted-foreground truncate text-xs">
              GV Ngọc Trang
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {sidebarConfig.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          render={<Link href={item.href} />}
                          isActive={pathname === item.href}
                          tooltip={item.title}
                        >
                          <Icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <SidebarTrigger />
    </>
  );
};

export default MainNav;
