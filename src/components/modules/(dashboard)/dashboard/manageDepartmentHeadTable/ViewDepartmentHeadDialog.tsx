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
  BuildingIcon,
  BriefcaseIcon,
  MapPinIcon,
  LinkIcon,
  MailIcon,
  Building2Icon,
} from "lucide-react";
import { format } from "date-fns";
import { IDepartmentHead } from "@/types/departmentHead.type";

// interface IDepartmentHead {
//   id: string;
//   name: string;
//   phone: string | null;
//   photoUrl: string | null;
//   employeeCode: string | null;
//   joinDate: string | null;
//   officeLocation: string | null;
//   linkedinUrl: string | null;
//   bio: string | null;
//   createdAt: string;
//   updatedAt: string;
//   userId: string;
//   departmentId: string;
//   designationId: string;
//   companyId: string;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
//     isActive: boolean;
//     isDeleted: boolean;
//     deletedAt: string | null;
//     emailVerified: boolean;
//     image: string | null;
//     createdAt: string;
//     updatedAt: string;
//     companyId: string;
//   };
//   department: {
//     id: string;
//     name: string;
//     description: string;
//     isDeleted: boolean;
//     deletedAt: string | null;
//     createdAt: string;
//     updatedAt: string;
//     companyId: string;
//   };
//   designation: {
//     id: string;
//     title: string;
//     description: string;
//     departmentId: string;
//     isDeleted: boolean;
//     deletedAt: string | null;
//     createdAt: string;
//     updatedAt: string;
//     companyId: string;
//   };
//   company: {
//     id: string;
//     name: string;
//     logoUrl: string;
//     bannerUrl: string;
//     address: string;
//     email: string;
//     phone: string;
//     taxId: string | null;
//     websiteUrl: string;
//     facebookUrl: string;
//     twitterUrl: string;
//     linkedinUrl: string;
//     instagramUrl: string;
//     youtubeUrl: string;
//     fiscalYearStart: string | null;
//     fiscalYearEnd: string | null;
//     subscriptionPlan: string;
//     subscriptionStatus: string;
//     subscriptionExpiry: string | null;
//     maxEmployees: number;
//     stripeCustomerId: string | null;
//     stripeSubscriptionId: string | null;
//     sslCommerzStoreId: string | null;
//     sslCommerzCustomerId: string | null;
//     sslCommerzToken: string | null;
//     isDeleted: boolean;
//     deletedAt: string | null;
//     createdAt: string;
//     updatedAt: string;
//   };
// }

interface IViewDepartmentHeadDialogProps {
  departmentHeadData: IDepartmentHead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewDepartmentHeadDialog = ({
  departmentHeadData,
  open,
  onOpenChange,
}: IViewDepartmentHeadDialogProps) => {
  if (!departmentHeadData) return null;

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
  const formatDate = (date: string | null) => {
    if (!date) return "N/A";
    return format(new Date(date), "PPP");
  };

  // Get user status badge
  const getStatusBadgeVariant = (isActive: boolean) => {
    return isActive ? "default" : "secondary";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Department Head Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Profile Header */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={
                  departmentHeadData.photoUrl ||
                  departmentHeadData!.user!.image ||
                  undefined
                }
                alt={departmentHeadData.name}
              />
              <AvatarFallback className="text-lg">
                {getInitials(departmentHeadData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                {departmentHeadData.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {departmentHeadData.employeeCode && (
                  <Badge variant="outline" className="text-xs">
                    {departmentHeadData.employeeCode}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {departmentHeadData!.user!.role}
                </Badge>
                <Badge
                  variant={getStatusBadgeVariant(
                    departmentHeadData!.user!.isActive,
                  )}
                  className="text-xs"
                >
                  {departmentHeadData!.user!.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MailIcon className="h-4 w-4" />
                <span>Email</span>
              </div>
              <p className="text-sm font-medium break-all">
                {departmentHeadData!.user!.email}
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="h-4 w-4" />
                <span>Phone</span>
              </div>
              <p className="text-sm font-medium">
                {departmentHeadData.phone ||
                  departmentHeadData!.company!.phone ||
                  "N/A"}
              </p>
            </div>

            {/* Department */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BuildingIcon className="h-4 w-4" />
                <span>Department</span>
              </div>
              <p className="text-sm font-medium">
                {departmentHeadData.department?.name || "Not Assigned"}
              </p>
              {departmentHeadData.department?.description && (
                <p className="text-xs text-muted-foreground">
                  {departmentHeadData.department.description}
                </p>
              )}
            </div>

            {/* Designation */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BriefcaseIcon className="h-4 w-4" />
                <span>Designation</span>
              </div>
              <p className="text-sm font-medium">
                {departmentHeadData.designation?.title || "Not Assigned"}
              </p>
              {departmentHeadData.designation?.description && (
                <p className="text-xs text-muted-foreground">
                  {departmentHeadData.designation.description}
                </p>
              )}
            </div>

            {/* Join Date */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Join Date</span>
              </div>
              <p className="text-sm font-medium">
                {departmentHeadData.joinDate
                  ? formatDate(departmentHeadData!.joinDate)
                  : "N/A"}
              </p>
            </div>

            {/* Office Location */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="h-4 w-4" />
                <span>Office Location</span>
              </div>
              <p className="text-sm font-medium">
                {departmentHeadData.officeLocation ||
                  departmentHeadData!.company!.address ||
                  "N/A"}
              </p>
            </div>

            {/* LinkedIn */}
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LinkIcon className="h-4 w-4" />
                <span>LinkedIn</span>
              </div>
              {departmentHeadData.linkedinUrl ? (
                <a
                  href={departmentHeadData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline break-all"
                >
                  {departmentHeadData.linkedinUrl}
                </a>
              ) : (
                <p className="text-sm font-medium">N/A</p>
              )}
            </div>

            {/* Email Verified */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MailIcon className="h-4 w-4" />
                <span>Email Verified</span>
              </div>
              <Badge
                variant={
                  departmentHeadData!.user!.emailVerified
                    ? "default"
                    : "secondary"
                }
                className="text-xs"
              >
                {departmentHeadData!.user!.emailVerified
                  ? "Verified"
                  : "Not Verified"}
              </Badge>
            </div>

            {/* Created At */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Created At</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(departmentHeadData.createdAt)}
              </p>
            </div>
          </div>

          {/* Bio */}
          {departmentHeadData.bio && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Bio</h4>
              <p className="text-sm text-muted-foreground">
                {departmentHeadData.bio}
              </p>
            </div>
          )}

          {/* Company Information */}
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Building2Icon className="h-4 w-4" />
              Company Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Company Name</p>
                <p className="text-sm font-medium">
                  {departmentHeadData!.company!.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Company Email</p>
                <p className="text-sm font-medium">
                  {departmentHeadData!.company!.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Company Phone</p>
                <p className="text-sm font-medium">
                  {departmentHeadData!.company!.phone}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Company Address</p>
                <p className="text-sm font-medium">
                  {departmentHeadData!.company!.address || "N/A"}
                </p>
              </div>
              {departmentHeadData!.company!.websiteUrl && (
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Website</p>
                  <a
                    href={departmentHeadData!.company!.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline break-all"
                  >
                    {departmentHeadData!.company!.websiteUrl}
                  </a>
                </div>
              )}
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

export default ViewDepartmentHeadDialog;
