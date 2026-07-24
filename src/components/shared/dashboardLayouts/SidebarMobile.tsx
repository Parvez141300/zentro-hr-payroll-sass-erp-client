import AppButton from "@/components/shared/form/AppButton";
import Logo from "@/components/shared/logo/Logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import React from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { IDashboardSidebarNavSection } from "@/types/dashboard.type";
import { ISessionUser } from "@/types/auth.type";

const SidebarMobile = ({ sidebarNavItems, userInfo } : { sidebarNavItems: IDashboardSidebarNavSection[], userInfo: ISessionUser}) => {
  return (
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
          <NavUser user={userInfo} />
        </SidebarFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
