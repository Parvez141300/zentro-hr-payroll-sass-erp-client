"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  PhoneIcon,
  FileTextIcon,
  CreditCardIcon,
  LandmarkIcon,
  HashIcon,
  CheckCircleIcon,
  XCircleIcon,
  MailIcon,
} from "lucide-react";
import { format } from "date-fns";
import { IAccountant } from "@/types/accountant.type";
import { useState } from "react";

interface IViewAccountantDialogProps {
  accountantData: IAccountant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewAccountantDialog = ({
  accountantData,
  open,
  onOpenChange,
}: IViewAccountantDialogProps) => {
  const [imageError, setImageError] = useState(false);

  if (!accountantData) return null;

  console.log("accountant data", accountantData);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    return format(new Date(date), "PPP");
  };

  // Get image URL with error handling
  const getImageUrl = () => {
    if (imageError) return undefined;
    return accountantData.photoUrl || accountantData.user?.image || undefined;
  };

  // Get user status badge variant
  const getStatusBadgeVariant = (isActive: boolean) => {
    return isActive ? "default" : "secondary";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-138 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Accountant Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Profile Header */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={getImageUrl()}
                alt={accountantData.name}
                onError={() => setImageError(true)}
              />
              <AvatarFallback className="text-lg">
                {getInitials(accountantData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{accountantData.name}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {accountantData.employeeCode && (
                  <Badge variant="outline" className="text-xs">
                    {accountantData.employeeCode}
                  </Badge>
                )}
                {accountantData.user && (
                  <>
                    <Badge variant="outline" className="text-xs">
                      {accountantData.user.role}
                    </Badge>
                    <Badge
                      variant={getStatusBadgeVariant(
                        accountantData.user.isActive,
                      )}
                      className="text-xs"
                    >
                      {accountantData.user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </>
                )}
                <Badge
                  variant={
                    accountantData.fiscalYearAccess ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {accountantData.fiscalYearAccess
                    ? "Fiscal Year Access"
                    : "No Fiscal Access"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            {accountantData.user && (
              <div className="space-y-1 col-span-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MailIcon className="h-4 w-4" />
                  <span>Email</span>
                </div>
                <p className="text-sm font-medium break-all">
                  {accountantData.user.email}
                </p>
              </div>
            )}

            {/* CA License Number */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileTextIcon className="h-4 w-4" />
                <span>CA License</span>
              </div>
              <p className="text-sm font-medium">
                {accountantData.caLicenseNumber || "N/A"}
              </p>
            </div>

            {/* Tax ID Number */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <HashIcon className="h-4 w-4" />
                <span>Tax ID</span>
              </div>
              <p className="text-sm font-medium">
                {accountantData.taxIdNumber || "N/A"}
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="h-4 w-4" />
                <span>Phone</span>
              </div>
              <p className="text-sm font-medium">
                {accountantData.phone || "N/A"}
              </p>
            </div>

            {/* Join Date */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Join Date</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(accountantData.joinDate)}
              </p>
            </div>

            {/* Bank Name */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LandmarkIcon className="h-4 w-4" />
                <span>Bank Name</span>
              </div>
              <p className="text-sm font-medium">
                {accountantData.bankName || "N/A"}
              </p>
            </div>

            {/* Bank Account */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCardIcon className="h-4 w-4" />
                <span>Bank Account</span>
              </div>
              <p className="text-sm font-medium">
                {accountantData.bankAccount || "N/A"}
              </p>
            </div>

            {/* Fiscal Year Access (Full width) */}
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {accountantData.fiscalYearAccess ? (
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircleIcon className="h-4 w-4 text-red-500" />
                )}
                <span>Fiscal Year Access</span>
              </div>
              <p className="text-sm font-medium flex items-center gap-2">
                {accountantData.fiscalYearAccess ? (
                  <Badge variant="default" className="bg-green-500">
                    Enabled
                  </Badge>
                ) : (
                  <Badge variant="destructive">Disabled</Badge>
                )}
              </p>
            </div>

            {/* Email Verified */}
            {accountantData.user && (
              <div className="space-y-1 col-span-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MailIcon className="h-4 w-4" />
                  <span>Email Verified</span>
                </div>
                <Badge
                  variant={
                    accountantData.user.emailVerified ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {accountantData.user.emailVerified
                    ? "Verified"
                    : "Not Verified"}
                </Badge>
              </div>
            )}

            {/* Created At */}
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Created At</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(accountantData.createdAt)}
              </p>
            </div>

            {/* Updated At */}
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Updated At</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(accountantData.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={<Button variant="outline">Close</Button>}
          ></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAccountantDialog;
