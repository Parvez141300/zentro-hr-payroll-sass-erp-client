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
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const DropdownNavMenu = ({ sessionUser }: { sessionUser: ISessionUser }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      const logout = await logoutUser();

      if (logout.success) {
        // clear cashed data
        queryClient.removeQueries({ queryKey: ["user-info"] });
        queryClient.clear();

        toast.success("Logout successful", { id: toastId });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Logout failed", {
        id: toastId,
      });
      console.log("logout error: ", error instanceof Error && error.message);
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
                alt="user"
              />
              <AvatarFallback>
                {sessionUser.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{sessionUser.name}</DropdownMenuLabel>

          {/* ✅ Base UI: use render prop, not asChild */}
          <DropdownMenuItem render={<Link href="/profile" />}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/change-password" />}>
            Change Password
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/dashboard" />}>
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <AppButton
            varient="ghost" // ✅ fixed: "variant" → "varient" (matches your AppButton prop name)
            className="cursor-pointer w-full justify-start"
            onClick={handleLogout}
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Log out
          </AppButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNavMenu;
