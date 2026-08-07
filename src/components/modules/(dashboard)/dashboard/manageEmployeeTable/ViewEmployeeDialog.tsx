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
  MailIcon,
  UserIcon,
  CreditCardIcon,
  LandmarkIcon,
  HeartIcon,
  UsersIcon,
  DollarSignIcon,
  CakeIcon,
  DropletIcon,
  ShieldIcon,
  FileTextIcon,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { IEmployee } from "@/types/employee.type";
import { EmployeeStatus, EmploymentType, Gender } from "@/types/enums.type";

interface IViewEmployeeDialogProps {
  employeeData: IEmployee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewEmployeeDialog = ({
  employeeData,
  open,
  onOpenChange,
}: IViewEmployeeDialogProps) => {
  const [imageError, setImageError] = useState(false);

  if (!employeeData) return null;

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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get gender label
  const getGenderLabel = (gender: Gender | null) => {
    if (!gender) return "N/A";
    const genderMap: Record<Gender, string> = {
      MALE: "Male",
      FEMALE: "Female",
      OTHER: "Other",
    };
    return genderMap[gender] || gender;
  };

  // Get employment type label
  const getEmploymentTypeLabel = (type: EmploymentType) => {
    const typeMap: Record<EmploymentType, string> = {
      FULL_TIME: "Full Time",
      PART_TIME: "Part Time",
      CONTRACT: "Contract",
      INTERN: "Intern",
    };
    return typeMap[type] || type;
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: EmployeeStatus) => {
    const variantMap: Record<
      EmployeeStatus,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      ACTIVE: "default",
      INACTIVE: "secondary",
      TERMINATED: "destructive",
      ON_LEAVE: "outline",
    };
    return variantMap[status] || "secondary";
  };

  // Get status label
  const getStatusLabel = (status: EmployeeStatus) => {
    return status
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Get employment type badge variant
  const getEmploymentTypeVariant = (type: EmploymentType) => {
    const variantMap: Record<
      EmploymentType,
      "default" | "secondary" | "outline" | "destructive"
    > = {
      FULL_TIME: "default",
      PART_TIME: "secondary",
      CONTRACT: "outline",
      INTERN: "outline",
    };
    return variantMap[type] || "secondary";
  };

  // Get the image URL (prefer photoUrl, fallback to user.image)
  const getImageUrl = () => {
    if (imageError) return undefined;
    return employeeData.photoUrl || employeeData.user?.image || undefined;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Profile Header */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={getImageUrl()}
                alt={employeeData.name}
                onError={() => setImageError(true)}
              />
              <AvatarFallback className="text-lg">
                {getInitials(employeeData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{employeeData.name}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {employeeData.employeeCode && (
                  <Badge variant="outline" className="text-xs">
                    {employeeData.employeeCode}
                  </Badge>
                )}
                <Badge
                  variant={getEmploymentTypeVariant(
                    employeeData.employmentType,
                  )}
                  className="text-xs"
                >
                  {getEmploymentTypeLabel(employeeData.employmentType)}
                </Badge>
                <Badge
                  variant={getStatusBadgeVariant(employeeData.status)}
                  className="text-xs"
                >
                  {getStatusLabel(employeeData.status)}
                </Badge>
              </div>
              {employeeData.user && (
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {employeeData.user.role}
                  </Badge>
                  {employeeData.user.emailVerified && (
                    <Badge variant="default" className="text-xs bg-green-500">
                      Verified
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Rest of the component remains the same... */}
          {/* Personal Information */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Personal Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Email */}
              {employeeData.user && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MailIcon className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                  <p className="text-sm font-medium break-all">
                    {employeeData.user.email}
                  </p>
                </div>
              )}

              {/* Phone */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <PhoneIcon className="h-4 w-4" />
                  <span>Phone</span>
                </div>
                <p className="text-sm font-medium">
                  {employeeData.phone || "N/A"}
                </p>
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UsersIcon className="h-4 w-4" />
                  <span>Gender</span>
                </div>
                <p className="text-sm font-medium">
                  {getGenderLabel(employeeData.gender)}
                </p>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CakeIcon className="h-4 w-4" />
                  <span>Date of Birth</span>
                </div>
                <p className="text-sm font-medium">
                  {formatDate(employeeData.dateOfBirth)}
                </p>
              </div>

              {/* Blood Group */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DropletIcon className="h-4 w-4" />
                  <span>Blood Group</span>
                </div>
                <p className="text-sm font-medium">
                  {employeeData.bloodGroup || "N/A"}
                </p>
              </div>

              {/* NID Number */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldIcon className="h-4 w-4" />
                  <span>NID Number</span>
                </div>
                <p className="text-sm font-medium">
                  {employeeData.nidNumber || "N/A"}
                </p>
              </div>

              {/* Address */}
              <div className="space-y-1 col-span-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinIcon className="h-4 w-4" />
                  <span>Address</span>
                </div>
                <p className="text-sm font-medium">
                  {employeeData.address || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div className="mb-4 pt-4 border-t">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4" />
              Employment Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Department */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BuildingIcon className="h-4 w-4" />
                  <span>Department</span>
                </div>
                <p className="text-sm font-medium">
                  {employeeData.department?.name || "Not Assigned"}
                </p>
                {employeeData.department?.description && (
                  <p className="text-xs text-muted-foreground">
                    {employeeData.department.description}
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
                  {employeeData.designation?.title || "Not Assigned"}
                </p>
                {employeeData.designation?.description && (
                  <p className="text-xs text-muted-foreground">
                    {employeeData.designation.description}
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
                  {formatDate(employeeData.joinDate)}
                </p>
              </div>

              {/* Employment Type */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileTextIcon className="h-4 w-4" />
                  <span>Employment Type</span>
                </div>
                <Badge
                  variant={getEmploymentTypeVariant(
                    employeeData.employmentType,
                  )}
                  className="text-xs"
                >
                  {getEmploymentTypeLabel(employeeData.employmentType)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Salary Information */}
          <div className="mb-4 pt-4 border-t">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <DollarSignIcon className="h-4 w-4" />
              Salary Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>Basic Salary</span>
                </div>
                <p className="text-sm font-medium">
                  {formatCurrency(employeeData.basicSalary)}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>House Allowance</span>
                </div>
                <p className="text-sm font-medium">
                  {formatCurrency(employeeData.houseAllowance)}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>Medical Allowance</span>
                </div>
                <p className="text-sm font-medium">
                  {formatCurrency(employeeData.medicalAllowance)}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>Transport Allowance</span>
                </div>
                <p className="text-sm font-medium">
                  {formatCurrency(employeeData.transportAllowance)}
                </p>
              </div>
              <div className="space-y-1 col-span-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>Total Allowance</span>
                </div>
                <p className="text-sm font-medium">
                  {formatCurrency(
                    employeeData.houseAllowance +
                      employeeData.medicalAllowance +
                      employeeData.transportAllowance,
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Bank Information */}
          {(employeeData.bankName || employeeData.bankAccount) && (
            <div className="mb-4 pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <LandmarkIcon className="h-4 w-4" />
                Bank Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <LandmarkIcon className="h-4 w-4" />
                    <span>Bank Name</span>
                  </div>
                  <p className="text-sm font-medium">
                    {employeeData.bankName || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCardIcon className="h-4 w-4" />
                    <span>Bank Account</span>
                  </div>
                  <p className="text-sm font-medium">
                    {employeeData.bankAccount || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Emergency Contact */}
          {(employeeData.emergencyName ||
            employeeData.emergencyPhone ||
            employeeData.emergencyRelation) && (
            <div className="mb-4 pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <HeartIcon className="h-4 w-4" />
                Emergency Contact
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UserIcon className="h-4 w-4" />
                    <span>Name</span>
                  </div>
                  <p className="text-sm font-medium">
                    {employeeData.emergencyName || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <PhoneIcon className="h-4 w-4" />
                    <span>Phone</span>
                  </div>
                  <p className="text-sm font-medium">
                    {employeeData.emergencyPhone || "N/A"}
                  </p>
                </div>
                <div className="space-y-1 col-span-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UsersIcon className="h-4 w-4" />
                    <span>Relation</span>
                  </div>
                  <p className="text-sm font-medium">
                    {employeeData.emergencyRelation || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Company Information */}
          {employeeData.company && (
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <BuildingIcon className="h-4 w-4" />
                Company Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Company Name</p>
                  <p className="text-sm font-medium">
                    {employeeData.company.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Company Email</p>
                  <p className="text-sm font-medium">
                    {employeeData.company.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Company Phone</p>
                  <p className="text-sm font-medium">
                    {employeeData.company.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Company Address
                  </p>
                  <p className="text-sm font-medium">
                    {employeeData.company.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Created & Updated */}
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Created At</span>
                </div>
                <p className="text-sm font-medium">
                  {formatDate(employeeData.createdAt)}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Updated At</span>
                </div>
                <p className="text-sm font-medium">
                  {formatDate(employeeData.updatedAt)}
                </p>
              </div>
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

export default ViewEmployeeDialog;
