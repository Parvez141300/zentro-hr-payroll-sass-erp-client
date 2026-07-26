"use client";

import { changeUserPassword } from "@/actions/auth.action";
import AppButton from "@/components/shared/form/AppButton";
import AppField from "@/components/shared/form/AppField";
import { Card, CardContent } from "@/components/ui/card";
import { changePasswordSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: changePasswordSchema,
    },

    onSubmit: async ({ value }) => {
      console.log(value);
      const toastId = toast.loading("Changing password...");
      try {
        const response = await changeUserPassword(value);
        if (response.success) {
          form.reset();
          toast.success("Password changed successfully", { id: toastId });
        } else {
          toast.error(response.message, { id: toastId });
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Submission failed",
          { id: toastId },
        );
      }
    },
  });

  return (
    <Card className="overflow-hidden shadow-sm">
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-2">
          {/* LEFT SIDE */}

          <div className="hidden border-r lg:flex w-full">
            <div className="w-full flex flex-col items-center justify-center px-10 py-12">
              <Image
                src="/assets/authImages/change-password.png"
                alt="Change Password"
                width={350}
                height={350}
                priority
                className="mb-8"
              />

              <div className="space-y-4 text-center">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-primary">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Security First
                </div>

                <h2 className="text-3xl font-bold tracking-tight">
                  Protect Your Account
                </h2>

                <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                  Keep your Zentro account secure by updating your password
                  regularly. Choose a strong password that you don&apos;t use
                  elsewhere.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="p-8 lg:p-10">
            <div className="mb-8 flex flex-col lg:flex-row items-center justify-center gap-5">
              <div className="flex p-5 items-center justify-center rounded-xl bg-primary/10">
                <LockKeyhole className="h-10 w-10 text-primary" />
              </div>

              <div className="text-center lg:text-start">
                <h1 className="text-3xl font-bold">Change Password</h1>
                <p className="text-muted-foreground">
                  Update your password to keep your account secure.
                </p>
              </div>
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              {/* Current Password */}

              <form.Field name="currentPassword">
                {(field) => (
                  <AppField
                    label="Current Password"
                    field={field}
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter you current password"
                    prepend={<Lock />}
                    append={
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                  />
                )}
              </form.Field>

              {/* New Password */}

              <form.Field name="newPassword">
                {(field) => (
                  <AppField
                    label="New Password"
                    field={field}
                    type={showNew ? "text" : "password"}
                    placeholder="Enter you new password"
                    prepend={<Lock />}
                    append={
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                  />
                )}
              </form.Field>

              {/* Confirm */}

              <form.Field name="confirmPassword">
                {(field) => (
                  <AppField
                    label="Confirm Password"
                    field={field}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your new password"
                    prepend={<Lock />}
                    append={
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                  />
                )}
              </form.Field>

              {/* Requirements */}

              <div className="rounded-lg border bg-muted/30 p-4">
                <h4 className="mb-3 text-sm font-semibold">
                  Password Requirements
                </h4>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Minimum 8 characters</li>

                  <li>✓ At least one uppercase letter</li>

                  <li>✓ At least one lowercase letter</li>

                  <li>✓ At least one number</li>

                  <li>✓ Different from current password</li>
                </ul>
              </div>

              <form.Subscribe
                selector={(state) => ({
                  canSubmit: state.canSubmit,
                  isSubmitting: state.isSubmitting,
                })}
              >
                {({ canSubmit, isSubmitting }) => (
                  <AppButton
                    className="h-11 w-full"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </AppButton>
                )}
              </form.Subscribe>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
