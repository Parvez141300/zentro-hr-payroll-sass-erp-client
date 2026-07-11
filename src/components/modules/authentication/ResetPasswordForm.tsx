"use client";

import AppButton from "@/components/shared/form/AppButton";
import AppField from "@/components/shared/form/AppField";
import Logo from "@/components/shared/logo/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { loginSchema, resetPasswordSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import {
  ArrowLeftFromLine,
  LockKeyhole,
  Mail,
  RectangleEllipsis,
  Send,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const ResetPasswordForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      otp: "",
      password: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log("this is form register form: ", value);
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Submission failed",
        );
      }
    },
  });
  return (
    <Card className="max-w-5xl p-5">
      <CardHeader className="text-center space-y-2">
        <Logo />
        <CardTitle>Reset/Update Your Password</CardTitle>
        <CardDescription>
          Enter your email, otp, and new password to reset/update your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* email field */}
          <form.Field
            name="email"
            validators={{
              onChange: loginSchema.shape.email,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email"
                type="email"
                placeholder="Enter your email"
                prepend={<Mail />}
              />
            )}
          </form.Field>

          {/* otp field */}
          <form.Field
            name="otp"
            validators={{
              onChange: resetPasswordSchema.shape.otp,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="OTP"
                type="text"
                placeholder="Enter your otp"
                prepend={<RectangleEllipsis />}
              />
            )}
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
                type="password"
                placeholder="Enter your password"
                prepend={<LockKeyhole />}
              />
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <div className="space-y-2">
                <AppButton
                  className="w-full"
                  type="submit"
                  disabled={!canSubmit}
                  chidren={
                    <>
                      <Send /> Submit
                    </>
                  }
                  isPending={isSubmitting}
                  pendingLabel="Sending..."
                />
                <AppButton
                  varient="secondary"
                  type="button"
                  className="w-full"
                  chidren={
                    <Link href={"/login"} className="flex items-center gap-1">
                      <ArrowLeftFromLine />
                      Back To Login
                    </Link>
                  }
                />
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
