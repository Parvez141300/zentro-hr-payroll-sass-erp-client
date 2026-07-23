/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { logoutUser } from "@/actions/auth.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import AppButton from "../form/AppButton";
import { ISessionUser } from "@/types/auth.type";
import Link from "next/link";

const DropdownNavMenu = ({
  sessionUser,
  setSession,
}: {
  sessionUser: ISessionUser;
  setSession: any;
}) => {
  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      const logout = await logoutUser();
      if (logout.success) {
        toast.success("Logout successful", { id: toastId });
        setSession(null);
      }
      console.log(logout);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed", {
        id: toastId,
      });

      console.log(
        "this error is from logout error: ",
        error instanceof Error && error.message,
      );
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage
                src={
                  sessionUser.image
                    ? sessionUser.image
                    : "https://github.com/shadcn.png"
                }
                alt="shadcn"
              />
              <AvatarFallback>
                {sessionUser.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/change-password">Change Password</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Dashboard</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <AppButton
            varient="ghost"
            className={"cursor-pointer"}
            onClick={() => handleLogout()}
          >
            <LogOutIcon />
            Log out
          </AppButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNavMenu;
