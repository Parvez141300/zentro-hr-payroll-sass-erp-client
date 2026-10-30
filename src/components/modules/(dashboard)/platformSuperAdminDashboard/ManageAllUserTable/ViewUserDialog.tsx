"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Building2,
  Briefcase,
  Calendar,
  Hash,
  Phone,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";
import { IUser } from "@/types/user.type";

// ============================================
// PROPS
// ============================================
interface ViewUserDialogProps {
  userData: IUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ============================================
// HELPERS
// ============================================
const getRoleLabel = (role: string) => {
  const map: Record<string, string> = {
    PLATFORM_SUPER_ADMIN: "Platform Super Admin",
    SUPER_ADMIN: "Super Admin",
    HR_MANAGER: "HR Manager",
    ACCOUNTANT: "Accountant",
    DEPARTMENT_HEAD: "Department Head",
    EMPLOYEE: "Employee",
  };
  return map[role] || role;
};

const getRoleVariant = (
  role: string,
): "default" | "secondary" | "outline" | "destructive" => {
  const map: Record<
    string,
    "default" | "secondary" | "outline" | "destructive"
  > = {
    PLATFORM_SUPER_ADMIN: "destructive",
    SUPER_ADMIN: "default",
    HR_MANAGER: "default",
    ACCOUNTANT: "secondary",
    DEPARTMENT_HEAD: "secondary",
    EMPLOYEE: "outline",
  };
  return map[role] || "outline";
};

// ============================================
// MAIN COMPONENT
// ============================================
const ViewUserDialog = ({
  userData,
  open,
  onOpenChange,
}: ViewUserDialogProps) => {
  if (!userData) return null;

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Safe date formatter
  const formatDate = (d: string | Date | null | undefined) => {
    if (!d) return "N/A";
    return format(new Date(d), "PPP 'at' hh:mm a");
  };

  // ✅ Extract role-specific profile (only one will be populated)
  const roleProfile =
    userData.platformSuperAdmin ||
    userData.superAdmin ||
    userData.hrManager ||
    userData.accountant ||
    userData.departmentHead ||
    userData.employee ||
    null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Full account information and role assignment
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* ============================================ */}
          {/* HEADER */}
          {/* ============================================ */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={userData.image || undefined}
                alt={userData.name}
              />
              <AvatarFallback className="text-xl">
                {getInitials(userData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{userData.name}</h3>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge
                  variant={getRoleVariant(userData.role)}
                  className="text-xs"
                >
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  {getRoleLabel(userData.role)}
                </Badge>

                {userData.emailVerified ? (
                  <Badge
                    variant="default"
                    className="bg-emerald-500 hover:bg-emerald-600 text-xs"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    <Mail className="h-3 w-3 mr-1" />
                    Unverified
                  </Badge>
                )}

                {userData.isActive ? (
                  <Badge
                    variant="default"
                    className="bg-emerald-500 hover:bg-emerald-600 text-xs"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-xs">
                    <XCircle className="h-3 w-3 mr-1" />
                    Inactive
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* ============================================ */}
          {/* ACCOUNT INFORMATION */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-primary" />
              Account Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Hash className="h-3.5 w-3.5" />
                  <span>User ID</span>
                </div>
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {userData.id}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email</span>
                </div>
                <p className="text-sm font-medium break-all">
                  {userData.email}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Created At</span>
                </div>
                <p className="text-sm font-medium">
                  {formatDate(userData.createdAt)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Last Updated</span>
                </div>
                <p className="text-sm font-medium">
                  {formatDate(userData.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* ============================================ */}
          {/* COMPANY ID */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Company
            </h4>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Company ID</span>
              <p className="text-sm font-mono text-muted-foreground break-all">
                {userData.companyId}
              </p>
            </div>
          </div>

          {/* ============================================ */}
          {/* ROLE-SPECIFIC PROFILE */}
          {/* ============================================ */}
          {roleProfile && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  {getRoleLabel(userData.role)} Profile
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Employee Code */}
                  {"employeeCode" in roleProfile &&
                    roleProfile.employeeCode && (
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">
                          Employee Code
                        </span>
                        <p className="text-sm font-medium">
                          {roleProfile.employeeCode}
                        </p>
                      </div>
                    )}

                  {/* Phone */}
                  {"phone" in roleProfile && roleProfile.phone && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        <span>Phone</span>
                      </div>
                      <p className="text-sm font-medium">{roleProfile.phone}</p>
                    </div>
                  )}

                  {/* Join Date */}
                  {"joinDate" in roleProfile && roleProfile.joinDate && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Join Date</span>
                      </div>
                      <p className="text-sm font-medium">
                        {formatDate(roleProfile.joinDate)}
                      </p>
                    </div>
                  )}

                  {/* Address */}
                  {"address" in roleProfile && roleProfile.address && (
                    <div className="space-y-1 md:col-span-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Address</span>
                      </div>
                      <p className="text-sm font-medium">
                        {roleProfile.address}
                      </p>
                    </div>
                  )}

                  {/* HR Manager Scope */}
                  {"scope" in roleProfile && roleProfile.scope && (
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">
                        HR Scope
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {roleProfile.scope}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserDialog;
