"use client";

import { forgotPassword, resetPassword } from "@/actions/auth.action";
import AppButton from "@/components/shared/form/AppButton";
import AppField from "@/components/shared/form/AppField";
import Logo from "@/components/shared/logo/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { loginSchema, resetPasswordSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import {
  ArrowLeftFromLine,
  Eye,
  EyeOff,
  LockKeyhole,
  RefreshCwIcon,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const [formError, setFormError] = React.useState<string | null>(null);
  const [show, setShow] = React.useState<boolean>(false);
  const [otpLoading, setOtpLoading] = React.useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      otp: "",
      password: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setFormError(null);
      const toastId = toast.loading("Reseting your password...");
      try {
        if (!email) {
          setFormError(
            "Email is required please submit email in forgot password page again.",
          );
          toast.error(
            "Email is required please submit email in forgot password page again.",
            { id: toastId },
          );
          return;
        }
        const resetPasswordPayload = {
          email: email as string,
          otp: value.otp,
          newPassword: value.password,
        };
        const result = await resetPassword(resetPasswordPayload);
        if (result.success) {
          form.reset();
          router.push("/login");
          toast.success("Password reset successful", { id: toastId });
        }
        console.log("this is from reset password", resetPasswordPayload);
      } catch (error) {
        setFormError(
          error instanceof Error ? error.message : "Submission failed",
        );
        toast.error(
          error instanceof Error ? error.message : "Submission failed",
          { id: toastId },
        );

        console.log("This error is from reset password form", error);
      }
    },
  });

  const handleResetOtpCode = async (email: string | null) => {
    if (!email) {
      toast.error("Please submit email in forgot password page again.");
      return;
    }
    setFormError(null);
    setOtpLoading(true);
    try {
      const toastId = toast.loading("Sending otp...");
      const result = await forgotPassword(email);
      if (result.success) {
        toast.success("OTP sent to your email", { id: toastId });
        setOtpLoading(false);
      }
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Submission failed",
      );
      setOtpLoading(false);
      console.log("This error is from forgot password form", error);
    }
  };
  return (
    <Card className="max-w-xl p-5">
      <CardHeader className="text-center space-y-2">
        <Logo />
        <CardTitle>Reset/Update Your Password</CardTitle>
        <CardDescription>
          Enter your email, otp, and new password to reset/update your password.
        </CardDescription>
      </CardHeader>

      {/* Error Message */}
      {formError && (
        <p className="mb-4 p-3 bg-accent border border-primary/20 text-red-700 rounded-md overflow-auto">
          {formError}
        </p>
      )}
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* otp field */}
          <form.Field
            name="otp"
            validators={{
              onChange: resetPasswordSchema.shape.otp,
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="otp-verification">
                      OTP Verification
                    </FieldLabel>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleResetOtpCode(email)}
                      disabled={otpLoading}
                    >
                      {otpLoading ? (
                        <>
                          <RefreshCwIcon className="animate-spin" />
                          Resend Code
                        </>
                      ) : (
                        <>
                          <RefreshCwIcon />
                          Resend Code
                        </>
                      )}
                    </Button>
                  </div>
                  <InputOTP
                    id="otp-verification"
                    maxLength={6}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    className="w-full"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              );
            }}
          </form.Field>

          {/* password field */}
          <form.Field
            name="password"
            validators={{
              onChange: loginSchema.shape.password,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Password"
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                prepend={<LockKeyhole />}
                append={
                  <AppButton
                    type="button"
                    varient="ghost"
                    onClick={() => {
                      setShow((prev) => !prev);
                    }}
                  >
                    {show ? <Eye /> : <EyeOff />}
                  </AppButton>
                }
              />
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <div className="space-y-2 w-full">
                <AppButton
                  className="w-full"
                  type="submit"
                  disabled={!canSubmit}
                  isPending={isSubmitting}
                  pendingLabel="Sending..."
                >
                  <>
                    <Send /> Submit
                  </>
                </AppButton>
                <AppButton varient="secondary" type="button" className="w-full">
                  <Link href={"/login"} className="flex items-center gap-1">
                    <ArrowLeftFromLine />
                    Back To Login
                  </Link>
                </AppButton>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
      <CardFooter>
        <FieldDescription className="flex justify-center gap-2">
          <span>
            @{new Date().getFullYear()} Zentro Hr & Payroll. All rights
            reserved.
          </span>
          <Link href={"/terms"}>Terms & Conditions</Link>
          <Link href={"/privacy"}>Privacy Policy</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordForm;
