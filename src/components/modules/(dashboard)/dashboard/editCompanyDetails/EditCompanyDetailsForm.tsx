"use client";

import {
  getCompanyDetails,
  updateCompanyDetails,
} from "@/actions/company.action";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { AlertCircle, ArrowLeft, Save } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { companyEditSchema } from "@/zod/company.validation";
import { AvatarUpload } from "@/components/shared/uploadFile/ProfileUpload";
import { BannerUpload } from "@/components/shared/uploadFile/BannerUpload";
import { FileWithPreview } from "@/hooks/use-file-upload";

type CompanyEditFormData = z.infer<typeof companyEditSchema>;

const EditCompanyDetailsForm = () => {
  const queryClient = useQueryClient();
  const [logoFile, setLogoFile] = useState<FileWithPreview | null>(null);
  const [bannerFiles, setBannerFiles] = useState<File[]>([]);

  // Fetch company data
  const { data, isLoading, error } = useQuery({
    queryKey: ["companyDetails"],
    queryFn: () => getCompanyDetails(),
  });

  const company = data?.data;

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) =>
      await updateCompanyDetails(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyDetails"] });
      toast.success("Company details updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update company details");
    },
  });

  // Form setup
  const form = useForm({
    defaultValues: {
      name: company?.name || "",
      email: company?.email || "",
      phone: company?.phone || "",
      address: company?.address || "",
      websiteUrl: company?.websiteUrl || "",
      facebookUrl: company?.facebookUrl || "",
      instagramUrl: company?.instagramUrl || "",
      linkedinUrl: company?.linkedinUrl || "",
      youtubeUrl: company?.youtubeUrl || "",
      twitterUrl: company?.twitterUrl || "",
    } as CompanyEditFormData,
    validators: {
      onChange: companyEditSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          info: value,
        }),
      );

      // Append logo if changed
      if (logoFile) {
        formData.append(
          "logo",
          logoFile.file instanceof File ? logoFile.file : "",
        );
      }

      // Append banner if changed
      if (bannerFiles.length > 0) {
        bannerFiles.forEach((file) => {
          formData.append("banner", file);
        });
      }

      await updateMutation.mutateAsync(formData);
    },
  });

  //  Handle logo change
  const handleLogoChange = (file: FileWithPreview | null) => {
    setLogoFile(file);
  };

  // Loading state
  if (isLoading) {
    return <EditCompanySkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="w-6 h-6" />
            <p className="font-medium">Failed to load company details</p>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-6 max-w-md">
          <p className="text-warning font-medium">
            No company details available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Edit Company Profile
          </h1>
          <p className="text-muted-foreground">
            Update your company information and settings
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Main Form */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update your company&apos;s basic details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form.Field
                  name="name"
                  validators={{
                    onChange: companyEditSchema.shape.name,
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Company Name *</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter company name"
                        className={cn(
                          field.state.meta.isTouched &&
                            field.state.meta.errors.length > 0 &&
                            "border-destructive",
                        )}
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <form.Field
                    name="email"
                    validators={{
                      onChange: companyEditSchema.shape.email,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Email *</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter company email"
                          className={cn(
                            field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0 &&
                              "border-destructive",
                          )}
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive">
                              {field.state.meta.errors.join(", ")}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="phone"
                    validators={{
                      onChange: companyEditSchema.shape.phone,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Phone *</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter company phone"
                          className={cn(
                            field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0 &&
                              "border-destructive",
                          )}
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive">
                              {field.state.meta.errors.join(", ")}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>
                </div>

                <form.Field
                  name="address"
                  validators={{
                    onChange: companyEditSchema.shape.address,
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Address *</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter company address"
                        className={cn(
                          field.state.meta.isTouched &&
                            field.state.meta.errors.length > 0 &&
                            "border-destructive",
                        )}
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>
                  Add your company&apos;s social media profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form.Field
                  name="websiteUrl"
                  validators={{
                    onChange: companyEditSchema.shape.websiteUrl,
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Website</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="url"
                        value={field.state.value || ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://example.com"
                        className={cn(
                          field.state.meta.isTouched &&
                            field.state.meta.errors.length > 0 &&
                            "border-destructive",
                        )}
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <form.Field
                    name="facebookUrl"
                    validators={{
                      onChange: companyEditSchema.shape.facebookUrl,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Facebook</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="url"
                          value={field.state.value || ""}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://facebook.com/your-page"
                          className={cn(
                            field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0 &&
                              "border-destructive",
                          )}
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive">
                              {field.state.meta.errors.join(", ")}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="twitterUrl"
                    validators={{
                      onChange: companyEditSchema.shape.twitterUrl,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Twitter / X</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="url"
                          value={field.state.value || ""}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://twitter.com/your-handle"
                          className={cn(
                            field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0 &&
                              "border-destructive",
                          )}
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive">
                              {field.state.meta.errors.join(", ")}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="linkedinUrl"
                    validators={{
                      onChange: companyEditSchema.shape.linkedinUrl,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>LinkedIn</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="url"
                          value={field.state.value || ""}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://linkedin.com/company/your-company"
                          className={cn(
                            field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0 &&
                              "border-destructive",
                          )}
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive">
                              {field.state.meta.errors.join(", ")}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="instagramUrl"
                    validators={{
                      onChange: companyEditSchema.shape.instagramUrl,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Instagram</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="url"
                          value={field.state.value || ""}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://instagram.com/your-handle"
                          className={cn(
                            field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0 &&
                              "border-destructive",
                          )}
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive">
                              {field.state.meta.errors.join(", ")}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="youtubeUrl"
                    validators={{
                      onChange: companyEditSchema.shape.youtubeUrl,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>YouTube</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="url"
                          value={field.state.value || ""}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="https://youtube.com/@your-channel"
                          className={cn(
                            field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0 &&
                              "border-destructive",
                          )}
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive">
                              {field.state.meta.errors.join(", ")}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Media Uploads */}
          <div className="space-y-6">
            {/* Logo Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>
                  Upload your company logo (PNG, JPG up to 2MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AvatarUpload
                  defaultAvatar={company.logoUrl || undefined}
                  onFileChange={handleLogoChange}
                  maxSize={2 * 1024 * 1024}
                />
              </CardContent>
            </Card>

            {/* Banner Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Company Banner</CardTitle>
                <CardDescription>
                  Upload banner images for your company profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BannerUpload
                  maxSize={5 * 1024 * 1024}
                  onFilesChange={(files) => {
                    setBannerFiles(files.map((f) => f.file as File));
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline">
            <Link href="/super-admin/dashboard/company-details" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            type="submit"
            className="gap-2 min-w-30"
            onClick={() => form.handleSubmit()}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCompanyDetailsForm;

// Skeleton Component
const EditCompanySkeleton = () => {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-56" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-40" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
