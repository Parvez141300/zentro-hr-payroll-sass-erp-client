import { AppSidebar } from "@/components/shared/dashboardLayouts/app-sidebar";
import SidebarMobile from "@/components/shared/dashboardLayouts/SidebarMobile";
import Logo from "@/components/shared/logo/Logo";
import { ThemeToggle } from "@/components/shared/themeToggle/ThemeToggle";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getDashboardNavItemsByRole } from "@/lib/dashboardUtils";
import { authService } from "@/services/auth.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
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

            <div className="flex items-center gap-2 w-full justify-end md:justify-between">
              <h2 className="hidden md:block text-xl font-bold">
                Welcome Back, {userInfo!.data.name.toUpperCase()}
              </h2>
              <ThemeToggle />
              <SidebarMobile
                sidebarNavItems={sidebarNavItems}
                userInfo={userInfo!.data}
              />
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
