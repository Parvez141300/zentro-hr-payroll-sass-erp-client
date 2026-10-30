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
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Users,
  CreditCard,
  CheckCircle2,
  XCircle,
  Crown,
  Hash,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { ICompany } from "@/types/company.type";

// ============================================
// PROPS
// ============================================
interface ViewCompanyDialogProps {
  companyData: ICompany | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ============================================
// MAIN COMPONENT
// ============================================
const ViewCompanyDialog = ({
  companyData,
  open,
  onOpenChange,
}: ViewCompanyDialogProps) => {
  if (!companyData) return null;

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

  // Check if any social link exists
  const hasSocialLinks =
    companyData.facebookUrl ||
    companyData.instagramUrl ||
    companyData.linkedinUrl ||
    companyData.youtubeUrl ||
    companyData.twitterUrl;

  // Subscription status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Badge
            variant="default"
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "TRIAL":
        return (
          <Badge variant="secondary">
            <Crown className="h-3 w-3 mr-1" />
            Trial
          </Badge>
        );
      case "EXPIRED":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status || "N/A"}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Company Details</DialogTitle>
          <DialogDescription>
            Full company profile and subscription information
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* ============================================ */}
          {/* HEADER */}
          {/* ============================================ */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={companyData.logoUrl || undefined}
                alt={companyData.name}
              />
              <AvatarFallback className="text-xl">
                {getInitials(companyData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{companyData.name}</h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="outline" className="font-mono text-xs">
                  {companyData.subscriptionPlan}
                </Badge>
                {getStatusBadge(companyData.subscriptionStatus)}
              </div>
            </div>
          </div>

          <Separator />

          {/* ============================================ */}
          {/* CONTACT INFORMATION */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email</span>
                </div>
                <p className="text-sm font-medium break-all">
                  {companyData.email || "N/A"}
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  <span>Phone</span>
                </div>
                <p className="text-sm font-medium">
                  {companyData.phone || "N/A"}
                </p>
              </div>

              {/* Address */}
              <div className="space-y-1 md:col-span-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Address</span>
                </div>
                <p className="text-sm font-medium">
                  {companyData.address || "N/A"}
                </p>
              </div>

              {/* Tax ID */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Hash className="h-3.5 w-3.5" />
                  <span>Tax ID</span>
                </div>
                <p className="text-sm font-medium">
                  {companyData.taxId || "N/A"}
                </p>
              </div>

              {/* Website */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="h-3.5 w-3.5" />
                  <span>Website</span>
                </div>
                {companyData.websiteUrl ? (
                  <a
                    href={companyData.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline break-all"
                  >
                    {companyData.websiteUrl.replace(/^https?:\/\//, "")}
                  </a>
                ) : (
                  <p className="text-sm font-medium">N/A</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* ============================================ */}
          {/* SOCIAL LINKS */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Social Links
            </h4>
            {hasSocialLinks ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {companyData.facebookUrl && (
                  <a
                    href={companyData.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Facebook
                  </a>
                )}
                {companyData.instagramUrl && (
                  <a
                    href={companyData.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Instagram
                  </a>
                )}
                {companyData.linkedinUrl && (
                  <a
                    href={companyData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
                {companyData.youtubeUrl && (
                  <a
                    href={companyData.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    YouTube
                  </a>
                )}
                {companyData.twitterUrl && (
                  <a
                    href={companyData.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Twitter
                  </a>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No social links configured
              </p>
            )}
          </div>

          <Separator />

          {/* ============================================ */}
          {/* SUBSCRIPTION */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Crown className="h-4 w-4 text-primary" />
              Subscription
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Plan</span>
                <p className="text-sm font-medium">
                  {companyData.subscriptionPlan || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Status</span>
                <div>{getStatusBadge(companyData.subscriptionStatus)}</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>Max Employees</span>
                </div>
                <p className="text-sm font-medium">
                  {companyData.maxEmployees >= 999999
                    ? "Unlimited"
                    : companyData.maxEmployees?.toLocaleString() || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Expiry</span>
                </div>
                <p className="text-sm font-medium">
                  {companyData.subscriptionExpiry
                    ? format(new Date(companyData.subscriptionExpiry), "PPP")
                    : "No expiry"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* ============================================ */}
          {/* PAYMENT METHOD */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Payment Method
            </h4>
            {companyData.stripeCustomerId ? (
              <div className="p-3 rounded-lg border bg-primary/5">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Stripe</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  Customer: {companyData.stripeCustomerId}
                </p>
                {companyData.stripeSubscriptionId && (
                  <p className="text-xs text-muted-foreground font-mono">
                    Subscription: {companyData.stripeSubscriptionId}
                  </p>
                )}
              </div>
            ) : companyData.sslCommerzCustomerId ? (
              <div className="p-3 rounded-lg border bg-emerald-500/5">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">SSLCommerz</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  Customer: {companyData.sslCommerzCustomerId}
                </p>
                {companyData.sslCommerzStoreId && (
                  <p className="text-xs text-muted-foreground font-mono">
                    Store: {companyData.sslCommerzStoreId}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No payment method configured
              </p>
            )}
          </div>

          <Separator />

          {/* ============================================ */}
          {/* FISCAL YEAR */}
          {/* ============================================ */}
          {(companyData.fiscalYearStart || companyData.fiscalYearEnd) && (
            <>
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Fiscal Year
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Start</span>
                    <p className="text-sm font-medium">
                      {companyData.fiscalYearStart
                        ? format(new Date(companyData.fiscalYearStart), "PPP")
                        : "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">End</span>
                    <p className="text-sm font-medium">
                      {companyData.fiscalYearEnd
                        ? format(new Date(companyData.fiscalYearEnd), "PPP")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* ============================================ */}
          {/* RECORD INFO */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Record Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Company ID
                </span>
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {companyData.id}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Created At
                </span>
                <p className="text-sm font-medium">
                  {formatDate(companyData.createdAt)}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Last Updated
                </span>
                <p className="text-sm font-medium">
                  {formatDate(companyData.updatedAt)}
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

export default ViewCompanyDialog;
