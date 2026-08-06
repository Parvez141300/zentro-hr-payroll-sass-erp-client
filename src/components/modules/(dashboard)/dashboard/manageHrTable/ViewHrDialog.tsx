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
  FileTextIcon,
} from "lucide-react";
import { format } from "date-fns";
import { IHrManager } from "@/types/hrManager.type";

interface IViewHrDialogProps {
  hrData: IHrManager | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewHrDialog = ({ hrData, open, onOpenChange }: IViewHrDialogProps) => {
  if (!hrData) return null;

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

  // Get scope badge color
  const getScopeBadgeVariant = (scope: string) => {
    switch (scope) {
      case "COMPANY_WIDE":
        return "default";
      case "DEPARTMENT_WIDE":
        return "secondary";
      case "TEAM_WIDE":
        return "outline";
      default:
        return "default";
    }
  };

  // Format scope for display
  const formatScope = (scope: string) => {
    return scope
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-138">
        <DialogHeader>
          <DialogTitle>HR Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Profile Header */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={hrData.photoUrl || undefined}
                alt={hrData.name}
              />
              <AvatarFallback className="text-lg">
                {getInitials(hrData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{hrData.name}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {hrData.employeeCode}
                </Badge>
                <Badge
                  variant={getScopeBadgeVariant(hrData.scope)}
                  className="text-xs"
                >
                  {formatScope(hrData.scope)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* HR License Number */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileTextIcon className="h-4 w-4" />
                <span>HR License</span>
              </div>
              <p className="text-sm font-medium">{hrData.hrLicenseNumber}</p>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="h-4 w-4" />
                <span>Phone</span>
              </div>
              <p className="text-sm font-medium">{hrData.phone}</p>
            </div>

            {/* Office Phone */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BuildingIcon className="h-4 w-4" />
                <span>Office Phone</span>
              </div>
              <p className="text-sm font-medium">
                {hrData.officePhone || "N/A"}
              </p>
            </div>

            {/* Join Date */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Join Date</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(hrData.joinDate)}
              </p>
            </div>

            {/* Department */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BuildingIcon className="h-4 w-4" />
                <span>Department</span>
              </div>
              <p className="text-sm font-medium">
                {hrData.departmentId || "Not Assigned"}
              </p>
            </div>

            {/* Designation */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BriefcaseIcon className="h-4 w-4" />
                <span>Designation</span>
              </div>
              <p className="text-sm font-medium">
                {hrData.designationId || "Not Assigned"}
              </p>
            </div>

            {/* Created At */}
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Created At</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(hrData.createdAt)}
              </p>
            </div>
          </div>

          {/* Bio */}
          {hrData.bio && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Bio</h4>
              <p className="text-sm text-muted-foreground">{hrData.bio}</p>
            </div>
          )}
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

export default ViewHrDialog;
