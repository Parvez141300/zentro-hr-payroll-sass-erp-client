"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getCompanyDepartments } from "@/actions/department.action";
import { updateCompanyEmployee } from "@/actions/employee.action";
import AppField from "@/components/shared/form/AppField";
import AppSelectField from "@/components/shared/form/AppSelectField";
import { AvatarUpload } from "@/components/shared/uploadFile/ProfileUpload";
import { IDepartment } from "@/types/department.type";
import { IDesignation } from "@/types/designation.type";
import { FileWithPreview } from "@/hooks/use-file-upload";
import {
  CalendarDays,
  PhoneCall,
  User,
  MapPin,
  Hash,
  DollarSign,
  Landmark,
  CreditCard,
  Heart,
  Users,
} from "lucide-react";
import { IUpdateCompanyEmployeePayload } from "@/types/user.type";
import { IEmployee } from "@/types/employee.type";
import {
  UpdateEmployeeFormValues,
  updateEmployeeSchema,
} from "@/zod/employee.validation";
import { Gender } from "@/types/enums.type";

interface EditEmployeeDialogProps {
  employeeData: IEmployee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditEmployeeDialog = ({
  employeeData,
  open,
  onOpenChange,
}: EditEmployeeDialogProps) => {
  const queryClient = useQueryClient();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>(
    employeeData?.departmentId || "",
  );
  const [avatarFile, setAvatarFile] = useState<FileWithPreview | null>(null);

  // Fetch departments with their nested designations
  const { data: departmentsData, isLoading: isDepartmentsLoading } = useQuery({
    queryKey: ["companyDepartments"],
    queryFn: () => getCompanyDepartments(),
  });

  // Update Employee mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IUpdateCompanyEmployeePayload) => {
      if (!employeeData) throw new Error("No employee selected");

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
      console.log("update employee payload", [...formData.entries()]);
      console.log("update employee data", data);
      console.log("avatar image", avatarFile);
      return await updateCompanyEmployee(employeeData.userId, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      toast.success("Employee updated successfully");
      queryClient.invalidateQueries({ queryKey: ["companyEmployees"] });
      onOpenChange(false);
      setAvatarFile(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update Employee");
    },
  });

  // TanStack Form
  const form = useForm({
    defaultValues: {
      departmentId: employeeData?.departmentId || "",
      designationId: employeeData?.designationId || "",
      name: employeeData?.name || "",
      phone: employeeData?.phone || "",
      photoUrl: employeeData?.photoUrl || "",
      dateOfBirth: employeeData?.dateOfBirth || "",
      gender: employeeData?.gender || "MALE",
      address: employeeData?.address || "",
      nidNumber: employeeData?.nidNumber || "",
      bloodGroup: employeeData?.bloodGroup || "",
      employmentType: employeeData?.employmentType || "FULL_TIME",
      status: employeeData?.status || "ACTIVE",
      joinDate: employeeData?.joinDate || "",
      basicSalary: employeeData?.basicSalary?.toString() || "",
      houseAllowance: employeeData?.houseAllowance?.toString() || "",
      medicalAllowance: employeeData?.medicalAllowance?.toString() || "",
      transportAllowance: employeeData?.transportAllowance?.toString() || "",
      bankName: employeeData?.bankName || "",
      bankAccount: employeeData?.bankAccount || "",
      emergencyName: employeeData?.emergencyName || "",
      emergencyPhone: employeeData?.emergencyPhone || "",
      emergencyRelation: employeeData?.emergencyRelation || "",
    } as UpdateEmployeeFormValues,
    validators: {
      onChange: updateEmployeeSchema,
    },
    onSubmit: ({ value }) => {
      if (!employeeData) return;

      const payload: IUpdateCompanyEmployeePayload = {
        ...value,
        dateOfBirth: value.dateOfBirth
          ? new Date(value.dateOfBirth)
          : undefined,
        joinDate: value.joinDate ? new Date(value.joinDate) : undefined,
        basicSalary: parseFloat(value.basicSalary),
        houseAllowance: value.houseAllowance
          ? parseFloat(value.houseAllowance)
          : 0,
        medicalAllowance: value.medicalAllowance
          ? parseFloat(value.medicalAllowance)
          : 0,
        transportAllowance: value.transportAllowance
          ? parseFloat(value.transportAllowance)
          : 0,
      };
      mutate(payload);
    },
  });

  // Reset form when employee data changes (dialog opens with new data)
  useEffect(() => {
    if (employeeData && open) {
      form.reset({
        departmentId: employeeData.departmentId || "",
        designationId: employeeData.designationId || "",
        name: employeeData.name || "",
        // email: employeeData.user?.email || "",
        // password: "",
        phone: employeeData.phone || "",
        photoUrl: employeeData.photoUrl || "",
        dateOfBirth: employeeData.dateOfBirth || "",
        gender: employeeData.gender || Gender.MALE,
        address: employeeData.address || "",
        nidNumber: employeeData.nidNumber || "",
        bloodGroup: employeeData.bloodGroup || "",
        employmentType: employeeData.employmentType || "FULL_TIME",
        status: employeeData.status || "ACTIVE",
        joinDate: employeeData.joinDate || "",
        basicSalary: employeeData.basicSalary?.toString() || "",
        houseAllowance: employeeData.houseAllowance?.toString() || "",
        medicalAllowance: employeeData.medicalAllowance?.toString() || "",
        transportAllowance: employeeData.transportAllowance?.toString() || "",
        bankName: employeeData.bankName || "",
        bankAccount: employeeData.bankAccount || "",
        emergencyName: employeeData.emergencyName || "",
        emergencyPhone: employeeData.emergencyPhone || "",
        emergencyRelation: employeeData.emergencyRelation || "",
      });
    }
  }, [employeeData, open, form]);

  // Wrap departments in useMemo to prevent unnecessary re-renders
  const departments = useMemo(() => {
    return departmentsData?.data?.data || [];
  }, [departmentsData]);

  // Prepare options for select fields
  const departmentOptions = useMemo(() => {
    return departments.map((dept: IDepartment) => ({
      value: dept.id,
      label: dept.name,
    }));
  }, [departments]);

  // Filter designations based on selected department
  const filteredDesignations = useMemo(() => {
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

  // Gender options
  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" },
  ];

  // Employment type options
  const employmentTypeOptions = [
    { value: "FULL_TIME", label: "Full Time" },
    { value: "PART_TIME", label: "Part Time" },
    { value: "CONTRACT", label: "Contract" },
    { value: "INTERN", label: "Intern" },
  ];

  // Employee status options
  const employeeStatusOptions = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
    { value: "TERMINATED", label: "Terminated" },
    { value: "ON_LEAVE", label: "On Leave" },
  ];

  // Blood group options
  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

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

  if (!employeeData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>

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
                defaultAvatar={
                  employeeData.photoUrl || employeeData.user?.image || undefined
                }
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

              {/* dateOfBirth field */}
              <form.Field
                name="dateOfBirth"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Date of Birth"
                    type="date"
                    placeholder="Select date of birth"
                    prepend={<CalendarDays />}
                  />
                )}
              </form.Field>

              {/* gender field */}
              <form.Field name="gender">
                {(field) => (
                  <AppSelectField
                    field={field}
                    label="Gender *"
                    placeholder="Select gender"
                    options={genderOptions}
                  />
                )}
              </form.Field>

              {/* address field */}
              <form.Field
                name="address"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Address"
                    type="text"
                    placeholder="Enter address"
                    prepend={<MapPin />}
                  />
                )}
              </form.Field>

              {/* nidNumber field */}
              <form.Field
                name="nidNumber"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="NID Number"
                    type="text"
                    placeholder="Enter NID number"
                    prepend={<Hash />}
                  />
                )}
              </form.Field>

              {/* bloodGroup field */}
              <form.Field
                name="bloodGroup"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppSelectField
                    field={field}
                    label="Blood Group"
                    placeholder="Select blood group"
                    options={bloodGroupOptions}
                  />
                )}
              </form.Field>
            </div>
          </div>

          {/* Employment Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              Employment Information
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

              {/* employmentType field */}
              <form.Field name="employmentType">
                {(field) => (
                  <AppSelectField
                    field={field}
                    label="Employment Type *"
                    placeholder="Select employment type"
                    options={employmentTypeOptions}
                  />
                )}
              </form.Field>

              {/* status field */}
              <form.Field name="status">
                {(field) => (
                  <AppSelectField
                    field={field}
                    label="Status *"
                    placeholder="Select status"
                    options={employeeStatusOptions}
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

          {/* Salary Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              Salary Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* basicSalary field */}
              <form.Field
                name="basicSalary"
                validators={{
                  onChange: z.string().min(1, "Basic salary is required"),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Basic Salary *"
                    type="number"
                    placeholder="Enter basic salary"
                    prepend={<DollarSign />}
                  />
                )}
              </form.Field>

              {/* houseAllowance field */}
              <form.Field
                name="houseAllowance"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="House Allowance"
                    type="number"
                    placeholder="Enter house allowance"
                    prepend={<DollarSign />}
                  />
                )}
              </form.Field>

              {/* medicalAllowance field */}
              <form.Field
                name="medicalAllowance"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Medical Allowance"
                    type="number"
                    placeholder="Enter medical allowance"
                    prepend={<DollarSign />}
                  />
                )}
              </form.Field>

              {/* transportAllowance field */}
              <form.Field
                name="transportAllowance"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Transport Allowance"
                    type="number"
                    placeholder="Enter transport allowance"
                    prepend={<DollarSign />}
                  />
                )}
              </form.Field>
            </div>
          </div>

          {/* Bank Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              Bank Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* bankName field */}
              <form.Field
                name="bankName"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Bank Name"
                    type="text"
                    placeholder="Enter bank name"
                    prepend={<Landmark />}
                  />
                )}
              </form.Field>

              {/* bankAccount field */}
              <form.Field
                name="bankAccount"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Bank Account"
                    type="text"
                    placeholder="Enter bank account number"
                    prepend={<CreditCard />}
                  />
                )}
              </form.Field>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              Emergency Contact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* emergencyName field */}
              <form.Field
                name="emergencyName"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Emergency Contact Name"
                    type="text"
                    placeholder="Enter emergency contact name"
                    prepend={<Heart />}
                  />
                )}
              </form.Field>

              {/* emergencyPhone field */}
              <form.Field
                name="emergencyPhone"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Emergency Phone"
                    type="tel"
                    placeholder="Enter emergency phone number"
                    prepend={<PhoneCall />}
                  />
                )}
              </form.Field>

              {/* emergencyRelation field */}
              <form.Field
                name="emergencyRelation"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Emergency Relation"
                    type="text"
                    placeholder="Enter relationship (e.g., Spouse, Father)"
                    prepend={<Users />}
                  />
                )}
              </form.Field>
            </div>
          </div>

          {/* Form Actions */}
          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              }
            ></DialogClose>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <>
                  <Button
                    type="reset"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => {
                      form.reset();
                      setSelectedDepartmentId(employeeData.departmentId || "");
                      setAvatarFile(null);
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting || isPending}
                  >
                    {isPending ? "Updating..." : "Update Employee"}
                  </Button>
                </>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeDialog;
