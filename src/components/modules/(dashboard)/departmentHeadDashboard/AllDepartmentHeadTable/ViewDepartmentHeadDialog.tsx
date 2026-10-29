"use client";

import React, { useState } from "react";
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
  UserIcon,
  MailIcon,
  PhoneIcon,
  BuildingIcon,
  BriefcaseIcon,
  ShieldIcon,
  CheckCircle2Icon,
  XCircleIcon,
  GlobeIcon,
  LinkIcon,
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { format } from "date-fns";

// ✅ Import the actual type from your types file
import { IDepartmentHead } from "@/types/departmentHead.type";

interface ViewDepartmentHeadDialogProps {
  headData: IDepartmentHead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewDepartmentHeadDialog = ({
  headData,
  open,
  onOpenChange,
}: ViewDepartmentHeadDialogProps) => {
  const [imageError, setImageError] = useState(false);

  if (!headData) return null;

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
  const formatDate = (d: string | null | undefined) =>
    d ? format(new Date(d), "PPP") : "N/A";

  // Get image URL
  const getImageUrl = () => {
    if (imageError) return undefined;
    return headData.photoUrl || headData.user?.image || undefined;
  };

  // Check if any social link exists
  const hasSocialLinks =
    headData.company?.facebookUrl ||
    headData.company?.instagramUrl ||
    headData.company?.linkedinUrl ||
    headData.company?.youtubeUrl ||
    headData.company?.twitterUrl;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Department Head Details</DialogTitle>
          <DialogDescription>
            Full profile and organizational information
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* PROFILE HEADER */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={getImageUrl()}
                alt={headData.name}
                onError={() => setImageError(true)}
              />
              <AvatarFallback className="text-xl">
                {getInitials(headData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{headData.name}</h3>
              <p className="text-sm text-muted-foreground">
                {headData.designation?.title || "Designation not assigned"}
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {headData.employeeCode && (
                  <Badge variant="outline" className="text-xs">
                    {headData.employeeCode}
                  </Badge>
                )}
                {headData.department?.name && (
                  <Badge variant="secondary" className="text-xs">
                    <BuildingIcon className="h-3 w-3 mr-1" />
                    {headData.department.name}
                  </Badge>
                )}
                {headData.user?.role && (
                  <Badge variant="default" className="text-xs">
                    <ShieldIcon className="h-3 w-3 mr-1" />
                    {headData.user.role.replace(/_/g, " ")}
                  </Badge>
                )}
                {headData.user?.isActive ? (
                  <Badge
                    variant="default"
                    className="text-xs bg-emerald-500 hover:bg-emerald-600"
                  >
                    <CheckCircle2Icon className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-xs">
                    <XCircleIcon className="h-3 w-3 mr-1" />
                    Inactive
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* PERSONAL INFORMATION */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-primary" />
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MailIcon className="h-3.5 w-3.5" />
                  <span>Email</span>
                </div>
                <p className="text-sm font-medium break-all">
                  {headData.user?.email || "N/A"}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <PhoneIcon className="h-3.5 w-3.5" />
                  <span>Phone</span>
                </div>
                <p className="text-sm font-medium">{headData.phone || "N/A"}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>Join Date</span>
                </div>
                <p className="text-sm font-medium">
                  {formatDate(headData.joinDate)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  <span>Office Location</span>
                </div>
                <p className="text-sm font-medium">
                  {headData.officeLocation || "N/A"}
                </p>
              </div>

              {headData.bio && (
                <div className="space-y-1 md:col-span-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <UserIcon className="h-3.5 w-3.5" />
                    <span>Bio</span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground bg-muted/50 p-3 rounded-md">
                    {headData.bio}
                  </p>
                </div>
              )}

              {headData.linkedinUrl && (
                <div className="space-y-1 md:col-span-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FaLinkedin className="h-3.5 w-3.5 text-[#0A66C2]" />
                    <span>LinkedIn</span>
                  </div>
                  <a
                    href={headData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline break-all"
                  >
                    {headData.linkedinUrl}
                  </a>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* ORGANIZATION INFO */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4 text-primary" />
              Organization Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BuildingIcon className="h-3.5 w-3.5" />
                  <span>Company</span>
                </div>
                <p className="text-sm font-medium">
                  {headData.company?.name || "N/A"}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <UsersIcon className="h-3.5 w-3.5" />
                  <span>Department</span>
                </div>
                <p className="text-sm font-medium">
                  {headData.department?.name || "N/A"}
                </p>
                {headData.department?.description && (
                  <p className="text-xs text-muted-foreground">
                    {headData.department.description}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BriefcaseIcon className="h-3.5 w-3.5" />
                  <span>Designation</span>
                </div>
                <p className="text-sm font-medium">
                  {headData.designation?.title || "N/A"}
                </p>
                {headData.designation?.description && (
                  <p className="text-xs text-muted-foreground">
                    {headData.designation.description}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldIcon className="h-3.5 w-3.5" />
                  <span>User ID</span>
                </div>
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {headData.userId}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* COMPANY DETAILS */}
          {headData.company && (
            <>
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <BuildingIcon className="h-4 w-4 text-primary" />
                  Company Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">
                      Company Email
                    </span>
                    <p className="text-sm font-medium break-all">
                      {headData.company.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">
                      Company Phone
                    </span>
                    <p className="text-sm font-medium">
                      {headData.company.phone}
                    </p>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <span className="text-xs text-muted-foreground">
                      Company Address
                    </span>
                    <p className="text-sm font-medium">
                      {headData.company.address}
                    </p>
                  </div>

                  {headData.company.websiteUrl && (
                    <div className="space-y-1 md:col-span-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <GlobeIcon className="h-3.5 w-3.5" />
                        <span>Website</span>
                      </div>
                      <a
                        href={headData.company.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline break-all"
                      >
                        {headData.company.websiteUrl}
                      </a>
                    </div>
                  )}

                  {hasSocialLinks && (
                    <div className="space-y-2 md:col-span-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <LinkIcon className="h-3.5 w-3.5" />
                        <span>Social Links</span>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {headData.company.facebookUrl && (
                          <a
                            href={headData.company.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            <FaFacebook className="h-3.5 w-3.5 text-[#1877F2]" />
                            Facebook
                          </a>
                        )}
                        {headData.company.instagramUrl && (
                          <a
                            href={headData.company.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            <FaInstagram className="h-3.5 w-3.5 text-[#E4405F]" />
                            Instagram
                          </a>
                        )}
                        {headData.company.linkedinUrl && (
                          <a
                            href={headData.company.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            <FaLinkedin className="h-3.5 w-3.5 text-[#0A66C2]" />
                            LinkedIn
                          </a>
                        )}
                        {headData.company.youtubeUrl && (
                          <a
                            href={headData.company.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            <FaYoutube className="h-3.5 w-3.5 text-[#FF0000]" />
                            YouTube
                          </a>
                        )}
                        {headData.company.twitterUrl && (
                          <a
                            href={headData.company.twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            <FaTwitter className="h-3.5 w-3.5 text-[#1DA1F2]" />
                            Twitter
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">
                      Subscription Plan
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {headData.company.subscriptionPlan}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">
                      Subscription Status
                    </span>
                    <Badge
                      variant={
                        headData.company.subscriptionStatus === "ACTIVE"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {headData.company.subscriptionStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />
            </>
          )}

          {/* RECORD INFORMATION */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              Record Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Record ID</span>
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {headData.id}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Company ID
                </span>
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {headData.companyId}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Created At
                </span>
                <p className="text-sm font-medium">
                  {formatDate(headData.createdAt)}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Last Updated
                </span>
                <p className="text-sm font-medium">
                  {formatDate(headData.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDepartmentHeadDialog;
