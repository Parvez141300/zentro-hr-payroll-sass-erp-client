"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getCompanyDepartments } from "@/actions/department.action";
import AppField from "@/components/shared/form/AppField";
import AppSelectField from "@/components/shared/form/AppSelectField";
import { AvatarUpload } from "@/components/shared/uploadFile/ProfileUpload";
import { IDepartment } from "@/types/department.type";
import { IDesignation } from "@/types/designation.type";
import { FileWithPreview } from "@/hooks/use-file-upload";
import {
  CalendarDays,
  Eye,
  EyeOff,
  Lock,
  Mail,
  PhoneCall,
  User,
  MapPin,
  Link,
} from "lucide-react";
import { ICreateCompanyDepartmentHeadPayload } from "@/types/user.type";
import { createCompanyDepartmentHead } from "@/actions/user.action";

// Zod Schema for Department Head
const createDepartmentHeadSchema = z.object({
  departmentId: z.string().min(1, "Department is required"),
  designationId: z.string().min(1, "Designation is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  photoUrl: z.string().optional(),
  joinDate: z.string().optional(),
  officeLocation: z.string().optional(),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  bio: z.string().optional(),
});

type CreateDepartmentHeadFormValues = z.infer<
  typeof createDepartmentHeadSchema
>;

const CreateDepartmentHeadForm = () => {
  const queryClient = useQueryClient();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<FileWithPreview | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Fetch departments with their nested designations
  const { data: departmentsData, isLoading: isDepartmentsLoading } = useQuery({
    queryKey: ["companyDepartments"],
    queryFn: () => getCompanyDepartments(),
  });

  // Create Department Head mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ICreateCompanyDepartmentHeadPayload) => {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          info: data,
        }),
      );
      if (avatarFile) {
        formData.append(
          "file",
          avatarFile.file instanceof File ? avatarFile.file : "",
        );
      }
      console.log("create department head payload", [...formData.entries()]);
      console.log("create department head data", data);
      console.log("avatar image", avatarFile);
      return await createCompanyDepartmentHead(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      toast.success("Department Head created successfully");
      queryClient.invalidateQueries({ queryKey: ["companyDepartmentHeads"] });
      form.reset();
      setAvatarFile(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create Department Head");
    },
  });

  // TanStack Form
  const form = useForm({
    defaultValues: {
      departmentId: "",
      designationId: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      photoUrl: "",
      joinDate: "",
      officeLocation: "",
      linkedinUrl: "",
      bio: "",
    } as CreateDepartmentHeadFormValues,
    validators: {
      onChange: createDepartmentHeadSchema,
    },
    onSubmit: ({ value }) => {
      const payload: ICreateCompanyDepartmentHeadPayload = {
        ...value,
        joinDate: value.joinDate ? new Date(value.joinDate) : undefined,
      };
      mutate(payload);
    },
  });

  // Wrap departments in useMemo to prevent unnecessary re-renders
  const departments = useMemo(() => {
    return departmentsData?.data?.data || [];
  }, [departmentsData]);

  // Prepare options for select fields - also wrap in useMemo
  const departmentOptions = useMemo(() => {
    return departments.map((dept: IDepartment) => ({
      value: dept.id,
      label: dept.name,
    }));
  }, [departments]);

  // Filter designations based on selected department
  const filteredDesignations = useMemo(() => {
    // Helper function inside useMemo
    const getDesignationsByDepartment = (departmentId: string) => {
      if (!departmentId) return [];
      const department = departments.find(
        (dept: IDepartment) => dept.id === departmentId,
      );
      return department?.designations || [];
    };

    if (selectedDepartmentId) {
      return getDesignationsByDepartment(selectedDepartmentId);
    }
    return [];
  }, [selectedDepartmentId, departments]);

  const designationOptions = useMemo(() => {
    return filteredDesignations.map((designation: IDesignation) => ({
      value: designation.id,
      label: designation.title,
    }));
  }, [filteredDesignations]);

  // Handle avatar upload
  const handleAvatarChange = (file: FileWithPreview | null) => {
    if (file) {
      setAvatarFile(file);
    } else {
      setAvatarFile(null);
    }
  };

  // Handle department change
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartmentId(value);
    // Reset designation when department changes
    form.setFieldValue("designationId", "");
  };

  // Check if designation field should be disabled
  const isDesignationDisabled = useMemo(() => {
    if (!selectedDepartmentId) {
      return true;
    }
    return false;
  }, [selectedDepartmentId]);

  // Get designation placeholder text
  const getDesignationPlaceholder = useMemo(() => {
    if (!selectedDepartmentId) {
      return "Select a department first";
    }
    return "Select designation";
  }, [selectedDepartmentId]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Department Head</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Avatar Upload */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              Profile Photo
            </h3>
            <div className="flex justify-center">
              <AvatarUpload
                onFileChange={handleAvatarChange}
                maxSize={2 * 1024 * 1024}
              />
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* name field */}
              <form.Field
                name="name"
                validators={{
                  onChange: z.string().min(1, "Name is required"),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Full Name *"
                    type="text"
                    placeholder="Enter full name"
                    prepend={<User />}
                  />
                )}
              </form.Field>

              {/* email field */}
              <form.Field
                name="email"
                validators={{
                  onChange: z.string().email("Invalid email address"),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Email *"
                    type="email"
                    placeholder="Enter email address"
                    prepend={<Mail />}
                  />
                )}
              </form.Field>

              {/* password field */}
              <form.Field
                name="password"
                validators={{
                  onChange: z
                    .string()
                    .min(6, "Password must be at least 6 characters"),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Password *"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    prepend={<Lock />}
                    append={
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </Button>
                    }
                  />
                )}
              </form.Field>

              {/* phone field */}
              <form.Field
                name="phone"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Phone"
                    type="tel"
                    placeholder="Enter phone number"
                    prepend={<PhoneCall />}
                  />
                )}
              </form.Field>

              {/* joinDate field */}
              <form.Field
                name="joinDate"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Join Date"
                    type="date"
                    placeholder="Select join date"
                    prepend={<CalendarDays />}
                  />
                )}
              </form.Field>
            </div>
          </div>

          {/* Department & Designation Assignment */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              Department & Designation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department Selection */}
              <form.Field
                name="departmentId"
                validators={{
                  onChange: z.string().min(1, "Department is required"),
                }}
              >
                {(field) => (
                  <AppSelectField
                    field={field}
                    label="Department *"
                    placeholder="Select department"
                    options={departmentOptions}
                    disabled={isDepartmentsLoading}
                    loading={isDepartmentsLoading}
                    onValueChange={(value) => {
                      handleDepartmentChange(value);
                    }}
                  />
                )}
              </form.Field>

              {/* Designation Selection */}
              <form.Field
                name="designationId"
                validators={{
                  onChange: z.string().min(1, "Designation is required"),
                }}
              >
                {(field) => (
                  <AppSelectField
                    field={field}
                    label="Designation *"
                    placeholder={getDesignationPlaceholder}
                    options={designationOptions}
                    disabled={isDesignationDisabled}
                    loading={isDepartmentsLoading}
                  />
                )}
              </form.Field>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              Professional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Office Location field */}
              <form.Field
                name="officeLocation"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Office Location"
                    type="text"
                    placeholder="Enter office location"
                    prepend={<MapPin />}
                  />
                )}
              </form.Field>

              {/* LinkedIn URL field */}
              <form.Field
                name="linkedinUrl"
                validators={{
                  onChange: z
                    .string()
                    .url("Invalid URL")
                    .optional()
                    .or(z.literal("")),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="LinkedIn URL"
                    type="url"
                    placeholder="Enter LinkedIn URL"
                    prepend={<Link />}
                  />
                )}
              </form.Field>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              Additional Information
            </h3>

            <form.Field
              name="bio"
              validators={{
                onChange: z.string().optional(),
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name}>Bio</Label>
                  <textarea
                    id={field.name}
                    className="flex min-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter bio (optional)"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <>
                  <Button
                    type="reset"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setSelectedDepartmentId("");
                      setAvatarFile(null);
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting || isPending}
                  >
                    {isPending ? "Creating..." : "Create Department Head"}
                  </Button>
                </>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateDepartmentHeadForm;
