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
import { HrScope } from "@/types/enums.type";
import { ICreateHRManagerPayload } from "@/types/user.type";
import { createCompanyHr } from "@/actions/user.action";
import AppField from "@/components/shared/form/AppField";
import AppSelectField from "@/components/shared/form/AppSelectField";
import { AvatarUpload } from "@/components/shared/uploadFile/ProfileUpload";
import { IDepartment } from "@/types/department.type";
import { IDesignation } from "@/types/designation.type";
import { CreateHrFormValues, createHrSchema } from "@/zod/hrManager.validation";
import { FileWithPreview } from "@/hooks/use-file-upload";
import {
  CalendarDays,
  Eye,
  EyeOff,
  Lock,
  Mail,
  PhoneCall,
  User,
} from "lucide-react";

const CreateHrForm = () => {
  const queryClient = useQueryClient();
  const [selectedScope, setSelectedScope] = useState<HrScope>(
    HrScope.COMPANY_WIDE,
  );
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<FileWithPreview | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Fetch departments with their nested designations
  const { data: departmentsData, isLoading: isDepartmentsLoading } = useQuery({
    queryKey: ["companyDepartments"],
    queryFn: () => getCompanyDepartments(),
  });

  // Create HR mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ICreateHRManagerPayload) => {
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
      console.log("create hr payload", [...formData.entries()]);
      console.log("create hr payload", data);
      console.log("avatar image", avatarFile);
      return await createCompanyHr(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      toast.success("HR Manager created successfully");
      queryClient.invalidateQueries({ queryKey: ["companyHrManagers"] });
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create HR Manager");
    },
  });

  // TanStack Form
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      photoUrl: "",
      joinDate: "",
      hrLicenseNumber: "",
      officePhone: "",
      bio: "",
      scope: HrScope.COMPANY_WIDE,
      departmentId: "",
      designationId: "",
    } as CreateHrFormValues,
    validators: {
      onChange: createHrSchema,
    },
    onSubmit: ({ value }) => {
      const payload: ICreateHRManagerPayload = {
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

  // Filter designations based on selected scope and department
  const filteredDesignations = useMemo(() => {
    // Helper functions inside useMemo
    const getAllDesignations = () => {
      const allDesignations: IDesignation[] = [];
      departments.forEach((dept: IDepartment) => {
        if (dept.designations && dept.designations.length > 0) {
          allDesignations.push(...dept.designations);
        }
      });
      return allDesignations;
    };

    const getDesignationsByDepartment = (departmentId: string) => {
      if (!departmentId) return [];
      const department = departments.find(
        (dept: IDepartment) => dept.id === departmentId,
      );
      return department?.designations || [];
    };

    if (selectedScope === HrScope.DEPARTMENT_SPECIFIC) {
      // Only show designations for the selected department
      if (selectedDepartmentId) {
        return getDesignationsByDepartment(selectedDepartmentId);
      }
      return [];
    } else {
      // COMPANY_WIDE - show all designations from all departments
      return getAllDesignations();
    }
  }, [selectedScope, selectedDepartmentId, departments]);

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
    if (
      selectedScope === HrScope.DEPARTMENT_SPECIFIC &&
      !selectedDepartmentId
    ) {
      return true;
    }
    return false;
  }, [selectedScope, selectedDepartmentId]);

  // Get designation placeholder text
  const getDesignationPlaceholder = useMemo(() => {
    if (
      selectedScope === HrScope.DEPARTMENT_SPECIFIC &&
      !selectedDepartmentId
    ) {
      return "Select a department first";
    }
    return "Select designation (optional)";
  }, [selectedScope, selectedDepartmentId]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create HR Manager</CardTitle>
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

          {/* HR Professional Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              HR Professional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* HR License Number field */}
              <form.Field
                name="hrLicenseNumber"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="HR License Number"
                    type="text"
                    placeholder="Enter HR license number"
                  />
                )}
              </form.Field>

              {/* Office Phone field */}
              <form.Field
                name="officePhone"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Office Phone"
                    type="tel"
                    placeholder="Enter office phone"
                  />
                )}
              </form.Field>
            </div>
          </div>

          {/* Scope & Assignment */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              Scope & Assignment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Scope Selection */}
              <form.Field
                name="scope"
                validators={{
                  onChange: z.enum([
                    HrScope.COMPANY_WIDE,
                    HrScope.DEPARTMENT_SPECIFIC,
                  ]),
                }}
              >
                {(field) => (
                  <AppSelectField
                    field={field}
                    label="Scope *"
                    placeholder="Select scope"
                    options={[
                      { value: HrScope.COMPANY_WIDE, label: "Company Wide" },
                      {
                        value: HrScope.DEPARTMENT_SPECIFIC,
                        label: "Department Specific",
                      },
                    ]}
                    onValueChange={(value) => {
                      setSelectedScope(value as HrScope);
                      // Reset departmentId and designationId when scope changes to COMPANY_WIDE
                      if (value === HrScope.COMPANY_WIDE) {
                        form.setFieldValue("departmentId", "");
                        form.setFieldValue("designationId", "");
                        setSelectedDepartmentId("");
                      } else {
                        // When switching to DEPARTMENT_SPECIFIC, clear designation
                        form.setFieldValue("designationId", "");
                      }
                    }}
                  />
                )}
              </form.Field>

              {/* Department Selection - Only show if scope is DEPARTMENT_SPECIFIC */}
              {selectedScope === HrScope.DEPARTMENT_SPECIFIC && (
                <>
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
                  {/* Designation Selection - Always visible but may be disabled */}
                  <form.Field
                    name="designationId"
                    validators={{
                      onChange: z.string().optional(),
                    }}
                  >
                    {(field) => (
                      <AppSelectField
                        field={field}
                        label="Designation"
                        placeholder={getDesignationPlaceholder}
                        options={designationOptions}
                        disabled={isDesignationDisabled}
                        loading={isDepartmentsLoading}
                      />
                    )}
                  </form.Field>
                </>
              )}
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
                      setSelectedScope(HrScope.COMPANY_WIDE);
                      setAvatarFile(null);
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting || isPending}
                  >
                    {isPending ? "Creating..." : "Create HR Manager"}
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

export default CreateHrForm;
