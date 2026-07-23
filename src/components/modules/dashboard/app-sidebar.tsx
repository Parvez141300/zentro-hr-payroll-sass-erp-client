"use client";

import * as React from "react";

import { NavMain } from "@/components/modules/dashboard/nav-main";
import { NavUser } from "@/components/modules/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Logo from "@/components/shared/logo/Logo";
import { useQuery } from "@tanstack/react-query";
import { getClientLoggedInUserInfo } from "@/actions/auth.action";
import { getDashboardNavItemsByRole } from "@/lib/dashboardUtils";

export function AppSidebar() {
  const { data: userInfo } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getClientLoggedInUserInfo(),
  });

  console.log("userInfo", userInfo);
  const sidebarNavItems = getDashboardNavItemsByRole(userInfo!.data.role);
  console.log("sidebarNavItems", sidebarNavItems);

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo!.data} />
      </SidebarFooter>
    </Sidebar>
  );
}
