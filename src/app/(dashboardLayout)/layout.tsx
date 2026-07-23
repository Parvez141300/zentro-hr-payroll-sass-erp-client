import { AppSidebar } from "@/components/modules/dashboard/app-sidebar";
import { NavMain } from "@/components/modules/dashboard/nav-main";
import { NavUser } from "@/components/modules/dashboard/nav-user";
import AppButton from "@/components/shared/form/AppButton";
import Logo from "@/components/shared/logo/Logo";
import { ThemeToggle } from "@/components/shared/themeToggle/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getDashboardNavItemsByRole } from "@/lib/dashboardUtils";
import { authService } from "@/services/auth.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Menu } from "lucide-react";
import React from "react";

const RootDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user-info"],
    queryFn: () => authService.getClientLoggedInUserInfo(),
  });
  const userInfo = await authService.getClientLoggedInUserInfo();
  const sidebarNavItems = getDashboardNavItemsByRole(userInfo.data.role);
  return (
    <div>
      {" "}
      <SidebarProvider>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AppSidebar />
        </HydrationBoundary>
        <SidebarInset>
          {/* for mobile sidebar */}
          <header className="p-4 flex items-center justify-between">
            <div className="md:hidden">
              <Logo />
            </div>

            <div className="flex items-center gap-2 w-full justify-end md:justify-end">
              <ThemeToggle />
              <Sheet>
                <SheetTrigger
                  render={
                    <AppButton varient="secondary" className="md:hidden">
                      <Menu className="w-5 h-5" />
                    </AppButton>
                  }
                />
                <SheetContent side="left">
                  <SidebarHeader>
                    <Logo />
                  </SidebarHeader>
                  <SidebarContent>
                    <NavMain items={sidebarNavItems} />
                  </SidebarContent>
                  <SidebarFooter>
                    <NavUser user={userInfo!.data} />
                  </SidebarFooter>
                </SheetContent>
              </Sheet>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default RootDashboardLayout;
