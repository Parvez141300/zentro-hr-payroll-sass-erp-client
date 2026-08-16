"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import AppField from "@/components/shared/form/AppField";
import { AvatarUpload } from "@/components/shared/uploadFile/ProfileUpload";
import { FileWithPreview } from "@/hooks/use-file-upload";
import {
  CalendarDays,
  Eye,
  EyeOff,
  Lock,
  Mail,
  PhoneCall,
  User,
  FileText,
  Hash,
  Landmark,
  CreditCard,
} from "lucide-react";
import { createCompanyAccountant } from "@/actions/user.action";
import { ICreateCompanyAccountantPayload } from "@/types/user.type";
import {
  CreateAccountantFormValues,
  createAccountantSchema,
} from "@/zod/accountant.validation";

const CreateAccountantForm = () => {
  const queryClient = useQueryClient();
  const [avatarFile, setAvatarFile] = useState<FileWithPreview | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Create Accountant mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ICreateCompanyAccountantPayload) => {
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
      console.log("create accountant payload", [...formData.entries()]);
      console.log("create accountant data", data);
      console.log("avatar image", avatarFile);
      return await createCompanyAccountant(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      toast.success("Accountant created successfully");
      queryClient.invalidateQueries({ queryKey: ["companyAccountants"] });
      form.reset();
      setAvatarFile(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create Accountant");
    },
  });

  // TanStack Form
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      photoUrl: "",
      joinDate: "",
      caLicenseNumber: "",
      taxIdNumber: "",
      bankName: "",
      bankAccount: "",
    } as CreateAccountantFormValues,
    validators: {
      onChange: createAccountantSchema,
    },
    onSubmit: ({ value }) => {
      const payload: ICreateCompanyAccountantPayload = {
        ...value,
        joinDate: value.joinDate ? new Date(value.joinDate) : undefined,
      };
      mutate(payload);
    },
  });

  // Handle avatar upload
  const handleAvatarChange = (file: FileWithPreview | null) => {
    if (file) {
      setAvatarFile(file);
    } else {
      setAvatarFile(null);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Accountant</CardTitle>
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

          {/* Accountant Professional Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2">
              Professional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CA License Number field */}
              <form.Field
                name="caLicenseNumber"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="CA License Number"
                    type="text"
                    placeholder="Enter CA license number"
                    prepend={<FileText />}
                  />
                )}
              </form.Field>

              {/* Tax ID Number field */}
              <form.Field
                name="taxIdNumber"
                validators={{
                  onChange: z.string().optional(),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Tax ID Number"
                    type="text"
                    placeholder="Enter tax ID number"
                    prepend={<Hash />}
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
              {/* Bank Name field */}
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

              {/* Bank Account field */}
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
                      setAvatarFile(null);
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting || isPending}
                  >
                    {isPending ? "Creating..." : "Create Accountant"}
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

export default CreateAccountantForm;
