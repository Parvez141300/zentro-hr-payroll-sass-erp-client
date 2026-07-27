"use client";

import { getCompanyDetails } from "@/actions/company.action";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Globe,
  Users,
  Crown,
  Clock,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CompanyDetailsData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["companyDetails"],
    queryFn: () => getCompanyDetails(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-medium">
            Loading company details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="w-6 h-6" />
            <p className="font-medium">Failed to load company details</p>
          </div>
        </div>
      </div>
    );
  }

  const company = data?.data;

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-6 max-w-md">
          <p className="text-warning font-medium">
            No company details available
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSubscriptionBadgeColor = (status: string) => {
    const colors = {
      ACTIVE: "bg-success/10 text-success border-success/20",
      TRIAL: "bg-primary/10 text-primary border-primary/20",
      EXPIRED: "bg-destructive/10 text-destructive border-destructive/20",
      CANCELLED: "bg-muted text-muted-foreground border-border",
    };
    return colors[status as keyof typeof colors] || colors.TRIAL;
  };

  const getPlanBadgeColor = (plan: string) => {
    const colors = {
      FREE: "bg-muted text-muted-foreground border-border",
      BASIC: "bg-primary/10 text-primary border-primary/20",
      PREMIUM: "bg-secondary/10 text-secondary border-secondary/20",
      ENTERPRISE: "bg-warning/10 text-warning border-warning/20",
    };
    return colors[plan as keyof typeof colors] || colors.FREE;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Company Details
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and view your company information
            </p>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="mb-6 rounded-xl overflow-hidden bg-card border border-border shadow-sm">
        <div className="relative w-full h-48 md:h-64 lg:h-80 bg-linear-to-r from-primary/20 to-primary/5">
          {company.bannerUrl ? (
            <Image
              src={company.bannerUrl}
              alt={`${company.name} banner`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <ImageIcon className="w-12 h-12 opacity-50" />
                <p className="text-sm">No banner image</p>
              </div>
            </div>
          )}

          {/* Overlay with company logo and name */}
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-6">
            <div className="flex items-end gap-4">
              {/* Logo */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-card border-2 border-white/20 shadow-lg overflow-hidden shrink-0">
                {company.logoUrl ? (
                  <Image
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <Building2 className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Company: {company.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSubscriptionBadgeColor(company.subscriptionStatus)}`}
                  >
                    <Clock className="w-3 h-3" />
                    {company.subscriptionStatus}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPlanBadgeColor(company.subscriptionPlan)}`}
                  >
                    <Crown className="w-3 h-3" />
                    {company.subscriptionPlan}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Company Info - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Details Card */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Address
                  </p>
                  <p className="text-foreground">
                    {company.address || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-foreground">{company.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p className="text-foreground">
                    {company.phone || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Max Employees
                  </p>
                  <p className="text-foreground">{company.maxEmployees}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tax ID
                  </p>
                  <p className="text-foreground">
                    {company.taxId || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 overflow-auto">
                <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Website
                  </p>
                  <p className="text-foreground">
                    {company.websiteUrl ? (
                      <Link
                        href={company.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-wrap"
                      >
                        {company.websiteUrl.replace(/^https?:\/\//, "")}
                      </Link>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          {(company.facebookUrl ||
            company.twitterUrl ||
            company.linkedinUrl ||
            company.instagramUrl ||
            company.youtubeUrl) && (
            <div className="bg-card rounded-xl shadow-sm border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Social Links
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {company.facebookUrl && (
                  <Link
                    href={company.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors overflow-auto"
                  >
                    <span className="text-sm text-foreground">Facebook</span>
                  </Link>
                )}
                {company.twitterUrl && (
                  <Link
                    href={company.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors overflow-auto"
                  >
                    <span className="text-sm text-foreground">Twitter</span>
                  </Link>
                )}
                {company.linkedinUrl && (
                  <Link
                    href={company.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors overflow-auto"
                  >
                    <span className="text-sm text-foreground">LinkedIn</span>
                  </Link>
                )}
                {company.instagramUrl && (
                  <Link
                    href={company.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors overflow-auto"
                  >
                    <span className="text-sm text-foreground">Instagram</span>
                  </Link>
                )}
                {company.youtubeUrl && (
                  <Link
                    href={company.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors overflow-auto"
                  >
                    <span className="text-sm text-foreground">YouTube</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Additional Info */}
        <div className="space-y-6">
          {/* Fiscal Year */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Fiscal Year
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">
                  Start
                </span>
                <span className="text-sm text-foreground">
                  {company.fiscalYearStart
                    ? formatDate(company.fiscalYearStart)
                    : "Not set"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">
                  End
                </span>
                <span className="text-sm text-foreground">
                  {company.fiscalYearEnd
                    ? formatDate(company.fiscalYearEnd)
                    : "Not set"}
                </span>
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Subscription
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <span className="text-sm font-medium text-primary">Plan</span>
                <span className="text-sm font-bold text-primary">
                  {company.subscriptionPlan}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                <span className="text-sm font-medium text-secondary">
                  Status
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionBadgeColor(company.subscriptionStatus)}`}
                >
                  {company.subscriptionStatus === "ACTIVE" && (
                    <CheckCircle className="w-3 h-3" />
                  )}
                  {company.subscriptionStatus === "TRIAL" && (
                    <Clock className="w-3 h-3" />
                  )}
                  {company.subscriptionStatus}
                </span>
              </div>
              {company.subscriptionExpiry && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">
                    Expires
                  </span>
                  <span className="text-sm text-foreground">
                    {formatDate(company.subscriptionExpiry)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <span className="text-sm font-medium text-success">
                  Max Employees
                </span>
                <span className="text-sm font-bold text-success">
                  {company.maxEmployees}
                </span>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              System Info
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Created
                </p>
                <p className="text-sm text-foreground">
                  {formatDate(company.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Last Updated
                </p>
                <p className="text-sm text-foreground">
                  {formatDate(company.updatedAt)}
                </p>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  ID: <span className="font-mono">{company.id}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsData;
